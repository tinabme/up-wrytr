// Tone presets guide the LLM on communication style
export const TONES = {
  professional: {
    description: "Professional and well-written",
    instructions: `Write in a professional yet conversational tone. Use clear language, avoid jargon unless necessary, 
      and be respectful and courteous. Keep it business-appropriate but friendly.`,
    examples: [
      "I'd love to get your thoughts on the proposal—it seems like a promising direction.",
      "Just wanted to loop you in on the latest updates from the team meeting.",
    ],
  },
  casual: {
    description: "Relaxed and easy-going",
    instructions: `Use a relaxed, friendly tone. Sound like a real person chatting with a colleague. Use contractions, 
      occasional emojis where appropriate, and keep things light but still clear and helpful.`,
    examples: [
      "Hey! Just checking in—how's the project coming along?",
      "Thought you might find this interesting, figured I'd send it your way.",
    ],
  },
  silly: {
    description: "Humorous and playful",
    instructions: `Be fun and witty! Throw in some humor, clever wordplay, or light jokes. Keep it professional enough 
      to use in a work setting but don't be afraid to show personality and make people smile.`,
    examples: [
      "I'd write this PR description myself, but the cats were walking on my keyboard 🐱",
      "Plot twist: I actually had a great idea about this. Who knew? Certainly not me.",
    ],
  },
  empathetic: {
    description: "Warm and understanding",
    instructions: `Lead with empathy and understanding. Acknowledge feelings, validate concerns, and be genuinely supportive. 
      Show you care and understand where the person is coming from.`,
    examples: [
      "I totally get why you're frustrated—this has been a rough few weeks. Let's figure it out together.",
      "I know this is a lot to take in, and I appreciate you being open to feedback.",
    ],
  },
  mixed: {
    description: "Balanced mix of all styles",
    instructions: `Blend professional, casual, and empathetic elements. Be warm but clear, friendly but appropriate, 
      and thoughtful about the situation. Let natural communication flow while maintaining clarity.`,
    examples: [
      "Really appreciate you flagging this—I hadn't considered that angle. Let's dig into it together.",
      "Hey, wanted to check in on how things are going. No rush, just thinking about you.",
    ],
  },
};

// Default tone
export const DEFAULT_TONE = "mixed";
