// Placeholder for prompt wrapping logic
// This module will be responsible for wrapping user prompts
// according to the versioned spec.

function wrapPrompt(messages, version) {
  // TODO: Load the spec for the given version (e.g., OpenBD-beta.md)
  // and prepend the system prompt.
  const systemPrompt = "You are OpenBD (beta)..."; // Simplified for now
  return [{ role: 'system', content: systemPrompt }, ...messages];
}

module.exports = { wrapPrompt };