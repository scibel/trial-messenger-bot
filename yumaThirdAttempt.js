"use strict";


// var exports = module.exports = {};

 var yumaFirstAttempt =  {
    executeAction:function(state){
        console.log("chooseAccountState function:");
        var response=[];
// there is no actions in this state
        // if(action==="YES_USE_MAIN_ACCOUNT"){
            response[0] = {text:'This is your third and last attempt please enter your password'};
          
            //i should execute another action that move the user to entering first attampt state
            // next state Submit ticket with issue will contain buttons that has the credit numbers of the user and a postback called STOLEN_CREDIT_CARD_TO_BE_REPORTED
            return {"state":{"state":"Blocked","senderPsid":state.senderPsid},"response":response};
         
    }
};

module.exports = yumaFirstAttempt;

