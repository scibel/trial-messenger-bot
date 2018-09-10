"use strict";
var TicketWithIssue = {
    executeAction: function (action, state) {
        var response = [];
        if (action === "NO_DO_NOT_SUBMIT_STOLEN_CARD") {
            response[1] = {
                text: "Please, choose one of the services below: \n"
                    + "(1) Main Account Balance \n"
                    + "(2) Main Account Transactions \n"
                    + "(3) E-Payment \n"
                    + "(4) Cancel \n",
                quick_replies: [
                    {
                        content_type: "text",
                        title: "Balance",
                        payload: "ACCOUNT_BALANCE"
                    },
                    {
                        content_type: "text",
                        title: "Transactions",
                        payload: "ACCOUNT_TRANSACTIONS"
                    },
                    {
                        content_type: "text",
                        title: "Payment",
                        payload: "PAYMENT"
                    },
                    {
                        content_type: "text",
                        title: "Cancel",
                        payload: "CANCEL"
                    }
                ]
            }
            return { "state": { "state": "USER_INPUT_CORRECT_STATE", "senderPsid": state.senderPsid }, "response": response };

        }
    }
};

module.exports = TicketWithIssue;
