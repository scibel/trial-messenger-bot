"use strict";

// var exports = module.exports = {};

var reportStolenCard = {
  executeAction: function (action, state) {
    console.log("action", action);
    var response = [];

    if (action === "YES_REPORT_STOLEN_CARD") {
      //
      console.log("YES_REPORT_STOLEN_CARD");

      // response[0] = {
      //   attachment: {
      //     type: "template",
      //     payload: {
      //       template_type: "generic",
      //       elements: [
      //         {
      //           title: "Which credit card would you like to stop",
      //           buttons: [
      //             {
      //               type: "postback",
      //               title: "234234234234234232",
      //               payload: "CREDIT_CARD_1"
      //             },
      //             {
      //               type: "postback",
      //               title: "4534534534534534",
      //               payload: "CREDIT_CARD_2"
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   }
      // };

      response[0] = {
        text:
          "Which credit card would you like to report",
        quick_replies: [
          {
            content_type: "text",
            title: "234234234234234232",
            payload: "CREDIT_CARD_1"
          },
          {
            content_type: "text",
            title: "4534534534534534",
            payload: "CREDIT_CARD_2"
          }
        ]
      };

      return {
        state: { state: "stolenCardTicket", senderPsid: state.senderPsid },
        response: response
      };

    } else if (action === "NO_I_DO_NOT_REPORT_STOLEN_CARD") {
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
      return { "state": { "state": "ACCOUNT_SERVICE_STATE", "senderPsid": state.senderPsid }, "response": response };

    }
  }
};

module.exports = reportStolenCard;
