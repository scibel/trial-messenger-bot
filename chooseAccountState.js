"use strict";


// var exports = module.exports = {};

 var chooseAccountState =  {
    executeAction:function(action,state){
        console.log("chooseAccountState function:"+action);
        var response=[];

        if(action==="YES_USE_MAIN_ACCOUNT"){
            response[0] = {text:'Enter your pin code'};
            return {"state":{"state":"yumaSecondAttempt","senderPsid":state.senderPsid},"response":response};
        } else if(action==="NO_USE_ANOTHER_ACCOUNT"){
            response[0] = {
                attachment: {
                    type: "template",
                    payload: {
                        template_type: "generic",
                        elements: [
                            {
                                title: "Please choose one of the accounts below:",
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

            }

            return {"state":{"state":"yumaSecondAttempt","senderPsid":state.senderPsid},"response":response};
        }
    }
};

module.exports = chooseAccountState;

