import http from "http";

const createServer = mockConfig => {
  let mocks;
  if (typeof mockConfig.forEach === "undefined") {
    // it's an object
    mocks = [mockConfig];
  } else {
    mocks = mockConfig;
  }

  const server = http.createServer((request, response) => {
    if (mocks.length) {
      const mock = mocks.shift();
      response.writeHead(mock.status, { "Content-Type": "application/json" });
      response.write(JSON.stringify(mock.body));
    } else {
      response.writeHead(404);
    }
    response.end();
  });

  return server;
};

export default createServer;
