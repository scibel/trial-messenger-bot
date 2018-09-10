"use strict";


// var exports = module.exports = {};

 var stolenCardTicket =  {
    executeAction:function(action,state){
        console.log("stolenCardTicket function:"+action);
        var response=[];

        if(action==="CREDIT_CARD_1"){
            response[0] = {text:'Your report has been submitted. You will be contact shortly by a customer service representative. Would you like another service?'};
            // response[1] = {
            // attachment: {
            //     type: "template",
            //     payload: {
            //       template_type: "button",
            //       text: "What do you want to do next?",
            //       buttons: [
            //         {
            //             type: "postback",
            //             title: "Enter your pin",
            //             payload: "FIRST_ATTEMPT"
            //           }
            //       ]
            //     }
            //   }
            // }
            //i should execute another action that move the user to entering first attampt state
            return {"state":{"state":"yumaFirstAttempt","senderPsid":state.senderPsid},"response":response};
        } else if(action==="CREDIT_CARD_2"){
            response[0] = {text:'Your report has been submitted. You will be contact shortly by a customer service representative. Would you like another service?'};
            return {"state":{"state":"nuaaFirstAttempt","senderPsid":state.senderPsid},"response":response};
        }
    }
};

module.exports = stolenCardTicket;

