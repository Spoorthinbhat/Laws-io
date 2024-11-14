import {
  LexRuntimeV2Client,
  RecognizeTextCommand,
} from "@aws-sdk/client-lex-runtime-v2";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { v4 as uuidv4 } from "uuid";
// const AWS = require("aws-sdk");

import {
  expandLaw,
  getCaseStudy,
  getMCQs,
  setCourtRoom,
  simplifyLaw,
  simulateCourt,
} from "./GeminiUtils.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cors());
const lexClient = new LexRuntimeV2Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// app.use(express.urlencoded({extended : true}));
// app.use(session({
//   secret: process.env.SECRET_KEY,  // Replace with your own secret
//   resave: false,              // Prevents resaving unchanged sessions
//   saveUninitialized: true,    // Forces a session to be saved, even if unmodified
//   cookie: { secure: false }   // Set to true if using HTTPS, false if using HTTP
// }));

app.get("/", (req, res) => {
  res.send("Hello , I am Groot!");
});

//Get the Law in Brief
//In the message format
app.get("/ai/briefLaw", async (req, res) => {
  try {
    const law = req.query.law;
    const response = await simplifyLaw(law);
    let simplifiedLaw = response.candidates[0]?.content?.parts[0]?.text;
    res.send(simplifiedLaw);
  } catch (e) {
    console.log("Error while Fetching the Brief of the Law");
    res.send(e);
  }
});

//Get the indepth explanation of the law
//In JSON format
app.get("/ai/describeLaw", async (req, res) => {
  const law = req.query.law;
  try {
    const response = await expandLaw(law);
    const lawInDepth = response.candidates[0].content.parts[0].text;
    const data = JSON.parse(lawInDepth);
    res.send(data);
  } catch (e) {
    console.log("Error while Fetching the Expansion of the Law");
    res.send(e);
  }
});

// //Get 10 MCQ's based the given law
// //In JSON format
// /*{
//   "1": {
//     "question": "Sample question?",
//     "option1": "Option A",
//     "option2": "Option B",
//     "option3": "Option C",
//     "option4": "Option D",
//     "answer": "option2"
//   },
//   "2": {
//     ...
//   },
// }*/
app.get("/ai/getQuiz", async (req, res) => {
  const law = req.query.law;
  try {
    if (law) {
      const response = await getMCQs(law);
      const resText = response.candidates[0].content.parts[0].text;
      const data = JSON.parse(resText);
      res.send(data);
    }
  } catch (e) {
    res.status(501).send("Error in fetching MCQ's");
    console.log("Error in Getting MCQs");
  }
});

app.get("/ai/getCase", async (req, res) => {
  const law = req.query.law;
  try {
    if (law) {
      const response = await getCaseStudy(law);
      const resText = response.candidates[0].content.parts[0].text;
      const data = JSON.parse(resText);
      res.send(data);
    }
  } catch (e) {
    res.status(501).send("Error in fetching MCQ's");
    console.log("Error in Getting MCQs");
  }
});

app.post("/ai/setCourt", async (req, res) => {
  let { law, context } = req.body;
  const chat = await setCourtRoom(law, context);
  req.session.chat = chat;
  res.redirect("/ai/simulateCourt");
});

app.get("/ai/simulateCourt", async (req, res) => {
  let law = req.query.law;
  const answer = await simulateCourt(law);
  res.send(answer);
});

app.post("/api/chat", async (req, res) => {
  const { text } = req.body; // Session ID will be generated dynamically, no need to pass it
  console.log(req.body); // Log the entire request body

  // Ensure that 'text' is provided and not empty
  if (!text || text.trim() === "") {
    return res.status(400).json({
      error: "Text field is required and cannot be empty.",
    });
  }

  console.log(text);

  // Generate a new session ID for each request
  const sessionId = uuidv4(); // Generate a unique session ID using UUID

  // Prepare Lex request parameters
  const params = {
    botAliasId: "TSTALIASID", // Replace with your Bot Alias ID
    botId: "UJZCHVZGWH", // Replace with your Bot ID
    localeId: "en_US", // Set to the desired locale (en_US)
    sessionId: sessionId, // Use the newly generated session ID
    text: text, // User's message
  };

  console.log("Generated Session ID: ", sessionId);
  console.log("params: ", params);
  const command = new RecognizeTextCommand(params);

  try {
    // Send request to Lex using the SDK v3
    const response = await lexClient.send(command);

    if (response.messages && response.messages.length > 0) {
      res.json({
        dialogAction: {
          type: "Close",
          fulfillmentState: "Fulfilled",
          message: {
            contentType: "PlainText",
            content: response.messages[1].content,
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
