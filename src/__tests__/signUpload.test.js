import { createServer } from "http";

import { config, configure, signUpload } from "../client";

// Mock both FormData and XMLHttpRequest to work together properly
// The issue is that isomorphic-form-data (imported in setupTests.js) replaces
// the browser"s FormData with a Node.js version that expects streams,
// but we"re passing Blob objects from jsdom

let originalFormData;
let originalXMLHttpRequest;

beforeEach(() => {
  // Save originals
  originalFormData = global.FormData;
  originalXMLHttpRequest = global.XMLHttpRequest;

  // Create a browser-like FormData mock that accepts Blobs
  global.FormData = class MockFormData {
    constructor() {
      this.data = {};
    }

    append(key, value) {
      this.data[key] = value;
    }
  };

  // Create a mock XMLHttpRequest that works with our mock FormData
  global.XMLHttpRequest = jest.fn().mockImplementation(() => {
    const xhr = {
      open: jest.fn(),
      send: jest.fn(_data => {
        // Simulate successful upload
        setTimeout(() => {
          xhr.readyState = 4;
          xhr.status = 201;
          // Return a valid S3 PostResponse XML
          xhr.responseText = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<PostResponse><Location>http://localhost:8082/key</Location><Bucket>test-bucket</Bucket><Key>key</Key><ETag>\"test-etag\"</ETag></PostResponse>";
          if (xhr.onload) xhr.onload();
          if (xhr.onreadystatechange) xhr.onreadystatechange();
        }, 10);
      }),
      setRequestHeader: jest.fn(),
      addEventListener: jest.fn((event, handler) => {
        if (event === "load") xhr.onload = handler;
        if (event === "error") xhr.onerror = handler;
        if (event === "abort") xhr.onabort = handler;
        if (event === "timeout") xhr.ontimeout = handler;
        if (event === "readystatechange") xhr.onreadystatechange = handler;
      }),
      upload: {
        addEventListener: jest.fn((event, handler) => {
          if (event === "progress") {
            // Simulate progress event
            setTimeout(() => handler({ loaded: 1024, total: 1024 }), 5);
          }
        })
      },
      readyState: 0,
      status: 0,
      responseText: "",
      timeout: 0
    };
    return xhr;
  });
});

afterEach(() => {
  // Restore originals
  global.FormData = originalFormData;
  global.XMLHttpRequest = originalXMLHttpRequest;
});

const signerServer = createServer();
const s3Server = createServer();

const startSignerServer = () => new Promise(resolve => {
  let port = 8081;

  signerServer.on("request", (request, response) => {
    response.writeHead(201, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    });

    response.write(
      JSON.stringify({
        policy: "policy",
        signature: "signature",
        key: "key"
      })
    );

    response.end();
  });

  signerServer.on("error", () => {
    signerServer.close(() => {
      port += 1;
      signerServer.listen(port);
    });
  });

  signerServer.on("listening", () => {
    configure({ signerURL: `http://localhost:${port}` });
    resolve();
  });

  signerServer.listen({ port, host: "localhost", exclusive: true });
});

const stopSignerServer = () => new Promise(resolve => {
  signerServer.close(resolve);
});

const startS3Server = () => new Promise(resolve => {
  let port = 8082;

  s3Server.on("request", (request, response) => {
    response.writeHead(201, {
      "Access-Control-Allow-Origin": "*",
      Connection: request.method === "POST" ? "close" : "keep-alive"
    });

    response.end();
  });

  s3Server.on("error", () => {
    s3Server.close(() => {
      port += 1;
      s3Server.listen(port);
    });
  });

  s3Server.on("listening", () => {
    configure({ uploadBucket: `http://localhost:${port}` });
    resolve();
  });

  s3Server.listen({ port, host: "localhost", exclusive: true });
});

const stopS3Server = () => new Promise(resolve => {
  s3Server.close(resolve);
});

beforeAll(async () => {
  await startSignerServer();
  await startS3Server();
});

afterAll(async () => {
  await stopSignerServer();
  await stopS3Server();
});

// Helper to create a mock file
const createMockFile = (name = "test-file.mp4", size = 1024, type = "video/mp4") => {
  const mockDate = new Date();
  const mockFileContent = new Uint8Array(size);
  const mockFile = new Blob([mockFileContent], { type });
  mockFile.name = name;
  mockFile.lastModified = mockDate.getTime();
  mockFile.lastModifiedDate = mockDate;
  return mockFile;
};

