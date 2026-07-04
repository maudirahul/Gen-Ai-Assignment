import { openrouter } from "../config/openrouter.js";
import { hiteshPrompt } from "../prompts/hiteshPrompt.js";
import { piyushPrompt } from "../prompts/piyushPrompt.js";

export const generatePersonaReply = async (messages, persona) => {
  let systemPrompt = "";

  if (persona.toLowerCase() === "hitesh") {
    systemPrompt = hiteshPrompt;
  } else if (persona.toLowerCase() === "piyush") {
    systemPrompt = piyushPrompt;
  } else {
    throw new Error('Invalid persona requested. Must be "hitesh" or "piyush".');
  }

  const fullMessages = [{ role: "system", content: systemPrompt }, ...messages];

  const response = await openrouter.chat.send({
    chatRequest: {
      model: "openai/gpt-4o",
      messages: fullMessages,
    },
  });

  return response.choices[0].message.content
};
