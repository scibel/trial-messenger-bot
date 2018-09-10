"use strict";


// var exports = module.exports = {};

 var stolenCardTicket =  {
    executeAction:function(action,state){
        console.log("stolenCardTicket function:"+action);
        var response=[];

        if(action==="CREDIT_CARD_1"){
            response[0] = {text:'Your report has been submitted. You will be contact shortly by a customer service representative. Would you like another service?'};
        } else if(action==="CREDIT_CARD_2"){
            response[0] = {text:'Your report has been submitted. You will be contact shortly by a customer service representative. Would you like another service?'};
        }

        return {"state":{"state":"yumaFirstAttempt","senderPsid":state.senderPsid},"response":response};
    }
};

module.exports = stolenCardTicket;

