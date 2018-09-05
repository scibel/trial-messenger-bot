"use strict";


// var exports = module.exports = {};

 var chooseAccountState =  {
    executeAction:function(action,state){
        console.log("chooseAccountState function:"+action);
        var response=[];

        if(action==="NO_I_DO_NOT_WANT_TO_CONTINUE_WITH_THIS_ACCOUNT"){
            response[0] = {text:'This sceneario will merge in the right part of the tree'};
            return {"state":{"state":"thankYouState","senderPsid":state.senderPsid},"response":response};
        } else if(action==="YES_I_WANT_TO_CONTINUE_WITH_THIS_ACCOUNT"){
            response[0] = {text:'This feature is not yet supported!'};
            return {"state":{"state":"yiwtcwtaFirstAttempt","senderPsid":state.senderPsid},"response":response};
        }
    }
};

module.exports = chooseAccountState;