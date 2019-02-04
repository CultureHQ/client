import formData from "../formData";

const serializeFormData = data => { /* eslint-disable no-underscore-dangle */
  const serialized = [];

  for (let idx = 0; idx < data._streams.length; idx += 3) {
    const field = data._streams[idx];

    serialized.push({
      key: field.slice(field.indexOf("name=\"") + 6, field.lastIndexOf("\"")),
      value: data._streams[idx + 1]
    });
  }

  return serialized;
};

test("builds form data", () => {
  const data = formData({ foo: "bar", bar: "baz" });

  expect(data.constructor).toEqual(FormData);
  expect(serializeFormData(data)).toEqual([
    { key: "foo", value: "bar" },
    { key: "bar", value: "baz" }
  ]);
});

test("handles arrays in form data", () => {
  const params = { foo: ["bar", "baz"] };

  expect(serializeFormData(formData(params))).toEqual([
    { key: "foo[]", value: "bar" },
    { key: "foo[]", value: "baz" }
  ]);
});

test("handles empty arrays in form data", () => {
  const params = { foo: [] };

  expect(serializeFormData(formData(params))).toEqual([
    { key: "foo[]", value: "" }
  ]);
});

test("handles undefined and null values", () => {
  const params = { foo: null, bar: undefined };

  expect(serializeFormData(formData(params))).toEqual([
    { key: "foo", value: "" },
    { key: "bar", value: "" }
  ]);
});
