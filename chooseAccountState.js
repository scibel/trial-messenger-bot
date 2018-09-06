"use strict";


// var exports = module.exports = {};

 var chooseAccountState =  {
    executeAction:function(action,state){
        console.log("chooseAccountState function:"+action);
        var response=[];

        if(action==="YES_USE_MAIN_ACCOUNT"){
            response[0] = {text:'YES_USE_MAIN_ACCOUNT'};
            response[1] = {
                attachment: {
                  type: "template",
                  payload: {
                    template_type: "generic",
                    elements: [
                      {
                        title: "Enter your pin",
                        subtitle: "Tap a button to answer.",
                        image_url: attachment_url,
                        buttons: [
                          {
                            type: "postback",
                            title: "Enter your pin",
                            payload: "yes"
                          },
                          {
                            type: "Call Support",
                            title: "No!",
                            payload: "PAYBILL_PAYLOAD"
                          }
                        ]
                      }
                    ]
                  }
                }
              };
            //i should execute another action that move the user to entering first attampt state
            return {"state":{"state":"yumaFirstAttempt","senderPsid":state.senderPsid},"response":response};
        } else if(action==="NO_USE_ANOTHER_ACCOUNT"){
            response[0] = {text:'NO_USE_ANOTHER_ACCOUNT'};
            return {"state":{"state":"nuaaFirstAttempt","senderPsid":state.senderPsid},"response":response};
        }
    }
};

module.exports = chooseAccountState;

