"use strict";

var rejectedPaymentsState = {
  executeAction: function (state) {
  
    var response=[];

    response[0] = {text:'Transaction authorized successfully. Please redo transaction and it will be granted.'};
      
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

module.exports = rejectedPaymentsState;

