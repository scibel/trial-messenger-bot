"use strict";


// var exports = module.exports = {};

 var helloState =  {
    executeAction:function(action,state){
        if(action==="DISPLAY_WELCOME_MESSAGE"){
            return {"state":{"state":"welcomeMessageState"},"response":{text:"Welcome Mr. Tarek to ABCBank"}};
        }
    }
};

module.exports = helloState;