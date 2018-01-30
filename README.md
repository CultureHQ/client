# culturehq-client

[![Build Status](https://travis-ci.com/CultureHQ/client.svg?token=kQUiABmGkzyHdJdMnCnv&branch=master)](https://travis-ci.com/CultureHQ/client)

A JavaScript client that wraps the CultureHQ API.

## Getting started

Import the package into your `node` application like:

```js
import CultureHQ from "culturehq-client";
```

You initialize a client with an object that contains information about how to connect to a valid CultureHQ server. For basic integration, use:

```js
const cultureHQ = new CultureHQ({ apiHost: "https://api.culturehq.com" });
```

Every function except `isSignedIn` and `signOut` returns a `Promise`. You can call them using normal `Promise` semantics, as in below:

```js
const getProfile = () => {
  cultureHQ.getProfile().then(response => {
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
    const response = await cultureHQ.getProfile();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
```

Each function can be introspected to determine its `expectedParams` and `optionalParams`, as in:

```js
const expectedParams = cultureHQ.createEvent.expectedParams;
const optionalParams = cultureHQ.createEvent.optionalParams;
```

If a function has `multipart = true` set on its config, it's because one or more of the attributes require a file object. In this case, a `File` object should be given for the value, as in:

```js
const avatar = document.querySelector("#avatar").files[0];
const response = await cultureHQ.updateUser({ userId: 12345, avatar });
```

## Development

First, install the dependencies with `yarn`.

### Styling

Styling is handled through `prettier`. Run it with `yarn cleanup`.

### Testing

Run `yarn test` to run the tests with `jest`.

### Releasing

First, bump the version in [package.json](package.json). Then, build the client with `yarn build`. This will generate a new `dist/index.js`. Finally, modify [CHANGELOG.md](CHANGELOG.md) to include the new release.
