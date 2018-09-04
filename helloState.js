"use strict";


// var exports = module.exports = {};

 var helloState =  {
    executeAction:function(action,state){
        if(action==="DISPLAY_WELCOME_MESSAGE"){
            var response=[];

            response[0] = {text:'Welcome to OLE Bank'};
            console.log(state.senderPsid);

            if(state.senderPsid ===902533626537343){
                response[1] = {text:'We have identified that your Facebook account is associated a main account number ending with 5555. Would you like to continue with this account number?'};
            }else{
                response[1] ={text:'Do you have a bank account number at OLE Bank?'}; 
            }
            
            return {"state":{"state":"welcomeMessageState","senderPsid":state.senderPsid},"response":response};
        }
    }
};

module.exports = helloState;