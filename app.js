"use strict";

const GET_STARTED_POSTBACK = "<postback_payload>";
const Thank_you =
  "Thank you for chatting with OLE Bank Bot. For more information, please access our website @ www.olebank.com or contact us @ 19555, say 'Hi' to re-engage with the bot";
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
  console.log("webhook is listening", port);
});

// route to check from a website whether the application is deployed
app.get("/", (req, res) => {
  res.status(200).send("Deployed");
});

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
  console.log(
    "1) started receiveing a message grom facebook page it will be either user input or a postback if it is a user input or a quick reply it will be sent to handle_message function if it is a postback it will be sent to handle_postback function"
  );

  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    console.log("2) body received /n \n", JSON.stringify(body));

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {
      // console.log("here");
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
      console.log("3) Sender PSID: " + sender_psid);

      if (webhook_event.message) {
        console.log("50) calling handleMessage");
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        console.log("`100) calling handlePostback");
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
  console.log("51) handleMessage");

  let response;
  console.log(
    "52) will be handling the following Message \n" +
      JSON.stringify(received_message) +
      "\n"
  );

  // Handle quick_replies postbacks Yes or No

  if (
    received_message.quick_reply !== "undefined" &&
    received_message.quick_reply
  ) {
    console.log(
      "70) received_message.quick_reply.payload",
      received_message.quick_reply.payload
    );

    // payload will contain state of the sent quickreply which is coming from a previous state
    let payload = received_message.quick_reply.payload;

    console.log("71) received_message.quick_reply.payload", payload);

    var facebookUserState = {};

    async function executeActionAgainstPayload() {
      keyv.get(sender_psid).then(
        result => {
          console.log("72) my sender_psid = " + sender_psid);
          console.log("73) my result = " + JSON.stringify(result));
          facebookUserState = result;
          console.log(facebookUserState.state);
          var currentState = stateList[facebookUserState.state];
          console.log(currentState);

          // current response returns
          //74)in case olebank1 my currentStateResponse = {"state":{"state":"yumaFirstAttempt","senderPsid":"902533626537343"},"response":[{"text":"YES_USE_MAIN_ACCOUNT"}]}
          let currentStateResponse = currentState.executeAction(
            payload,
            facebookUserState
          );

          console.log(
            "74) my currentStateResponse = " +
              JSON.stringify(currentStateResponse)
          );
          console.log(
            "75) my currentStateResponse.response = " +
              JSON.stringify(currentStateResponse.response)
          );

          // response = {text:'Welcome Mr. Tarek to ABCBank'};
          response = currentStateResponse.response;
          // in case YES_USE_MAIN_ACCOUNT my response should be to
          // execute an action to move the user to the next state
          console.log("76) my response = " + JSON.stringify(response));

          // changing the state of the user to the next state
          keyv.set(sender_psid, currentStateResponse.state, 120000);
          sendTextMessages(sender_psid, response, 0);

          return response;
        }
        // Send the message to acknowledge the postback
      );
    }

    executeActionAgainstPayload().then(response => {
      console.log("77) test", response);
      // await keyv.get(sender_psid).then(result =>  console.log(JSON.stringify(result)))
    });
  } else {
    // Handle user input
    console.log("80) corner cases input");
    if (
      received_message.text.indexOf("Logout") > -1 // true
    ) {
      console.log("81) Cancel corner case input");
      keyv.delete(sender_psid); // true

      response = {
        text: Thank_you
      };
      callSendAPI(sender_psid, response);

    } else if (received_message.text == "Reset") {
      response = {
        text: `Reset Logic`
      };
      callSendAPI(sender_psid, response);

    } else if (received_message.text == "Hi") {
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
      sendTextMessages(sender_psid, response, 0);
      return;
    } else if (received_message.text == "Test") {
      response = { text: "integration succedded" };
      callSendAPI(sender_psid, response);

    }
    // handle user input
    else {
      let user_state;
      async function test() {
        // await keyv.get('foo').then((test) => console.log(test));// 'never expires'
        user_state = await keyv.get(sender_psid).then(result => {
          return result;
        });

        // let testing_value= user_state;
        user_state = user_state.state;
        console.log("user_state", user_state);
        return user_state;
      }
      user_state = test();

      var greetingPromise = keyv.get(sender_psid);
      var trest = greetingPromise
        .then(function(greeting) {
          console.log("greeting", greeting);

          return greeting; // addExclamation returns a promise
        })
        .then(function(greeting) {
          console.log("greetings", greeting); // 'hello world!!!!’
        });
      console.log("trest", trest); // 'hello world!!!!’

      //////////////////////////////////

      user_state.then(result => {
        console.log("result", result);
        let state = result;

        if (
          state == "yumaFirstAttempt" ||
          state == "yumaSecondAttempt" ||
          (state == "yumaThirdAttempt" && received_message.text == "123456")
        ) {
          console.log("password entered");
          console.log("72) my sender_psid = " + sender_psid);
          console.log("73) my result = " + JSON.stringify(result));
          console.log("73) my state = " + JSON.stringify(state));
          facebookUserState = { state: state, senderPsid: sender_psid };
          // facebookUserState = result;
          // gives undefined
          console.log(facebookUserState.state);
          var currentState = stateList[facebookUserState.state];
          console.log(currentState);

          // current response returns
          //74)in case olebank1 my currentStateResponse = {"state":{"state":"yumaFirstAttempt","senderPsid":"902533626537343"},"response":[{"text":"YES_USE_MAIN_ACCOUNT"}]}
          let currentStateResponse = currentState.executeAction(
            // payload,
            facebookUserState
          );

          console.log(
            "74) my currentStateResponse = " +
              JSON.stringify(currentStateResponse)
          );
          console.log(
            "75) my currentStateResponse.response = " +
              JSON.stringify(currentStateResponse.response)
          );

          // response = {text:'Welcome Mr. Tarek to ABCBank'};
          response = currentStateResponse.response;
          // in case YES_USE_MAIN_ACCOUNT my response should be to
          // execute an action to move the user to the next state
          console.log("76) my response = " + JSON.stringify(response));

          // changing the state of the user to the next state
          keyv.set(sender_psid, currentStateResponse.state, 120000);
          sendTextMessages(sender_psid, response, 0);

          return response;
          // Send the message to acknowledge the postback
        } 
        else if( state == "yumaFirstAttempt") 
       {
        console.log("changing state to yumaSecondAttempt");

        facebookUserState = { state: "yumaSecondAttempt", senderPsid: sender_psid };

        keyv.set(sender_psid, facebookUserState, 120000);

        }

        else if( state == "yumaSecondAttempt") 
        {
          console.log("changing state to yumaThirdAttempt");

          facebookUserState = { state: "yumaThirdAttempt", senderPsid: sender_psid };

          keyv.set(sender_psid, facebookUserState, 120000);
        }
     
        else if( state == "yumaThirdAttempt") 
        {
          console.log("changing state to Blocked");

          facebookUserState = { state: "Blocked", senderPsid: sender_psid };

          keyv.set(sender_psid, facebookUserState, 120000);
        }
        else {
          // console.log("user_state.state.user_state", user_state);

          // Create the payload for a basic text message, which
          // will be added to the body of our request to the Send API
          response = {
            text: `This command is undefined`
          };

          callSendAPI(sender_psid, response);

          return;
        }
      });
    }
    console.log(
      "corner cases input->response that is going to be send to the user" +
        JSON.stringify(response)
    );
    // bug the message get sent twice.
    // sendTextMessages(sender_psid, response, 0);
    // callSendAPI(sender_psid, response);
  }
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  console.log("101) handlePostback");

  let payload = received_postback.payload;
  let response;
  var facebookUserState = {};
  console.log("102) handlePostback");

  if (payload === GET_STARTED_POSTBACK) {
    console.log("handleGET_STARTED_POSTBACK");

    facebookUserState = { state: "helloState", senderPsid: sender_psid };

    keyv.set(sender_psid, facebookUserState, 120000);

    payload = "DISPLAY_WELCOME_MESSAGE";

    executeActionAgainstPayload().then(response => {
      console.log("102) response", response);
      // await keyv.get(sender_psid).then(result =>  console.log(JSON.stringify(result)))
    });
  } 
  // else if ((payload = "FIRST_ATTEMPT")) {
  //   console.log("handleFIRST_ATTEMPT");

  //   facebookUserState = { state: "FirstAttempt", senderPsid: sender_psid };

  //   keyv.set(sender_psid, facebookUserState, 120000);
  // } 
  else if (payload === "PAYBILL_PAYLOAD") {
    console.log("PAYBILL_PAYLOAD");

    console.log("103) Cancel corner case input, PAYBILL_PAYLOAD response");
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Call Support",
          buttons: [
            {
              type: "web_url",
              title: "Visit web",
              url:
                "https://www.hsbc.com.eg/1/2/eg/personal/useful-link/contact-us",
              webview_height_ratio: "full"
            },
            {
              type: "phone_number",
              title: "Call bank support",
              payload: "+201006747065"
            }
          ]
        }
      }
    };
  }
  else {
    console.log("else");

    if (payload === "PAYBILL_PAYLOAD") {
      console.log("103) Cancel corner case input, PAYBILL_PAYLOAD response");
      response = {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: "Call Support",
            buttons: [
              {
                type: "web_url",
                title: "Visit web",
                url:
                  "https://www.hsbc.com.eg/1/2/eg/personal/useful-link/contact-us",
                webview_height_ratio: "full"
              },
              {
                type: "phone_number",
                title: "Call bank support",
                payload: "+201006747065"
              }
            ]
          }
        }
      };
    } else {
      console.log("110) undefined command Postbacks");
      response = {
        text: `This command is undefined`
      };
    }

    sendTextMessages(sender_psid, response, 0);
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

// Not used now
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
