# @culturehq/client

[![Build Status](https://travis-ci.com/CultureHQ/client.svg?branch=master)](https://travis-ci.com/CultureHQ/client)
[![Package Version](https://img.shields.io/npm/v/@culturehq/client.svg)](https://www.npmjs.com/package/@culturehq/client)
[![Minified GZipped Size](https://img.shields.io/bundlephobia/minzip/@culturehq/client.svg)](https://www.npmjs.com/package/@culturehq/client)

A JavaScript client that wraps the CultureHQ API.

## Getting started

Import the package into your `node` application like:

```js
import client from "@culturehq/client";
```

Every API call function returns a `Promise`. You can call them using normal `Promise` semantics, as in below:

```js
const getProfile = () => {
  client.getProfile().then(response => {
    console.log(response);
  }).catch(error => {
    console.error(error);
  });
};
```

or you can use `async`/`await` syntax, as in below:

```js
const getProfile = async () => {
  try {
    const response = await client.getProfile();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
```

Each function can be introspected to determine its expected parameters (`expectedParams`) and optional parameters (`optionalParams`), as in:

```js
const { expectedParams, optionalParams } = client.createEvent;
```

If a function has `multipart` set on its config, it's because one or more of the attributes require a file object. In this case, a `File` object should be given for the value, as in:

```js
const avatar = document.querySelector("#avatar").files[0];
const response = await client.updateUser({ userId: 12345, avatar });
```

## Development

First, install the dependencies with `yarn`.

### Styling

Styling is handled through `prettier`. Run it with `yarn prettier`.

### Testing

Run `yarn test` to run the tests with `jest`.
