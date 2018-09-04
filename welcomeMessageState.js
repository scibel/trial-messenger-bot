"use strict";


// var exports = module.exports = {};

 var helloState =  {
    executeAction:function(action,state){
        if(action==="DISPLAY_WELCOME_MESSAGE"){
            return {"state":{"state":"welcomeMessageState","senderPsid":state.senderPsid},"response":{text:'Welcome to OLE Bank'}};
        }
    }
};

module.exports = helloState;