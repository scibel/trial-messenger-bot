"use strict";

const helloState = require("./helloState");

console.log(helloState);

var stateList = [];

stateList["helloState"] = helloState;

module.exports = stateList;
