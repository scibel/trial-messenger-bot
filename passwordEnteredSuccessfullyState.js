"use strict";


// var exports = module.exports = {};

 var passwordEnteredSuccessfullyState =  {
    executeAction:function(state){
        console.log("chooseAccountState function:");
        var response=[];

        response[0] = {text:'You have entered your pin code successfully'};

        response[1] = {text:'Welcome Mr. Tarek'};

        response[2] = {
            text: "Would you like to report a lost or stolen card or security key?",
            quick_replies: [
              {
                content_type: "text",
                title: "Yes",
                payload: "YES_REPORT_STOLEN_CARD"
              },
              {
                content_type: "text",
                title: "No",
                payload: "NO_I_DO_NOT_REPORT_STOLEN_CARD"
              }
            ]
          }
          
          return { "state": { "state": "reportStolenCard", "senderPsid": state.senderPsid }, "response": response };
         
    }
};

module.exports = passwordEnteredSuccessfullyState;

