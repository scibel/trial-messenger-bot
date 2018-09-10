/*
 * Starter Project for Messenger Platform Quick Start Tutorial
 *
 * Remix this as the starting point for following the Messenger Platform
 * quick start tutorial.
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 */

"use strict";

// Imports dependencies and set up http server
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  app = express().use(body_parser.json()); // creates express http server

const Keyv = require("keyv");

// One of the following
const keyv = new Keyv();

// Handle DB connection errors

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => {
  console.log("webhook is listening");
});

// Accepts POST requests at /webhook endpoint
app.post("/webhook", (req, res) => {
 
  let body = req.body;
  // keyv.on("error", err => console.log("Connection Error", err));

//   (async () => {
//     await keyv.set('foo', 'expires in 1 second', 1000); // true
//     await keyv.set('foo', 'never expires'); // true
//     await keyv.get('foo').then((test) => console.log(test));// 'never expires'
//     await keyv.delete('foo'); // true
//     await keyv.clear(); // undefined})();
// })()


  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    console.log("body", JSON.stringify(body));
    //     if(!body.entry.messaging){
    //         console.log('persistent menu');

    // return
    //     }

    //   else{
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

  //  let response;

  //   // Check if the message contains text
  //   if (received_message.text) {

  //     // Create the payload for a basic text message
  //     response = {
  //       "text": `You sent the message: "${received_message.text}". Now send me an image!`
  //     }
  //   }

  //   // Sends the response message
  //   callSendAPI(sender_psid, response);

  let response;
  console.log("received_message" + JSON.stringify(received_message) + "\n");

  // Checks if the message contains text
  if (received_message.text == "Hello") {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    response = {
      text: `You sent the message: "${
        received_message.text
      }". Now send me an attachment!`
    };
  } else if (received_message.attachments) {
    console.log(
      "attachments" + JSON.stringify(received_message.attachments) + "\n"
    );

    // Get the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;
    console.log("attachment_url" + attachment_url);
    response = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [
            {
              title: "Is this the right picture?",
              subtitle: "Tap a button to answer.",
              image_url: attachment_url,
              buttons: [
                {
                  type: "postback",
                  title: "Yes!",
                  payload: "yes"
                },
                {
                  type: "postback",
                  title: "No!",
                  payload: "no"
                }
              ]
            }
          ]
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

  // Send the response message
  callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  console.log("handlePostback");

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
    sendTextMessages(sender_psid, response, 0);

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
    callSendAPI(sender_psid, response);

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
      callSendAPI(sender_psid, response);

    } else {
      console.log("110) undefined command Postbacks");
      response = {
        text: `This command is undefined`
      };
      callSendAPI(sender_psid, response);

    }

  }

  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);
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
