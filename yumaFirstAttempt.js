"use strict";


// var exports = module.exports = {};

var yumaFirstAttempt = {
  executeAction: function (state) {
  
    var response=[];

    response[0] = {text:'You have entered a wrong pin code. Please try again.'};
      
    return {"state":{"state":"yumaSecondAttempt","senderPsid":state.senderPsid},"response":response};
  
  }
    

};

module.exports = yumaFirstAttempt;

