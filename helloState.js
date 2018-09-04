"use strict";


// var exports = module.exports = {};

 var helloState =  {
    executeAction:function(action,state){
        if(action==="DISPLAY_WELCOME_MESSAGE"){
            var response=[];

            response[0] = {text:'Welcome to OLE Bank'};
            console.log(state.senderPsid);

            if(state.senderPsid === '902533626537343'){
                response[1] = {text:'We have identified that your Facebook account is associated a main account number ending with 5555. Would you like to continue with this account number?'};

                response[2] = {
                    message:{
                        text: "Here is a quick reply!",
                        quick_replies:[
                          {
                            content_type:"text",
                            title:"Search",
                            payload:"<POSTBACK_PAYLOAD>",
                            image_url:"http://example.com/img/red.png"
                          },
                          {
                            content_type:"location"
                          }
                        ]
                      }
                  }};

                
            }else{
                response[1] ={text:'Do you have a bank account number at OLE Bank?'}; 
            }
            
            return {"state":{"state":"welcomeMessageState","senderPsid":state.senderPsid},"response":response};
        }
    
};

module.exports = helloState;