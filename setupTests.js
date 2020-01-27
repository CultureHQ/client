/* eslint-disable import/no-extraneous-dependencies */

import "isomorphic-fetch";
import "isomorphic-form-data";
import "url-polyfill";

import { configure } from "./src/client";

configure({
  apiHost: "http://localhost:8080",
  awsAccessKeyId: "access-key-id",
  signerURL: "http://localhost:8081",
  uploadBucket: "http://localhost:8082"
});

class LocalStorage {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorage();
