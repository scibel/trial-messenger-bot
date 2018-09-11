"use strict";


// var exports = module.exports = {};

 var doYouHaveAnAccountState =  {
    executeAction:function(action,state){
        console.log("doYouHaveAnAccountState function:"+action);
        var response=[];

        if(action==="NO_I_DO_NOT_HAVE_AN_ACCOUNT"){
            response[0] = {text:'Thank you for chatting with OLE Bank Bot. For more information, please access our website @ www.olebank.com or contact us @ 19555'};
            response[1] = {text: 'If you would like to re-engage with the bot please say Hi' }
            return {"state":{"state":"thankYouState","senderPsid":state.senderPsid},"response":response};
        } else if(action==="YES_I_HAVE_AN_ACCOUNT"){
            response[0] = {text:'Please enter your bank account number'};
            return {"state":{"state":"enterBankAccountNumberState","senderPsid":state.senderPsid},"response":response};
        }
    }
};

module.exports = doYouHaveAnAccountState;