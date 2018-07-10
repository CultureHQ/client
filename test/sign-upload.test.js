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

  signerServer.listen(8080);
  s3Server.listen(8081);

  try {
    const client = {
      awsAccessKeyId: "access-key-id",
      signerUrl: "http://localhost:8080",
      uploadBucket: "http://localhost:8081"
    };

    const response = await signUpload(client, fs.createReadStream(__filename));

    expect(response).toEqual(`${client.uploadBucket}/key`);
  } finally {
    signerServer.close();
    s3Server.close();
  }
});
