"use strict";


// var exports = module.exports = {};

exports.helloState = function() {
    this.executeAction=function(action,state){
        if(action==="DISPLAY_WELCOME_MESSAGE"){
            return {"state":{"state":"welcomeMessageState"},"response":{"text":"Welcome Mr. Tarek to ABCBank"}};
        }
    }
};

module.exports = "helloState";