/* eslint-disable import/no-extraneous-dependencies */

import "isomorphic-fetch";
import "isomorphic-form-data";
import "url-polyfill";

import { configure } from "./src/client";
import { startTestServer, stopTestServer } from "./src/__tests__/testServer";

configure({
  apiHost: "http://localhost:8080",
  awsAccessKeyId: "access-key-id",
  signerURL: "http://localhost:8081",
  uploadBucket: "http://localhost:8082"
});

const makeLocalStorage = () => {
  let store = {};

  return {
    clear() {
      store = {};
    },
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    }
  };
};

global.localStorage = makeLocalStorage();

beforeAll(() => startTestServer());
afterAll(() => stopTestServer());
