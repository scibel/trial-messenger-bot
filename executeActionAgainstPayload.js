"use strict";


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
        response = currentStateResponse.response;
        console.log("my response = " + JSON.stringify(response));

        keyv.set(sender_psid, currentStateResponse.state, 120000);
        sendTextMessages(sender_psid, response, 0);
        return response;
      }
      // Send the message to acknowledge the postback
    );
  }

  module.exports = executeActionAgainstPayload;