"use strict";

var anotherService = {
    executeAction: function (action, state) {
        var response = [];
        if (action === "WOULD_YOU_LIKE_ANOTHER_SERVICE_NO") {
            response[0] = { text: 'Thank you for chatting with OLE Bank Bot. For more information, please access our website @ www.olebank.com or contact us @ 19555' };
            response[1] = { text: 'If you would like to re-engage with the bot please say Hi' }
            return { "state": { "state": "thankYouState", "senderPsid": state.senderPsid }, "response": response };
        }
        else if (action === "WOULD_YOU_LIKE_ANOTHER_SERVICE_YES") {
            response[0] = {
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
module.exports = anotherService;

