"use strict";

 var enterBankAccountNumberState =  {
    executeAction:function(action,state){
        var response=[];

        if(action === "1234567890"){
            response[0] = {text: "You have entered a correct account number"};

            response[1] = {text:'Enter your pin code'};
            
            return {"state":{"state":"yumaSecondAttempt","senderPsid":state.senderPsid},"response":response};
        } else{
            response[0] = {text: "We have not identified your account number."};
            response[1] = {text:'Please enter your bank account number'};
            return {"state":{"state":"enterBankAccountNumberState","senderPsid":state.senderPsid},"response":response};
        }

        
        
    }
};

module.exports = enterBankAccountNumberState;

