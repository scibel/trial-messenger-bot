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

const ACCOUNT_SERVICE_STATE = require("./accountservicessatate")
const anotherservice = require("./anotherservice")



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

stateList["ACCOUNT_SERVICE_STATE"] = ACCOUNT_SERVICE_STATE;
stateList["anotherservice"] = anotherservice;

module.exports = stateList;
