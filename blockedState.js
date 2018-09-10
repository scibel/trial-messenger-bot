"use strict";


// var exports = module.exports = {};

 var blockedState =  {
    executeAction:function(state){
        console.log("chooseAccountState function:");
        var response=[];

        response[0] = {text:'You have failed to enter your pin correctly. Your account will be blocked. Please contact support.'};
          
        return {"state":{"state":"blockedState","senderPsid":state.senderPsid},"response":response};
         
    }
};

module.exports = blockedState;

