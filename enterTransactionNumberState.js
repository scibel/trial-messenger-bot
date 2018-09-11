"use strict";


// var exports = module.exports = {};

 var enterTransactionNumberState =  {
    executeAction:function(action,state){
        var response=[];

        response[0] = {text:'The current transaction is worth $145.'};

        response[1] = {
            text: 'Would you like to issue payment?',
            quick_replies: [
                {
                    content_type: "text",
                    title: "Yes",
                    payload: "ENTER_TRANSACTION_AMOUNT_YES"
                },
                {
                    content_type: "text",
                    title: "No",
                    payload: "ENTER_TRANSACTION_AMOUNT_NO"
                }
            ]
        };
        
        return {"state":{"state":"issuePaymentState","senderPsid":state.senderPsid},"response":response};
        
    }
};

module.exports = enterTransactionNumberState;

