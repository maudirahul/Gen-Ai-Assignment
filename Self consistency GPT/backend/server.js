import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { openrouter } from "./src/config/openRouter.js";
import { MODELS } from "./src/config/models.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let frontendDistPath = path.join(__dirname, "../frontend/dist");
if (!fs.existsSync(frontendDistPath)) {
  frontendDistPath = path.join(__dirname, "dist");
}

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  console.log(`Serving static files from React build: ${frontendDistPath}`);
} else {
  console.log(`Warning: Frontend build directory not found at: ${frontendDistPath}. Please run build first.`);
}
}

// Helper to query an individual OpenRouter model
async function callModel(modelSlug, prompt) {
  try {
    const response = await openrouter.chat.send({
      chatRequest: {
        model: modelSlug,
        messages: [{ role: "user", content: prompt }],
      },
    });
    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Empty response choice from model");
    }
    return {
      model: modelSlug,
      success: true,
      response: content,
    };
  } catch (error) {
    console.error(`Error querying model ${modelSlug}:`, error);
    return {
      model: modelSlug,
      success: false,
      response: `Failed to retrieve response: ${error.message}`,
    };
  }
}

// API endpoint for multi-model consensus
app.post("/api/consensus", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return res.status(400).json({ error: "A valid prompt string is required." });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  const isMockMode = !apiKey || apiKey === "your_openrouter_api_key_here";

  if (isMockMode) {
    console.log("No valid OpenRouter API key found. Running in MOCK MODE.");
    // Simulate latency for realistic loading experience
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockGpt = `GPT consensus preview on: "${prompt}"\n\n1. In programming, self-consistency refers to ensemble methods that sample multiple outputs and vote/evaluate the most consistent reasoning chain.\n2. The recommended approach is to run parallel generation steps with temperature > 0, followed by a semantic similarity or majority-voting synthesis step.`;
    
    const mockClaude = `To answer your prompt about "${prompt}" from an Anthropic perspective:\n\n- Self-consistency (also known as Sample-and-Vote) is highly effective for reasoning, coding, and mathematical tasks.\n- We query the models multiple times (or query different models) to see where their explanations align.\n- The final synthesized response represents the consensus, filtering out individual model hallucinations.`;
    
    const mockGemini = `Here is the Google Gemini perspective on "${prompt}":\n\nSelf-consistency is a technique that improves LLM accuracy by running multiple paths. When you ask multiple models (like GPT, Claude, and Gemini) and use a judge model (OpenAI) to combine them, you benefit from diverse model biases neutralizing each other, leading to a much more stable and factual final result.`;

    const mockJudgeResponse = `### Consensus Synthesis (MOCK MODE)
*Please set a valid \`OPENROUTER_API_KEY\` in your \`backend/.env\` file to see live multi-model generation.*

Self-consistency in LLMs is an advanced reasoning technique where multiple generation paths are evaluated to find the most accurate and consensus-based solution. By combining responses from **GPT-4o**, **Claude 3.5**, and **Gemini 2.5**, we leverage their unique strengths:
1. **GPT** provides clear structured planning and conceptual definitions.
2. **Claude** offers detailed breakdown and architectural considerations.
3. **Gemini** focuses on high-speed factual summary and direct solutions.

### Final Merged Answer
To implement self-consistency, you query multiple distinct model instances (or different models) with the same prompt, then feed all outputs into a capable "Judge" model (e.g. OpenAI GPT-4o). The Judge determines where the models agree, resolves contradictions, and outputs a synthesized consensus. This drastically reduces hallucinations and error rates compared to single-model queries.`;

    const mockJudgeReasoning = `Consensus analysis of Mock outputs:
- **Agreement**: All three models agree that self-consistency is a sampling-and-voting technique that improves correctness and reduces hallucination.
- **Differences**: GPT focused on temperature and technical details, Claude on architectural implications, and Gemini on factual aggregation.
- **Synthesis**: The judge combined all three into a single cohesive explanation highlighting the general approach, unique strengths, and the final implementation pattern.`;

    return res.json({
      prompt,
      mock: true,
      responses: [
        { model: MODELS.GPT, success: true, response: mockGpt },
        { model: MODELS.CLAUDE, success: true, response: mockClaude },
        { model: MODELS.GEMINI, success: true, response: mockGemini },
      ],
      consensus: {
        success: true,
        response: mockJudgeResponse,
        reasoning: mockJudgeReasoning,
      }
    });
  }

  try {
    console.log(`Starting self-consistency query for prompt: "${prompt.substring(0, 50)}..."`);

    // Step 1: Query the 3 models in parallel
    const modelPromises = [
      callModel(MODELS.GPT, prompt),
      callModel(MODELS.CLAUDE, prompt),
      callModel(MODELS.GEMINI, prompt),
    ];

    const modelResponses = await Promise.all(modelPromises);

    // Step 2: Formulate the Judge prompt using the responses
    const judgePrompt = `You are a Self-Consistency Consensus Judge. A user entered the following prompt:
"${prompt}"

Here are the responses from 3 different LLMs:

=== MODEL 1 (${MODELS.GPT}) ===
${modelResponses[0].response}

=== MODEL 2 (${MODELS.CLAUDE}) ===
${modelResponses[1].response}

=== MODEL 3 (${MODELS.GEMINI}) ===
${modelResponses[2].response}

Your task is to:
1. Carefully read and evaluate all three responses.
2. Identify the common points of agreement (the consensus).
3. Identify and reconcile any conflicting statements or contradictions.
4. Synthesize a single, comprehensive, highly accurate final response that represents the best collective answer.
5. Provide a short, structured evaluation explaining your reasoning (how you evaluated consensus, what agreements/disagreements were found).

You MUST output your response in JSON format. The JSON object should contain exactly two keys:
- "consensusResponse": The synthesized final answer in beautiful Markdown format.
- "evaluationReasoning": Your analysis of the model responses (agreements, disagreements, and synthesis logic) in Markdown format.

Do not include any wrapping markdown code blocks (e.g. \`\`\`json) or extra text in your reply outside of the raw valid JSON object. Output ONLY the raw JSON.`;

    // Step 3: Run the synthesis completion
    console.log("Querying Judge model for synthesis...");
    const judgeCompletion = await openrouter.chat.send({
      chatRequest: {
        model: MODELS.JUDGE,
        messages: [{ role: "user", content: judgePrompt }],
      },
    });

    const judgeOutputRaw = judgeCompletion.choices?.[0]?.message?.content;
    if (!judgeOutputRaw) {
      throw new Error("No response received from Judge model.");
    }

    // Parse Judge output (handling potential JSON wrappers)
    let consensusData;
    try {
      const cleanJsonStr = judgeOutputRaw.trim().replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      consensusData = JSON.parse(cleanJsonStr);
    } catch (parseError) {
      console.warn("Failed to parse Judge output as JSON, returning fallback raw format.", parseError);
      consensusData = {
        consensusResponse: judgeOutputRaw,
        evaluationReasoning: "Fallback reasoning: The judge did not return a valid JSON format, so raw text is displayed.",
      };
    }

    res.json({
      prompt,
      mock: false,
      responses: modelResponses,
      consensus: {
        success: true,
        response: consensusData.consensusResponse,
        reasoning: consensusData.evaluationReasoning,
      }
    });

  } catch (error) {
    console.error("Self-consistency orchestration error:", error);
    res.status(500).json({
      error: "An error occurred while evaluating consensus.",
      details: error.message,
    });
  }
});

// Fallback to React app router
if (fs.existsSync(frontendDistPath)) {
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Self-Consistency GPT server listening on port ${PORT}`));

