// Channel-specific formatting decorators

export const CHANNELS = {
  slack: {
    name: "Slack",
    format: (text) => {
      // Slack allows markdown, basic formatting
      return text
        .replace(/\n\n/g, "\n") // Reduce spacing for Slack
        .replace(/^- /gm, "• "); // Convert markdown bullets to Slack
    },
    instructions: `Format for Slack:
      - Keep messages concise (Slack favors shorter messages)
      - Use *bold* for emphasis
      - You can use emoji reactions where appropriate
      - Break into threads if needed
      - Avoid huge blocks of text`,
  },

  email: {
    name: "Email",
    format: (text) => {
      // Email formatting - preserve structure
      return text;
    },
    instructions: `Format for email:
      - Start with an appropriate greeting
      - Use clear paragraphs (emails need structure)
      - End with a professional sign-off
      - Include specific calls to action
      - Be more formal than Slack but still conversational`,
  },

  github: {
    name: "GitHub",
    format: (text) => {
      // GitHub supports markdown including code blocks
      return text
        .split("\n")
        .map((line) => (line.startsWith("- ") ? line : line))
        .join("\n");
    },
    instructions: `Format for GitHub:
      - Use markdown formatting (headers, bold, lists)
      - Code blocks should use triple backticks with language: \`\`\`js
      - Reference issues/PRs with #123
      - Mention people with @username
      - Keep comments focused on the issue/PR
      - Use checklists with - [ ] syntax for task lists`,
  },
};

export const DEFAULT_CHANNEL = "slack";

export const formatForChannel = (text, channel = DEFAULT_CHANNEL) => {
  const formatter = CHANNELS[channel];
  if (!formatter) {
    console.warn(`Unknown channel: ${channel}, using default formatting`);
    return text;
  }
  return formatter.format(text);
};
