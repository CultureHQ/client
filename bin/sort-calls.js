#!/usr/bin/env node

const fs = require("fs");

const content = JSON.parse(fs.readFileSync("src/calls.json"));
fs.writeFileSync("src/calls.json", JSON.stringify(content, null, 2) + "\n");
