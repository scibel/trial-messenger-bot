"use strict";

 var enterBankAccountNumberState =  {
    executeAction:function(action,state){
        var response=[];

        response[0] = {text: "You have entered a correct account number"};

        response[1] = {text:'Enter your pin code'};
        
        return {"state":{"state":"yumaSecondAttempt","senderPsid":state.senderPsid},"response":response};
        
    }
};

module.exports = enterBankAccountNumberState;

