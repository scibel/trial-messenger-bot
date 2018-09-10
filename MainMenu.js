"use strict";

// var exports = module.exports = {};

var MainMenu = {
  executeAction: function(action, state) {
    console.log("action", action);
    var response = [];

    if (action === "YES_REPORT_STOLEN_CARD") {
      //
      console.log("YES_REPORT_STOLEN_CARD");

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
      // }
    } else if (action === "NO_I_DO_NOT_REPORT_STOLEN_CARD") {
      console.log("NO_I_DO_NOT_REPORT_STOLEN_CARD");
      response[0] = {
        text:
          "We have identified that your Facebook account is associated a main account number ending with 5555. Would you like to continue with this account number?",
        quick_replies: [
          {
            content_type: "text",
            title: "Main Account Balance",
            payload: "Main_Account_Balance"
          },
          {
            content_type: "text",
            title: "Main Account Transactions",
            payload: "Main_Account_Transactions"
          },
          {
            content_type: "text",
            title: "E-Payments",
            payload: "Main_Account_Transactions"
          },
          {
            content_type: "text",
            title: "Cancel",
            payload: "E-Payments"
          }
        ]
      };

      return {
        state: { state: "MainMenu", senderPsid: state.senderPsid },
        response: response
      };
    }
  }
};

module.exports = MainMenu;


"use strict";


// var exports = module.exports = {};

 var MainMenu =  {
    executeAction:function(state){
        console.log("chooseAccountState function:");
        var response=[];
// there is no actions in this state
        // if(action==="YES_USE_MAIN_ACCOUNT"){
            response[0] = {
                text:
                  "We have identified that your Facebook account is associated a main account number ending with 5555. Would you like to continue with this account number?",
                quick_replies: [
                  {
                    content_type: "text",
                    title: "Main Account Balance",
                    payload: "Main_Account_Balance"
                  },
                  {
                    content_type: "text",
                    title: "Main Account Transactions",
                    payload: "Main_Account_Transactions"
                  },
                  {
                    content_type: "text",
                    title: "E-Payments",
                    payload: "Main_Account_Transactions"
                  },
                  {
                    content_type: "text",
                    title: "Cancel",
                    payload: "E-Payments"
                  }
                ]
              };
            //i should execute another action that move the user to entering first attampt state
            // next state Submit ticket with issue will contain buttons that has the credit numbers of the user and a postback called STOLEN_CREDIT_CARD_TO_BE_REPORTED
            return {"state":{"state":"waitState","senderPsid":state.senderPsid},"response":response};
         
    }
};

module.exports = MainMenu;


