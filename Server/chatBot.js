const express = require("express");
const AWS = require("aws-sdk");
const lexruntime = new AWS.LexRuntimeV2();
const app = express();

app.use(express.json()); // for parsing application/json

// Define an endpoint to interact with Lex
app.post("/api/chat", async (req, res) => {
  const { text, sessionId } = req.body; // Get text and sessionId from the frontend request

  const params = {
    botAliasId: "TSTALIASID", // Replace with your Lex Bot Alias ID
    botId: "UJZCHVZGWH", // Replace with your Lex Bot ID
    localeId: "en_US", // Locale of the bot
    sessionId: sessionId || "default-session", // Session ID (you can send or generate one)
    text: text, // The input text from the user
  };

  try {
    const response = await lexruntime.recognizeText(params).promise();

    if (response.messages && response.messages.length > 0) {
      res.json({
        dialogAction: {
          type: "Close",
          fulfillmentState: "Fulfilled",
          message: {
            contentType: "PlainText",
            content: response.messages[0].content, // Lex response
          },
        },
      });
    } else {
      res.json({
        dialogAction: {
          type: "Close",
          fulfillmentState: "Failed",
          message: {
            contentType: "PlainText",
            content:
              "I'm having trouble answering that. Please try again later.",
          },
        },
      });
    }
  } catch (error) {
    console.error("Error interacting with Lex:", error);
    res.json({
      dialogAction: {
        type: "Close",
        fulfillmentState: "Failed",
        message: {
          contentType: "PlainText",
          content: "I'm having trouble answering that. Please try again later.",
        },
      },
    });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
