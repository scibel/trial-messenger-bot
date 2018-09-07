"use strict";


// var exports = module.exports = {};

 var yumaFirstAttempt =  {
    executeAction:function(state){
        console.log("chooseAccountState function:");
        var response=[];
// there is no actions in this state
        // if(action==="YES_USE_MAIN_ACCOUNT"){
            response[0] = {text:'You have entered you password succesfully'};
            response[1] = {
                text: "Would you like to report a lost or stolen card or security key?",
                quick_replies:[
                  {
                    content_type:"text",
                    title:"Yes",
                    payload:"YES_I_HAVE_AN_ACCOUNT"
                  },
                  {
                    content_type:"text",
                    title:"No",
                    payload:"NO_I_DO_NOT_HAVE_AN_ACCOUNT"                         
                  }
                ]
            }
            //i should execute another action that move the user to entering first attampt state
            // next state Submit ticket with issue will contain buttons that has the credit numbers of the user and a postback called STOLEN_CREDIT_CARD_TO_BE_REPORTED
            return {"state":{"state":"Submit_ticket_with_issue","senderPsid":state.senderPsid},"response":response};
         
    }
};

module.exports = yumaFirstAttempt;

