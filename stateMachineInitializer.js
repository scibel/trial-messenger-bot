"use strict";

const helloState = require("./helloState");
const doYouHaveAnAccountState = require("./doYouHaveAnAccountState");
const chooseAccountState = require("./chooseAccountState");
const chooseAccountState = require("./chooseAccountState");




var stateList = [];

stateList["helloState"] = helloState;
stateList["doYouHaveAnAccountState"] = doYouHaveAnAccountState;
stateList["chooseAccountState"] = chooseAccountState;
stateList["yumaFirstAttempt"] = yumaFirstAttempt;



module.exports = stateList;
