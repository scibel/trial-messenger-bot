"use strict";


// var exports = module.exports = {};

 var reportStolenCard =  {
    executeAction:function(action,state){

      console.log("action" , action);
      var response=[]; 


        if(action==="YES_REPORT_STOLEN_CARD"){
            // 
            console.log("YES_REPORT_STOLEN_CARD");

                    response[0] = {
                      attachment: {
                        type: "template",
                        payload: {
                          template_type: "generic",
                          elements: [
                            {
                              title: "Which credit card would you like to stop",
                              buttons: [
                                {
                                  type: "postback",
                                  title: "234234234234234232",
                                  payload: "CREDIT_CARD_234234234234234232"
                                },
                                {
                                  type: "postback",
                                  title: "4534534534534534",
                                  payload: "CREDIT_CARD_4534534534534534"
                                },
                              ]
                            }
                          ]
                        }
                      }
                    };
                    

                    return {"state":{"state":"NotYetSupported","senderPsid":state.senderPsid},"response":response};
            // } 
            
        }else if(action === "NO_I_DO_NOT_REPORT_STOLEN_CARD"){
          console.log("NO_I_DO_NOT_REPORT_STOLEN_CARD");

          response[0] = {
            attachment: {
              type: "template",
              payload: {
                template_type: "generic",
                elements: [
                  {
                    title: "Is this the right picture?",
                    subtitle: "Tap a button to answer.",
                    buttons: [
                      {
                        type: "postback",
                        title: "Main Account Balance",
                        payload: "Main_Account_Balance"
                      },
                      {
                        type: "postback",
                        title: "Main Account Transactions",
                        payload: "Main_Account_Transactions"
                      },
                      {
                        type: "postback",
                        title: "E-Payment",
                        payload: "E-Payment"
                      },
                      {
                        type: "postback",
                        title: "Cancel",
                        payload: "Cancel"
                      }
                    ]
                  }
                ]
              }
            }
          };

            return {"state":{"state":"NotYetSupported","senderPsid":state.senderPsid},"response":response};
        }
    }
    
};

module.exports = reportStolenCard ;