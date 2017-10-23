import createServer from "./create-server";
import request from "../src/request";

const parseMultipart = (body, boundary) => {
  const values = [];
  const parts = body.split(boundary);
  const namePattern = /"(.+)"/;

  for (let idx = 1; idx < parts.length - 1; idx++) {
    const components = parts[idx].split("\r\n");
    const name = components[1].match(namePattern)[1];
    values.push({ name, value: components[3] });
  }

  return values;
};

test("properly handles multipart array parameters", async () => {
  const server = createServer({ status: 200, body: { foo: "bar" } });
  server.listen(8080);

  try {
    const response = await request("POST", new URL("http://localhost:8080"), {
      params: { foo: [1, 2, 3] },
      multipart: true
    });
    expect(server.requests.length).toEqual(1);

    const contentType = server.requests[0].headers["content-type"];
    const parsedBody = parseMultipart(
      server.requests[0].parsedBody,
      contentType.split("boundary=")[1]
    );

    for (let idx = 0; idx < 3; idx++) {
      expect(parsedBody[idx]).toEqual({
        name: "foo[]",
        value: (idx + 1).toString()
      });
    }
  } finally {
    server.close();
  }
});