import http from "http";

const parsedBody = request => new Promise(resolve => {
  const chunks = [];

  request.on("data", chunk => chunks.push(chunk)).on("end", () => {
    resolve(Buffer.concat(chunks).toString());
  });
});

const createServer = mockConfig => {
  let mocks;

  if (typeof mockConfig.forEach === "undefined") {
    mocks = [mockConfig]; // it's an object
  } else {
    mocks = mockConfig;
  }

  const server = http.createServer();
  server.requests = [];

  server.on("request", async (request, response) => {
    // eslint-disable-next-line require-atomic-updates
    request.parsedBody = await parsedBody(request);
    server.requests.push(request);

    const { status, body } = mocks.shift();
    response.writeHead(status, { "Content-Type": "application/json" });
    response.write(JSON.stringify(body));
    response.end();
  });

  return server;
};

export default createServer;
