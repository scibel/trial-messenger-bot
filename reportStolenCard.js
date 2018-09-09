"use strict";


// var exports = module.exports = {};

 var reportStolenCard =  {
    executeAction:function(action,state){
        if(action==="YES_REPORT_STOLEN_CARD"){
            var response=[];
 
            response[0] = {text:'Welcome to OLE Bank'};
            console.log(state.senderPsid);
            // we need to change this 
            if(state.senderPsid === '902533626537343'){
                console.log("We have identified that your Faceb a main account number ending with 5555")
                response[1] = {
                        text: "We have identified that your Facebook account is associated a main account number ending with 5555. Would you like to continue with this account number?",
                        quick_replies:[
                            {
                              content_type:"text",
                              title:"Yes",
                              payload:"YES_USE_MAIN_ACCOUNT"
                            },
                            {
                              content_type:"text",
                              title:"No",
                              payload:"NO_USE_ANOTHER_ACCOUNT"                         
                            }
                          ]
                    }
                    return {"state":{"state":"chooseAccountState","senderPsid":state.senderPsid},"response":response};
            } else if("NO_I_DO_NOT_REPORT_STOLEN_CARD"){

                response[1] = {
                    text: "Do you have a bank account number at OLE Bank?",
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

                return {"state":{"state":"doYouHaveAnAccountState","senderPsid":state.senderPsid},"response":response};
            }
            
        }
    }
    
};

module.exports = reportStolenCard ;