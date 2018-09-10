"use strict";

const helloState = require("./helloState");
const doYouHaveAnAccountState = require("./doYouHaveAnAccountState");
const chooseAccountState = require("./chooseAccountState");
const yumaFirstAttempt = require("./yumaFirstAttempt");
const TICKET_SUBMISSION_STATE = require("./ticketsubmissionstate");
const ACCOUNT_SERVICE_STATE = require("./accountservicessatate")
const ANOTHER_SERVICE = require("./anotherservice")




var stateList = [];

stateList["helloState"] = helloState;
stateList["doYouHaveAnAccountState"] = doYouHaveAnAccountState;
stateList["chooseAccountState"] = chooseAccountState;
stateList["yumaFirstAttempt"] = yumaFirstAttempt;
stateList["TICKET_SUBMISSION_STATE"] = TICKET_SUBMISSION_STATE;
stateList["ACCOUNT_SERVICE_STATE"] = ACCOUNT_SERVICE_STATE;
stateList["ANOTHER_SERVICE"] = ANOTHER_SERVICE;

module.exports = stateList;
