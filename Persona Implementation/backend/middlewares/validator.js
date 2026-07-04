export const validateChatRequest = (req, res, next) => {
  const { messages, persona } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res
      .status(400)
      .json({ error: 'Invalid request body. "messages" must be an array.' });
  }

  if (!persona || !["hitesh", "piyush"].includes(persona)) {
    return res
      .status(400)
      .json({
        error: 'Invalid or missing "persona". Must be "hitesh" or "piyush".',
      });
  }

  next();
};
