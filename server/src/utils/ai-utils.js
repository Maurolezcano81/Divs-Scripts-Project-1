import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { environment } from "../config/environment.js";
import { createChatSystemPrompt } from "./chat-preamble.js";
import User from "../models/user.model.js";

export const createOpenAIClient = () => {
  return createOpenAI({
    apiKey: environment.openai.apiKey,
    baseURL: environment.openai.apiUrl,
  });
};

export async function generateAIResponse(messages, userId) {
  if (!messages || messages.length === 0) {
    throw new Error("No se proporcionaron mensajes para generar respuesta");
  }
  const llm = createOpenAIClient();


  const hasSystemMessage = messages.some((m) => m.role === "system");

  let messagesWithSystem = [...messages];
  if (!hasSystemMessage && userId) {
    const user = await User.findById(userId).populate('classifications');
    const systemPrompt = createChatSystemPrompt(user);
    messagesWithSystem = [
      { role: "system", content: systemPrompt },
      ...messages,
    ];
  }

  try {
    const { text } = await generateText({
      model: llm("gpt-4o"),
      messages: messagesWithSystem,
      temperature: 0.7,
      maxTokens: 15000,
    });
    if (!text) {
      throw new Error("No se pudo generar una respuesta de IA");
    }

    return text;
  } catch (error) {
    throw new Error(`Error al generar respuesta: ${error.message}`);
  }
}
