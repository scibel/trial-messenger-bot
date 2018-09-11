"use strict";

const helloState = require("./helloState");
const doYouHaveAnAccountState = require("./doYouHaveAnAccountState");
const chooseAccountState = require("./chooseAccountState");
const yumaFirstAttempt = require("./yumaFirstAttempt");
const yumaSecondAttempt = require("./yumaSecondAttempt");
const yumaThirdAttempt = require("./yumaThirdAttempt");
const blockedState = require("./blockedState");
const passwordEnteredSuccessfullyState = require("./passwordEnteredSuccessfullyState");

const reportStolenCard = require("./reportStolenCard");
const stolenCardTicket = require("./stolenCardTicket");

const accountServiceState = require("./accountServiceState");
const anotherService = require("./anotherService");
const onlineStoresState = require("./onlineStoresState")




var stateList = [];

stateList["helloState"] = helloState;
stateList["doYouHaveAnAccountState"] = doYouHaveAnAccountState;
stateList["chooseAccountState"] = chooseAccountState;
stateList["yumaFirstAttempt"] = yumaFirstAttempt;
stateList["yumaSecondAttempt"] = yumaSecondAttempt;
stateList["yumaThirdAttempt"] = yumaThirdAttempt;
stateList["blockedState"] = blockedState;
stateList["passwordEnteredSuccessfullyState"] = passwordEnteredSuccessfullyState;


stateList["reportStolenCard"] = reportStolenCard;
stateList["stolenCardTicket"] = stolenCardTicket;

stateList["accountServiceState"] = accountServiceState;
stateList["anotherService"] = anotherService;
stateList["onlineStoresState"] = onlineStoresState;

module.exports = stateList;
