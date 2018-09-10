"use strict";

const helloState = require("./helloState");
const doYouHaveAnAccountState = require("./doYouHaveAnAccountState");
const chooseAccountState = require("./chooseAccountState");
const yumaFirstAttempt = require("./yumaFirstAttempt");
const yumaSecondAttempt = require("./yumaSecondAttempt");
const yumaThirdAttempt = require("./yumaThirdAttempt");

const reportStolenCard = require("./reportStolenCard");
const stolenCardTicket = require("./stolenCardTicket");



var stateList = [];

stateList["helloState"] = helloState;
stateList["doYouHaveAnAccountState"] = doYouHaveAnAccountState;
stateList["chooseAccountState"] = chooseAccountState;
stateList["yumaFirstAttempt"] = yumaFirstAttempt;
stateList["yumaSecondAttempt"] = yumaSecondAttempt;
stateList["yumaThirdAttempt"] = yumaThirdAttempt;

stateList["reportStolenCard"] = reportStolenCard;
stateList["stolenCardTicket"] = stolenCardTicket;



module.exports = stateList;
