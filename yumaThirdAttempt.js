"use strict";


// var exports = module.exports = {};

 var yumaThirdAttempt =  {
    executeAction:function(state){
        console.log("chooseAccountState function:");
        var response=[];

        response[0] = {text:'This is your third and last attempt please enter your password'};
          
        return {"state":{"state":"blockedState","senderPsid":state.senderPsid},"response":response};
         
    }
};

module.exports = yumaThirdAttempt;

