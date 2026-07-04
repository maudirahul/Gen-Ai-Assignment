import { generatePersonaReply } from "../services/openrouterService.js";

export const handleChat = async (req, res, next) => {
  const { messages, persona } = req.body;

  try {
    const reply = await generatePersonaReply(messages, persona);
    res.json(reply);
  } catch (error) {
    next(error);
  }
};
