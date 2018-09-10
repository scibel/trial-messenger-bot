"use strict";


// var exports = module.exports = {};

 var helloState =  {
    executeAction:function(action,state){
        if(action==="DISPLAY_WELCOME_MESSAGE"){
            var response=[];

            response[0] = {text:'Welcome to OLE Bank'};
            response[1] = {text:'Type Logout if you want to end chat session or Hi if you want to restart it'};
            console.log(state.senderPsid);
            // we need to change this 
            if(state.senderPsid === '902533626537343' || state.senderPsid ==='1847510265339367' || state.senderPsid === '2152628194771300'){
                console.log("We have identified that your Facebook account is associated a main account number ending with 5555")
                response[2] = {
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
            } else{

                response[2] = {
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

module.exports = helloState;