// Import the Google AI library
import { GoogleGenerativeAI } from "@google/genai";

// This is the main function Netlify will run
// It's the "handler" of all requests
export const handler = async (event) => {
  // 1. Get the user's prompt from the frontend
  // The 'event.body' contains the { "prompt": "..." } we will send
  const { prompt } = JSON.parse(event.body);

  // 2. Get your secret API key
  // This is safely stored in Netlify, not in the code
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // 3. Call the AI
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // We give the AI its "persona"
    const fullPrompt = `You are an expert on French politics. 
                       Answer the following question clearly and concisely: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    // 4. Send the AI's answer back to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ answer: text }),
    };

  } catch (error) {
    // Handle any errors
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ answer: "Sorry, I'm having trouble thinking right now." }),
    };
  }
};
