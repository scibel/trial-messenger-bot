"use strict";
var ticketSubmissionState = {
    executeAction: function (action, state) {
        var response = [];
        if (action === "NO_I_DO_NOT_REPORT_STOLEN_CARD") {
            response[0] = {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [
                            {
                                title: "Please choose one of the services below:",
                                buttons: [
                                    {
                                        type: "postback",
                                        title: "Account Balance",
                                        payload: "ACCOUNT_BALANCE"
                                    },
                                    {
                                        type: "postback",
                                        title: "Account Transactions",
                                        payload: "ACCOUNT_TRANSACTIONS"
                                    },
                                    {
                                        type: "postback",
                                        title: "Authorize E-Payment",
                                        payload: "EPAYMENT"
                                    }
                                ]
                            }
                        ]
                    }
                }

            }
            return { "state": { "state": "ACCOUNT_SERVICE_STATE", "senderPsid": state.senderPsid }, "response": response };
        }
        else if (action === 'YES_REPORT_STOLEN_CARD') {

        }
    }
};

module.exports = ticketSubmissionState;
