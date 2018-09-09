"use strict";
var TicketWithIssue = {
    executeAction: function (action, state) {
        var response = [];
        if (action === "NO_DO_NOT_SUBMIT_STOLEN_CARD") {
            response[0] = {
                text: "Please, choose one of the services below:" +
                    + "(1) Main Account Balance"
                    + "(2) Main Account Transactions"
                    + "(3) E-Payment"
                    + "(4) Cancel"
            };
            response[1] = {
                quick_replies: [
                    {
                        content_type: "text",
                        title: "( 1 )",
                        payload: "ACCOUNT_BALANCE"
                    },
                    {
                        content_type: "text",
                        title: "( 2 )",
                        payload: "ACCOUNT_TRANSACTIONS"
                    },
                    {
                        content_type: "text",
                        title: "( 3 )",
                        payload: "PAYMENT"
                    },
                    {
                        content_type: "text",
                        title: "( 4 )",
                        payload: "CANCEL"
                    }
                ]
            }
            return { "state": { "state": "USER_INPUT_CORRECT_STATE", "senderPsid": state.senderPsid }, "response": response };

        }
    }
};

module.exports = TicketWithIssue;
