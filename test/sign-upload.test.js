import fs from "fs";
import http from "http";

import signUpload from "../src/sign-upload";

test("signs and uploads files to S3", async () => {
  const signerServer = http.createServer();
  const s3Server = http.createServer();

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

  s3Server.on("request", async (request, response) => {
    response.writeHead(201, { "Access-Control-Allow-Origin": "*" });
    response.end();
  });

  signerServer.listen(8081);
  s3Server.listen(8082);

  try {
    const onProgress = () => {
      onProgress.called = true;
    };
    onProgress.called = false;

    const file = fs.createReadStream(__filename);
    const response = await signUpload(file, onProgress);

    expect(response).toEqual("http://localhost:8082/key");
    expect(onProgress.called).toBe(true);
  } finally {
    signerServer.close();
    s3Server.close();
  }
});
