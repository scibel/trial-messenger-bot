"use strict";

const GET_STARTED_POSTBACK = "<postback_payload>";
//  "Welcome to our bank"

// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  app = express().use(body_parser.json()); // creates express http server
const stateList = require("./stateMachineInitializer");
const Keyv = require("keyv");

const keyv = new Keyv();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("webhook is listening",port);
});

app.get("/", (req, res) => {
  res.status(200).send("Deployed");
});

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  console.log(
    "started receiveing a message grom facebook page it will be either user input or a postback "
  );

  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    console.log("body received /n \n", JSON.stringify(body));

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      // console.log("here");
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);

      if (webhook_event.message) {
        console.log("calling handleMessage");
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        console.log("calling handlePostback");
        handlePostback(sender_psid, webhook_event.postback);
      }
    });
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

// Handles user input and quick replies messages events
function handleMessage(sender_psid, received_message) {
  console.log("handleMessage");

  let response;
  console.log(
    "will be handling the following Message \n" +
      JSON.stringify(received_message) +
      "\n"
  );

  // Handle quick_replies postbacks Yes or No

  if (
    received_message.quick_reply !== "undefined" &&
    received_message.quick_reply
  ) {
    console.log("received_message.quick_reply.payload");

    let payload = received_message.quick_reply.payload;

    console.log(payload);

    var facebookUserState = {};

    async function executeActionAgainstPayload() {
      await keyv.get(sender_psid).then(
        result => {
          console.log("my sender_psid = " + sender_psid);
          console.log("my result = " + JSON.stringify(result));
          facebookUserState = result;
          console.log(facebookUserState.state);
          var currentState = stateList[facebookUserState.state];
          console.log(currentState);
          let currentStateResponse = currentState.executeAction(
            payload,
            facebookUserState
          );

          console.log(
            "my currentStateResponse = " + JSON.stringify(currentStateResponse)
          );
          console.log(
            "my currentStateResponse.response = " +
              JSON.stringify(currentStateResponse.response)
          );

          // response = {text:'Welcome Mr. Tarek to ABCBank'};
          response = currentStateResponse.response;
          console.log("my response = " + JSON.stringify(response));

          keyv.set(sender_psid, currentStateResponse.state, 120000);

          for (const element of response) {
            console.log(element);
            callSendAPI(sender_psid, element);
          }

          return response;
        }
        // Send the message to acknowledge the postback
      );
    }

    executeActionAgainstPayload().then(response => {
      console.log("test", response);
      // await keyv.get(sender_psid).then(result =>  console.log(JSON.stringify(result)))
    });
  } else {
    // Handle user input
    console.log("undefined input");
    if ( received_message.text.indexOf('Cancel') > -1 // true
  ) {
      (async () => {
        await keyv.get(sender_psid).then(
          result => {
            console.log("my sender_psid before = " + JSON.stringify(result))})
        await keyv.delete(sender_psid); // true
        await keyv.get(sender_psid).then(
          result => {
            console.log("my sender_psid after = " + JSON.stringify(result))})
      })();
      response = {
        text: `State has been cleared`
      };

    } else if (received_message.text == "Reset") {
      response = {
        text: `Reset Logic`
      };
    }
    else if (received_message.text == "Hi") {

      facebookUserState = { state: "helloState", senderPsid: sender_psid };

      keyv.set(sender_psid, facebookUserState, 120000);      

     let payload = "DISPLAY_WELCOME_MESSAGE";
    
     var currentState = stateList[facebookUserState.state];
     console.log(currentState);
     let currentStateResponse = currentState.executeAction(
       payload,
       facebookUserState
     );

     console.log(
       "my currentStateResponse = " + JSON.stringify(currentStateResponse)
     );
     console.log(
       "my currentStateResponse.response = " +
         JSON.stringify(currentStateResponse.response)
     );

     // response = {text:'Welcome Mr. Tarek to ABCBank'};
     response = currentStateResponse.response;
     console.log("my response = " + JSON.stringify(response));

     keyv.set(sender_psid, currentStateResponse.state, 120000);

     for (const element of response) {
       console.log(element);
       callSendAPI(sender_psid, element);
     }
    

      // response = {
      //   text: `Your state now is set to helloState`, 
      // };
    }
     else if (received_message.text == "Test") {
      response = { text: "integration succedded" };
    }
    // handle user input
    else {
      // Create the payload for a basic text message, which
      // will be added to the body of our request to the Send API
      response = {
        text: `This command is undefined`
      };
    }

    

    

    sendTextMessages(sender_psid, response);
  }
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  console.log("handlePostback");

  let payload = received_postback.payload;

  let response;

  var facebookUserState = {};
  if (payload === GET_STARTED_POSTBACK) {
    facebookUserState = { state: "helloState", senderPsid: sender_psid };

    keyv.set(sender_psid, facebookUserState, 120000);

    payload = "DISPLAY_WELCOME_MESSAGE";

    executeActionAgainstPayload().then(response => {
      console.log("test", response);
      // await keyv.get(sender_psid).then(result =>  console.log(JSON.stringify(result)))
    });
  } else {
    console.log("undefined Postbacks");
    response = {
      text: `This command is undefined`
    };
    callSendAPI(sender_psid, response);
  }
  async function executeActionAgainstPayload() {
    await keyv.get(sender_psid).then(
      result => {
        console.log("my sender_psid = " + sender_psid);
        console.log("my result = " + JSON.stringify(result));
        facebookUserState = result;
        console.log(facebookUserState.state);
        var currentState = stateList[facebookUserState.state];
        console.log(currentState);
        let currentStateResponse = currentState.executeAction(
          payload,
          facebookUserState
        );

        console.log(
          "my currentStateResponse = " + JSON.stringify(currentStateResponse)
        );
        console.log(
          "my currentStateResponse.response = " +
            JSON.stringify(currentStateResponse.response)
        );

        // response = {text:'Welcome Mr. Tarek to ABCBank'};
        response = currentStateResponse.response;
        console.log("my response = " + JSON.stringify(response));

        keyv.set(sender_psid, currentStateResponse.state, 120000);
        sendTextMessages(sender_psid, response, 0);

        return response;
      }
      // Send the message to acknowledge the postback
    );
  }
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

// var a = ["1", "2", "3"] //my result is a array
function sendTextMessages(sender, text, i) {
  if (i < text.length) {
    let request_body = {
      recipient: {
        id: sender
      },
      message: text[i]
    };
    request(
      {
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
        method: "POST",
        json: request_body
      },
      function(error, response, body) {
        if (error) {
          console.log("Error sending messages: ", error);
        } else if (response.body.error) {
          console.log("Error: ", response.body.error);
        }
        sendTextMessages(sender, text, i + 1);
      }
    );
  } else return;
}
