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
                                        title: "E-Payment",
                                        payload: "EPAYMENT"
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
module.exports = anotherService;

