"use strict";
var accountServicesState = {
    executeAction: function (action, state) {
        var response = [];
        if (action === "LOGOUT") {
            response[0] = { text: 'Thank you for chatting with OLE Bank Bot. For more information, please access our website @ www.olebank.com or contact us @ 19555' };
            response[1] = { text: 'If you would like to re-engage with the bot please say Hi' }
            return { "state": { "state": "thankYouState", "senderPsid": state.senderPsid }, "response": response };
        }
        else if (action === "ACCOUNT_BALANCE") {
            response[0] = { text: 'Main account balance is 15000 LE' };
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
            response[0] = {
                attachment: {
                    type: "file",
                    payload: { is_reusable: true }
                },
                filedata: "./attachments/statement.docx"
            };
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
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [
                            {
                                title: "Please, choose one of the services below:",
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
                                        title: "Cancel and Logout",
                                        payload: "LOGOUT"
                                    }
                                ]
                            }
                        ]
                    }
                }

            }
            return { "state": { "state": "accountServiceState", "senderPsid": state.senderPsid }, "response": response };
        }
    }
};

module.exports = accountServicesState;
