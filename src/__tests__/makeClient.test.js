import createServer from "./createServer";

import makeClient from "../makeClient";
import state from "../state";

afterEach(() => state.clear());

test("allows you to create a client with a custom host", async () => {
  const server = createServer({ status: 200 });
  server.listen(8081);

  const { makeGet } = makeClient({ apiHost: "http://localhost:8081" });

  try {
    const response = await makeGet("/profile");
    expect(response.status).toEqual(200);
  } finally {
    server.close();
  }
});
