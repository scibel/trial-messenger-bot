"use strict";


 var enterPinCodeState =  {
    executeAction:function(action,state){
        console.log("chooseAccountState function:"+action);
        var response=[];

        response[0] = {text:'Enter your pin code'};
        
        return {"state":{"state":"yumaSecondAttempt","senderPsid":state.senderPsid},"response":response};
       
        
    }
};

module.exports = enterPinCodeState;

