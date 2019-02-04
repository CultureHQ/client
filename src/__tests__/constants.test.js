import * as constants from "../constants";

test("exports sane values for each constant", () => {
  Object.keys(constants).forEach(constant => {
    expect(typeof constants[constant]).toEqual("string");
  });
});
