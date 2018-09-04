"use strict";

// Imports dependencies and set up http server
  const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  app = express().use(body_parser.json()); // creates express http server
  const stateList = require("./stateMachineInitializer");

const Keyv = require("keyv");

// One of the following
const keyv = new Keyv();

app.listen(process.env.PORT || 1337, () => {
  console.log("webhook is listening");
});

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  let body = req.body;
  // keyv.on("error", err => console.log("Connection Error", err));

  // (async () => {
  //   await keyv.set("foo", "expires in 1 second", 1000); // true
  //   await keyv.set("foo", "never expires"); // true
  //   await keyv.get("foo").then(test => console.log(test)); // 'never expires'
  //   await keyv.delete("foo"); // true
  //   await keyv.clear(); // undefined})();
  // })();

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    console.log("body", JSON.stringify(body));

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0

      console.log("here");
      let webhook_event = entry.messaging[0];

      // console.log(webhook_event);
      // console.log('webhook_event' + webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        console.log("calling handleMessage");

        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        console.log("calling handlePostback");
        handlePostback(sender_psid, webhook_event.postback);
      }
    });
    // }
    // Return a '200 OK' response to all events
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Accepts GET requests at the /webhook endpoint
app.get("/webhook", (req, res) => {
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode were sent
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Handles messages events
function handleMessage(sender_psid, received_message) {
  console.log("handleMessage");

  let response;
  console.log("received_message" + JSON.stringify(received_message) + "\n");

  let payload = received_message.payload;

  console.log(payload);

  var facebookUserState={};

  async function executeActionAgainstPayload() {
   
    await keyv.get(sender_psid).then(result =>  { 
      console.log("my sender_psid = "+sender_psid); 
      console.log("my result = "+JSON.stringify(result));  
    facebookUserState =result;
    console.log(facebookUserState.state);
    var currentState=stateList[facebookUserState.state];
    console.log(currentState);
    let currentStateResponse = currentState.executeAction(payload,facebookUserState);
  
    console.log("my currentStateResponse = "+JSON.stringify(currentStateResponse));  
    console.log("my currentStateResponse.response = "+JSON.stringify(currentStateResponse.response));  

    // response = {text:'Welcome Mr. Tarek to ABCBank'};
    response =  currentStateResponse.response;
    console.log("my response = "+JSON.stringify(response));  


    keyv.set(sender_psid,currentStateResponse.state,120000);
    
    for (const element of response) {
      console.log(element)
      callSendAPI(sender_psid, element);

    }

     return response;
    }
    // Send the message to acknowledge the postback
    );
  };
  
  executeActionAgainstPayload().then( response => {
    console.log("test" , response)
    // await keyv.get(sender_psid).then(result =>  console.log(JSON.stringify(result)))
  }
  )
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  console.log("handlePostback");

  let payload = received_postback.payload;
  
  let response;

  var facebookUserState={};

  if(payload==="Welcome to our bank"){
 
    facebookUserState={"state":"helloState","senderPsid":sender_psid};
    
    keyv.set(sender_psid,facebookUserState,120000);

    payload = "DISPLAY_WELCOME_MESSAGE";


  } 
  async function executeActionAgainstPayload() {
   
    await keyv.get(sender_psid).then(result =>  { 
      console.log("my sender_psid = "+sender_psid); 
      console.log("my result = "+JSON.stringify(result));  
    facebookUserState =result;
    console.log(facebookUserState.state);
    var currentState=stateList[facebookUserState.state];
    console.log(currentState);
    let currentStateResponse = currentState.executeAction(payload,facebookUserState);
  
    console.log("my currentStateResponse = "+JSON.stringify(currentStateResponse));  
    console.log("my currentStateResponse.response = "+JSON.stringify(currentStateResponse.response));  

    // response = {text:'Welcome Mr. Tarek to ABCBank'};
    response =  currentStateResponse.response;
    console.log("my response = "+JSON.stringify(response));  


    keyv.set(sender_psid,currentStateResponse.state,120000);
    
    for (const element of response) {
      console.log(element)
      callSendAPI(sender_psid, element);

    }

     return response;
    }
    // Send the message to acknowledge the postback
    );
  };
  
  executeActionAgainstPayload().then( response => {
    console.log("test" , response)
    // await keyv.get(sender_psid).then(result =>  console.log(JSON.stringify(result)))
  }
  )


}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid
    },
    message: response
  };
  // Send the HTTP request to the Messenger Platform
  request(
    {
      uri: "https://graph.facebook.com/v2.6/me/messages",
      qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
      method: "POST",
      json: request_body
    },
    (err, res, body) => {
      if (!err) {
        console.log("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}
