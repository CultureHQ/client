import { createServer } from "http";

import { config, configure, signUpload } from "../client";

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

const stopSignerServer = () => new Promise(resolve => signerServer.close(resolve));

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

const stopS3Server = () => new Promise(resolve => s3Server.close(resolve));

beforeAll(async () => {
  await startSignerServer();
  await startS3Server();
});

afterAll(async () => {
  await stopSignerServer();
  await stopS3Server();
});

test("signs and uploads files to S3", async () => {
  const onProgress = jest.fn();
  const response = await signUpload("mock file", onProgress);

  expect(response).toEqual(`${config.uploadBucket}/key`);
  expect(onProgress).toHaveBeenCalledTimes(1);
});
