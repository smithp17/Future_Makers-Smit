const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event) => {
  console.log("Function invoked");
  console.log("Event Body:", event.body);

  try {
    if (!event.body) {
      console.error("No request body found");
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "No request body found" }),
      };
    }

    const { prompt } = JSON.parse(event.body);
    console.log("Prompt received:", prompt);

    if (!prompt) {
      console.error("Prompt is missing");
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ error: "Prompt is required" }),
      };
    }

    console.log("Calling OpenAI API...");

    // Request to OpenAI for generating a response
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Adjust the model as necessary
      messages: [
        { role: "system", content: "You are a helpful educational assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000, // Ensure enough tokens for detailed responses
    });

    const aiResponse = response?.choices?.[0]?.message?.content;
    console.log("AI Response:", aiResponse);

    // Return AI-generated response
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ text: aiResponse }),
    };
  } catch (error) {
    console.error("Error generating AI response:", error.message, error.response?.data);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: error.message || "Internal Server Error",
        details: error.response?.data || null,
      }),
    };
  }
};