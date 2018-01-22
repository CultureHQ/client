#!/usr/bin/env node

const fs = require("fs");

const content = JSON.parse(fs.readFileSync("src/calls.json"));
const modified = {};

Object.keys(content)
  .sort()
  .forEach(key => {
    modified[key] = content[key];
  });

fs.writeFileSync("src/calls.json", JSON.stringify(modified, null, 2) + "\n");