describe("signUpload", () => {
  test("successfully uploads file to S3", async () => {
    const onProgress = jest.fn();
    const mockFile = createMockFile();

    const response = await signUpload(mockFile, onProgress);

    expect(response).toEqual(`${config.uploadBucket}/key`);
    expect(onProgress).toHaveBeenCalledTimes(1);
    expect(onProgress).toHaveBeenCalledWith(100); // Progress is in percentage (0-100)
  });

  test("handles invalid S3 response (missing PostResponse XML)", async () => {
    jest.setTimeout(10000); // Increase timeout for retry logic
    // Override the mock to return invalid response
    const InvalidXMLHttpRequest = jest.fn().mockImplementation(() => {
      const xhr = {
        open: jest.fn(),
        send: jest.fn(() => {
          setTimeout(() => {
            xhr.readyState = 4;
            xhr.status = 201;
            xhr.responseText = "Invalid response without XML";
            if (xhr.onload) xhr.onload();
          }, 10);
        }),
        setRequestHeader: jest.fn(),
        addEventListener: jest.fn((event, handler) => {
          if (event === "load") xhr.onload = handler;
        }),
        upload: {
          addEventListener: jest.fn((event, handler) => {
            if (event === "progress") {
              setTimeout(() => handler({ loaded: 1024, total: 1024 }), 5);
            }
          })
        },
        readyState: 0,
        status: 0,
        responseText: "",
        timeout: 0
      };
      return xhr;
    });

    global.XMLHttpRequest = InvalidXMLHttpRequest;

    const mockFile = createMockFile();

    // After retry logic, error message includes "Upload failed after X attempts"
    await expect(signUpload(mockFile)).rejects.toThrow("Upload failed after 3 attempts");
  });

  test("handles upload with no data transmitted", async () => {
    // Override to simulate no progress events
    const NoProgressXMLHttpRequest = jest.fn().mockImplementation(() => {
      const xhr = {
        open: jest.fn(),
        send: jest.fn(() => {
          setTimeout(() => {
            xhr.readyState = 4;
            xhr.status = 201;
            xhr.responseText = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<PostResponse><Location>http://localhost:8082/key</Location></PostResponse>";
            if (xhr.onload) xhr.onload();
          }, 10);
        }),
        setRequestHeader: jest.fn(),
        addEventListener: jest.fn((event, handler) => {
          if (event === "load") xhr.onload = handler;
        }),
        upload: {
          addEventListener: jest.fn() // No progress events fired
        },
        readyState: 0,
        status: 0,
        responseText: "",
        timeout: 0
      };
      return xhr;
    });

    global.XMLHttpRequest = NoProgressXMLHttpRequest;

    const mockFile = createMockFile();

    // Should succeed but log a warning (no progress events)
    const response = await signUpload(mockFile);
    expect(response).toEqual(`${config.uploadBucket}/key`);
  });

  test("handles network error during upload", async () => {
    jest.setTimeout(10000); // Increase timeout for retry logic
    const ErrorXMLHttpRequest = jest.fn().mockImplementation(() => {
      const xhr = {
        open: jest.fn(),
        send: jest.fn(() => {
          setTimeout(() => {
            if (xhr.upload.onerror) {
              xhr.upload.onerror(new Error("Network error"));
            }
          }, 10);
        }),
        setRequestHeader: jest.fn(),
        addEventListener: jest.fn((event, handler) => {
          if (event === "error") xhr.onerror = handler;
        }),
        upload: {
          addEventListener: jest.fn((event, handler) => {
            if (event === "error") xhr.upload.onerror = handler;
          })
        },
        readyState: 0,
        status: 0,
        responseText: "",
        timeout: 0
      };
      return xhr;
    });

    global.XMLHttpRequest = ErrorXMLHttpRequest;

    const mockFile = createMockFile();

    await expect(signUpload(mockFile)).rejects.toThrow("Network error");
  });

  test("handles incomplete upload (less than 90% transmitted)", async () => {
    jest.setTimeout(10000); // Increase timeout for retry logic
    const IncompleteXMLHttpRequest = jest.fn().mockImplementation(() => {
      const xhr = {
        open: jest.fn(),
        send: jest.fn(() => {
          setTimeout(() => {
            xhr.readyState = 4;
            xhr.status = 201;
            xhr.responseText = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<PostResponse><Location>http://localhost:8082/key</Location></PostResponse>";
            if (xhr.onload) xhr.onload();
          }, 10);
        }),
        setRequestHeader: jest.fn(),
        addEventListener: jest.fn((event, handler) => {
          if (event === "load") xhr.onload = handler;
        }),
        upload: {
          addEventListener: jest.fn((event, handler) => {
            if (event === "progress") {
              // Only 50% uploaded
              setTimeout(() => handler({ loaded: 512, total: 1024 }), 5);
            }
          })
        },
        readyState: 0,
        status: 0,
        responseText: "",
        timeout: 0
      };
      return xhr;
    });

    global.XMLHttpRequest = IncompleteXMLHttpRequest;

    const mockFile = createMockFile();

    await expect(signUpload(mockFile)).rejects.toThrow("Upload failed after 3 attempts");
  });

  test("handles unexpected success status code", async () => {
    jest.setTimeout(10000); // Increase timeout for retry logic
    const WrongStatusXMLHttpRequest = jest.fn().mockImplementation(() => {
      const xhr = {
        open: jest.fn(),
        send: jest.fn(() => {
          setTimeout(() => {
            xhr.readyState = 4;
            xhr.status = 200; // Wrong status, should be 201
            xhr.responseText = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<PostResponse><Location>http://localhost:8082/key</Location></PostResponse>";
            if (xhr.onload) xhr.onload();
          }, 10);
        }),
        setRequestHeader: jest.fn(),
        addEventListener: jest.fn((event, handler) => {
          if (event === "load") xhr.onload = handler;
        }),
        upload: {
          addEventListener: jest.fn((event, handler) => {
            if (event === "progress") {
              setTimeout(() => handler({ loaded: 1024, total: 1024 }), 5);
            }
          })
        },
        readyState: 0,
        status: 0,
        responseText: "",
        timeout: 0
      };
      return xhr;
    });

    global.XMLHttpRequest = WrongStatusXMLHttpRequest;

    const mockFile = createMockFile();

    await expect(signUpload(mockFile)).rejects.toThrow("Upload failed after 3 attempts");
  });

  test("calls progress callback with correct value", async () => {
    const onProgress = jest.fn();
    const mockFile = createMockFile();

    await signUpload(mockFile, onProgress);

    expect(onProgress).toHaveBeenCalledWith(100); // Progress is in percentage (0-100)
  });
});
