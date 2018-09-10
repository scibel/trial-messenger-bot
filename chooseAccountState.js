"use strict";


// var exports = module.exports = {};

 var chooseAccountState =  {
    executeAction:function(action,state){
        console.log("chooseAccountState function:"+action);
        var response=[];

        if(action==="YES_USE_MAIN_ACCOUNT"){
            response[0] = {text:'Enter your pin code'};
            return {"state":{"state":"yumaSecondAttempt","senderPsid":state.senderPsid},"response":response};
        } else if(action==="NO_USE_ANOTHER_ACCOUNT"){
            response[0] = {text:'This feature is not yet supported. Please type Logout if you want to end chat session or Hi if you want to restart it'};
            return {"state":{"state":"nuaaFirstAttempt","senderPsid":state.senderPsid},"response":response};
        }
    }
};

module.exports = chooseAccountState;

