"use strict";

 var enterBankAccountNumberState =  {
    executeAction:function(action,state){
        var response=[];

        response[0] = {text: "You have entered a correct account number"};

        return {"state":{"state":"enterPinCodeState","senderPsid":state.senderPsid},"response":response};
        
    }
};

module.exports = enterBankAccountNumberState;

