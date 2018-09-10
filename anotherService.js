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
                                        title: "E-Payment",
                                        payload: "PAYMENT"
                                    },
                                    {
                                        type: "postback",
                                        title: "Cancel and Logout",
                                        payload: "CANCEL"
                                    }
                                ]
                            }
                        ]
                    }
                }

            }
            return { "state": { "state": "USER_INPUT_CORRECT_STATE", "senderPsid": state.senderPsid }, "response": response };
        }
    }
};
module.exports = anotherService;

