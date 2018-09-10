"use strict";


// var exports = module.exports = {};

 var yumaSecondAttempt =  {
    executeAction:function(state){
        console.log("chooseAccountState function:");
        var response=[];

        response[0] = {text:'You have entered a wrong pin code. Please try again.'};

         return {"state":{"state":"yumaThirdAttempt","senderPsid":state.senderPsid},"response":response};
         
    }
};

module.exports = yumaSecondAttempt;

