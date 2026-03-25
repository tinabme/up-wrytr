import OpenAI from "openai";
import { TONES } from "./tones.js";
import { CHANNELS } from "./channels.js";

export class LLMHelper {
  constructor(apiKey, model = "gpt-4o-mini") {
    if (!apiKey) {
      throw new Error(
        "GITHUB_TOKEN not found. Please set it in your .env file or environment."
      );
    }
    this.model = model;
    this.client = new OpenAI({
      baseURL: "https://models.inference.ai.azure.com",
      apiKey,
    });
  }

  buildMessages(input, tone = "mixed", channel = "slack", context = "") {
    const toneConfig = TONES[tone] || TONES.mixed;
    const channelConfig = CHANNELS[channel] || CHANNELS.slack;

    const systemPrompt = `You are a helpful writing assistant that helps people craft better communications.
Your role is to help improve, complete, or rephrase messages while maintaining authenticity and personality.

TONE GUIDELINES:
${toneConfig.instructions}

CHANNEL GUIDELINES:
${channelConfig.instructions}

IMPORTANT RULES:
- Be conversational and natural, not robotic
- Keep the user's voice and perspective
- Avoid corporate jargon
- Be concise but complete
- If the input is just a topic or idea, help develop it
- If it's a draft, help improve it
- Only output the refined message, no explanations

${context ? `CONTEXT: ${context}` : ""}`;

    return {
      system: systemPrompt,
      user: `Please help me write this ${channel} message (${tone} tone):\n\n${input}`,
    };
  }

  async improve(input, tone = "mixed", channel = "slack", context = "") {
    const { system, user } = this.buildMessages(input, tone, channel, context);

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      });
      return response.choices[0].message.content;
    } catch (error) {
      throw new Error(`GitHub Models API error: ${error.message}`);
    }
  }

  async brainstorm(topic, tone = "mixed", channel = "slack") {
    const system = `You are a helpful writing assistant. Be conversational, creative, and concise.`;
    const user = `Help me brainstorm ideas for a ${channel} message about: ${topic}

Tone: ${tone}

Provide 3 different messaging approaches, then suggest the best complete message to use.`;

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      });
      return response.choices[0].message.content;
    } catch (error) {
      throw new Error(`GitHub Models API error: ${error.message}`);
    }
  }
}
