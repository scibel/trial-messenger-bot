"use strict";
var UserInputCorrectState = {
    executeAction: function (action, state) {
        var response = [];
        if (action === "CANCEL") {
            response[0] = { text: 'Thank you for chatting with OLE Bank Bot. For more information, please access our website @ www.olebank.com or contact us @ 19555' };
            response[1] = { text: 'IF you would like to re-engage with the bot please say Hi' }
            return { "state": { "state": "thankYouState", "senderPsid": state.senderPsid }, "response": response };
        }
        else if (action === "ACCOUNT_BALANCE") {
            response[0] = { text: 'Main account balance is XXXLE' };
            response[1] = {
                text: 'Would you like another service?',
                quick_replies: [
                    {
                        content_type: "text",
                        title: "Yes",
                        payload: "YES"
                    },
                    {
                        content_type: "text",
                        title: "No",
                        payload: "NO"
                    }
                ]
            };
            return { "state": { "state": "ANOTHER_SERVICE", "senderPsid": state.senderPsid }, "response": response };
        }
        else if (action === "ACCOUNT_TRANSACTIONS") {
            response[0] = { text: 'Retrieve last 10 transactions from DB' };
            response[1] = { text: 'Export transactions into PDF Format' };
            response[2] = {
                text: 'Would you like another service?',
                quick_replies: [
                    {
                        content_type: "text",
                        title: "Yes",
                        payload: "YES"
                    },
                    {
                        content_type: "text",
                        title: "No",
                        payload: "NO"
                    }
                ]
            };
            return { "state": { "state": "ANOTHER_SERVICE", "senderPsid": state.senderPsid }, "response": response };
        }
        else if (action === "PAYMENT") {
            response[0] = { text: 'PAYMENT OPTION ' };
            response[1] = {
                text: 'Would you like another service?',
                quick_replies: [
                    {
                        content_type: "text",
                        title: "Yes",
                        payload: "YES"
                    },
                    {
                        content_type: "text",
                        title: "No",
                        payload: "NO"
                    }
                ]
            };
            return { "state": { "state": "ANOTHER_SERVICE", "senderPsid": state.senderPsid }, "response": response };
        } else {
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

module.exports = UserInputCorrectState;
