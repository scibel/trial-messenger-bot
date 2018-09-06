"use strict";


// var exports = module.exports = {};

 var chooseAccountState =  {
    executeAction:function(action,state){
        console.log("chooseAccountState function:"+action);
        var response=[];

        if(action==="YES_USE_MAIN_ACCOUNT"){
            // response[0] = {text:'YES_USE_MAIN_ACCOUNT'};
            response[0] = {
            attachment: {
                type: "template",
                payload: {
                  template_type: "button",
                  text: "What do you want to do next?",
                  buttons: [
                    {
                        type: "postback",
                        title: "Enter your pin",
                        payload: "FIRST_ATTEMPT"
                      },
                      {
                        type: "Call Support",
                        title: "No!",
                        payload: "PAYBILL_PAYLOAD"
                      }
                  ]
                }
              }
            }
            //i should execute another action that move the user to entering first attampt state
            return {"state":{"state":"yumaFirstAttempt","senderPsid":state.senderPsid},"response":response};
        } else if(action==="NO_USE_ANOTHER_ACCOUNT"){
            response[0] = {text:'NO_USE_ANOTHER_ACCOUNT'};
            return {"state":{"state":"nuaaFirstAttempt","senderPsid":state.senderPsid},"response":response};
        }
    }
};

module.exports = chooseAccountState;

