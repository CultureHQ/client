import http from "http";

const parsedBody = request => {
  return new Promise((resolve, reject) => {
    let chunks = [];

    request.on("data", chunk => chunks.push(chunk)).on("end", () => {
      resolve(Buffer.concat(chunks).toString());
    });
  });
};

const createServer = mockConfig => {
  let mocks;
  if (typeof mockConfig.forEach === "undefined") {
    // it's an object
    mocks = [mockConfig];
  } else {
    mocks = mockConfig;
  }

  const server = http.createServer();
  server.requests = [];

  server.on("request", async (request, response) => {
    try {
      request.parsedBody = await parsedBody(request);
      server.requests.push(request);
    } catch (error) {
      console.error(error);
    }

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
