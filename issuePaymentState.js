"use strict";


 var issuePaymentState =  {
    executeAction:function(action,state){
        console.log("issuePaymentState function:"+action);
        var response=[];

        if(action==="ENTER_TRANSACTION_AMOUNT_YES"){
            response[0] = {text:'Payment has been issued successfully. Please go back to the website you have ordered from.'};
        } else if(action==="ENTER_TRANSACTION_AMOUNT_NO"){
            response[0] = {text:'Payment has been cancelled.'}; 
        }

        response[1] = {
            text: 'Would you like another service?',
            quick_replies: [
                {
                    content_type: "text",
                    title: "Yes",
                    payload: "WOULD_YOU_LIKE_ANOTHER_SERVICE_YES"
                },
                {
                    content_type: "text",
                    title: "No",
                    payload: "WOULD_YOU_LIKE_ANOTHER_SERVICE_NO"
                }
            ]
        };
        return {"state":{"state":"anotherService","senderPsid":state.senderPsid},"response":response};
    }
};

module.exports = issuePaymentState;