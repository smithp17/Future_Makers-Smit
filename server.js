const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Load your API key from the environment variables
});

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    res.status(200).json({ text: response.choices[0].message.content });
  } catch (error) {
    console.error("Error generating AI response:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || "Error generating AI response" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
