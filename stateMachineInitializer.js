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
const onlineStoresState = require("./onlineStoresState");
const enterTransactionNumberState = require("./enterTransactionNumberState");
const issuePaymentState = require("./issuePaymentState");
const enterPinCodeState = require("./enterPinCodeState");
const enterBankAccountNumberState = require("./enterBankAccountNumberState");
const rejectedPaymentsState = require("./rejectedPaymentsState");




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
stateList["enterTransactionNumberState"] = enterTransactionNumberState;
stateList["issuePaymentState"] = issuePaymentState;
stateList["enterPinCodeState"] = enterPinCodeState;
stateList["enterBankAccountNumberState"] = enterBankAccountNumberState;
stateList["rejectedPaymentsState"] = rejectedPaymentsState;


module.exports = stateList;
