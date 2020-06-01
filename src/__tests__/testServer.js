import { createServer } from "http";

import { configure } from "../client";

const testServer = createServer();

testServer.port = 8080;

testServer.requests = [];
testServer.mocks = [];

testServer.mock = mock => {
  testServer.mocks.push(mock);
};

export const startTestServer = () => new Promise(resolve => {
  testServer.on("request", (request, response) => {
    const { status, body = {} } = testServer.mocks.shift();
    testServer.requests.push(request);

    response.writeHead(status, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET"
    });

    response.write(JSON.stringify(body));
    response.end();
  });

  testServer.on("error", () => {
    testServer.close(() => {
      testServer.port += 1;
      testServer.listen(testServer.port);
    });
  });

  testServer.on("listening", () => {
    configure({ apiHost: `http://localhost:${testServer.port}` });
    resolve();
  });

  testServer.listen({ port: testServer.port, host: "localhost", exclusive: true });
});

export const stopTestServer = () => (
  new Promise(resolve => testServer.close(() => resolve()))
);

export default testServer;
