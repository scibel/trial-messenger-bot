"use strict";

const helloState = require("./helloState");
const doYouHaveAnAccountState = require("./doYouHaveAnAccountState");
const chooseAccountState = require("./chooseAccountState");
const yumaFirstAttempt = require("./yumaFirstAttempt");
const TICKET_WITH_ISSUE = require("./ticketwithissue");
const USER_INPUT_CORRECT_STATE = require("./userinputcorrectstate")
const ANOTHER_SERVICE = require("./anotherservice")




var stateList = [];

stateList["helloState"] = helloState;
stateList["doYouHaveAnAccountState"] = doYouHaveAnAccountState;
stateList["chooseAccountState"] = chooseAccountState;
stateList["yumaFirstAttempt"] = yumaFirstAttempt;
stateList["TICKET_WITH_ISSUE"] = TICKET_WITH_ISSUE;
stateList["USER_INPUT_CORRECT_STATE"] = USER_INPUT_CORRECT_STATE;
stateList["ANOTHER_SERVICE"] = ANOTHER_SERVICE;

module.exports = stateList;
