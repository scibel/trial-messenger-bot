"use strict";
var ticketSubmissionState = {
    executeAction: function (action, state) {
        var response = [];
        if (action === "NO_I_DO_NOT_REPORT_STOLEN_CARD") {
            response[0] = {
                text: "Please, choose one of the services below:",
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [
                            {
                                title: "Please choose card/key that has been lost/stolen: ",
                                buttons: [
                                    {
                                        type: "postback",
                                        title: "Balance",
                                        payload: "ACCOUNT_BALANCE"
                                    },
                                    {
                                        type: "postback",
                                        title: "Transactions",
                                        payload: "ACCOUNT_TRANSACTIONS"
                                    },
                                    {
                                        type: "postback",
                                        title: "Cancel and Logout",
                                        payload: "LOGOUT"
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
