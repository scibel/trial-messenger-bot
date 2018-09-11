"use strict";

// var exports = module.exports = {};

var reportStolenCard = {
  executeAction: function (action, state) {
    console.log("action", action);
    var response = [];

    if (action === "YES_REPORT_STOLEN_CARD") {
      //
      console.log("YES_REPORT_STOLEN_CARD");

      response[0] = {
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
                    title: "234234234234234232",
                    payload: "CREDIT_CARD_1"
                  },
                  {
                    type: "postback",
                    title: "4534534534534534",
                    payload: "CREDIT_CARD_2"
                  }
                ]
              }
            ]
          }
        }
      };

      return {
        state: { state: "stolenCardTicket", senderPsid: state.senderPsid },
        response: response
      };

    } else if (action === "NO_I_DO_NOT_REPORT_STOLEN_CARD") {
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

module.exports = reportStolenCard;
