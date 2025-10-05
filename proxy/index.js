const express = require('express');
const { search } = require('./tools/search');
const { calculate } = require('./tools/calculator');

const app = express();
const port = process.env.PORT || 3001;

// Middleware to enable CORS for frontend access.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.json());

const tools = {
  search,
  calculator,
};

/**
 * *****************************************************************************
 * REAL LLM LOGIC SIMULATION
 * *****************************************************************************
 * This function simulates the BEHAVIOR of a real LLM call to drive the agentic loop.
 * It is rule-based to demonstrate the tool-calling flow. In a real implementation,
 * this function would be replaced with an actual API call to a model like Gemini.
 */
async function callLLM(messages) {
  console.log('MODEL SIMULATION: Analyzing messages...');
  const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content?.toLowerCase() || '';
  const lastAssistantMessage = messages.filter(m => m.role === 'assistant').pop()?.content || '';

  // If the last message was a tool output, the model should now generate a final answer.
  if (lastAssistantMessage.startsWith('Tool output')) {
    console.log('MODEL SIMULATION: Detected tool output, generating final answer.');
    const context = lastAssistantMessage.replace('Tool output for "search": ', '');
    return {
      answer: `Based on the information I found from my tools, here is the summary: ${context}`,
      sources: ["https://example.com/simulated-source"],
    };
  }

  // Rule-based logic to decide if a tool should be called.
  if (lastUserMessage.includes('search for') || lastUserMessage.includes('how do')) {
    console.log('MODEL SIMULATION: Decided to call the "search" tool.');
    const query = lastUserMessage.replace('search for', '').trim();
    return {
      reasoning: 'The user is asking for information, so I should use the search tool.',
      tool: { name: 'search', input: { query: query } },
    };
  } else if (lastUserMessage.match(/what is .*[\+\-\*\/].*/)) {
    console.log('MODEL SIMULATION: Decided to call the "calculator" tool.');
    const expression = lastUserMessage.replace('what is', '').trim();
    return {
      reasoning: 'The user is asking a mathematical question, so I should use the calculator.',
      tool: { name: 'calculator', input: { expression: expression } },
    };
  }

  // If no tool is needed, return a final answer directly.
  console.log('MODEL SIMULATION: No tool needed, generating a direct answer.');
  return {
    answer: "Hello! I am OpenBD. You can ask me to search for information or solve simple math problems.",
    sources: [],
  };
}

// --- Main Chat Endpoint ---
app.post('/api/v1/chat', async (req, res) => {
  const { version, messages } = req.body;
  const MAX_TOOL_CALLS = 5;
  let toolCallCount = 0;

  if (version !== 'beta') {
    return res.status(400).json({ error: `Unsupported version: ${version}` });
  }
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty messages array.' });
  }

  const conversationHistory = [...messages];

  try {
    const systemPrompt = "You are OpenBD (beta)...";
    conversationHistory.unshift({ role: 'system', content: systemPrompt });

    while (toolCallCount < MAX_TOOL_CALLS) {
      console.log(`LOOP ${toolCallCount + 1}: Calling model...`);
      const modelResponse = await callLLM(conversationHistory);

      if (modelResponse.tool) {
        const toolName = modelResponse.tool.name;
        const toolInput = modelResponse.tool.input;
        const toolFunction = tools[toolName];

        if (!toolFunction) throw new Error(`Attempted to call unknown tool: ${toolName}`);

        console.log(`LOOP ${toolCallCount + 1}: Executing tool "${toolName}"...`);
        const toolResult = await toolFunction(toolInput.query || toolInput.expression);

        conversationHistory.push({
          role: 'assistant',
          content: `Tool output for "${toolName}": ${JSON.stringify(toolResult)}`,
        });
        toolCallCount++;
      } else {
        console.log(`LOOP ${toolCallCount + 1}: Model returned a final answer.`);
        return res.json({
          answer: modelResponse.answer || "No answer provided.",
          reasoning: modelResponse.reasoning || null,
          tool: null,
          sources: modelResponse.sources || [],
        });
      }
    }
    return res.status(500).json({ error: 'Agent exceeded maximum number of tool calls.' });
  } catch (error) {
    console.error('PROXY: An error occurred:', error);
    return res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`OpenBD Proxy server listening on port ${port}`);
});