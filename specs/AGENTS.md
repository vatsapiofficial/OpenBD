# AGENTS.md — OpenBD Agent Architecture & Specification

## Overview

This document captures the full set of ideas, rules, and design instructions we’ve developed for OpenBD’s agent / model integration, frontend UI, prompt spec, safety layers, and versioning. This is the canonical reference for how agents should behave in OpenBD.

---

## 1. Goals & Vision

- Build **OpenBD** as a Bangladeshi AGI-adjacent system that is safe, useful, respectful of local context, and world-class.
- Integrate with powerful underlying models (e.g. Gemini 2.5 Pro) but wrap them with guardrails, alignment, and version control.
- Empower rich UI / UX: support Bangla + English, embed UI components (via MDX / JSX), integrate with ai-elements frontend components.
- Provide **agentic loops / tool calls** (which we call “codeact with all component use”) in a controlled, auditable environment.
- Use versioned specifications (e.g. **OpenBD-beta**, later **OpenBD-v1**, etc.) so that behavior can evolve safely.

---

## 2. Core Concepts & Components

### Agent / Model Proxy

- A backend proxy (or middleware) receives requests from UI, wraps prompts according to spec, calls the underlying model (Gemini / fallback), post-processes output, applies safety filters, optionally executes tools, and returns structured output to UI.
- This proxy acts as the “agent guardian” controlling versioning, policy, format, and tool usage.

### Frontend UI / ai-elements

- Use **ai-elements** (React components) for chat interface: conversation container, message content, prompt input, response rendering, tool outputs, etc.
- Frontend should not call the model directly; it always communicates via the agent proxy.
- The UI must support rendering **MDX / component-embedded responses** sent by the agent.

### Versioned Spec (OpenBD-beta, etc.)

- The system uses a spec file (e.g. `OpenBD-beta.md`) that defines how prompts must be wrapped, output schema, tool definitions, policy rules, version guard logic, etc.
- UI and proxy must agree on version (e.g. `"version": "beta"` in API requests).

### Prompt Engineering / Logical Structuring

- Agent prompts are wrapped with structured templates defining system instructions, formatting rules, policy, reasoning expectations.
- Use **chain-of-thought** or multi-step reasoning, possibly hidden inside a `<ReasoningPanel>` or similar, while exposing final output cleanly.
- Ask agent to self-critique / revise its draft before final output.
- Always require output in a structured format (e.g. JSON) including `answer`, `reasoning`, `tool` (or `null`), and `sources`.

### UI / MDX / Component Embedding

- The agent is instructed to output in **MDX / JSX-informed markup** so that UI can embed or render components (charts, flows, quizzes, etc).
- Predefined component tags include (but are not limited to):
  - `<StepFlow />` (multi-step process visualization)
  - `<ReasoningPanel>` (hidden or collapsible reasoning)
  - `<BanglaExplain>` (section for Bangla explanation)
  - `<Quiz … />`
  - `<math>` (LaTeX math)
- Code blocks must carry metadata, e.g.
  ```tsx project="Proj" file="X.tsx" type="react"```
  to allow UI to recognize and optionally preview or embed code.

### Safety, Policy & Refusal

- The agent must refuse disallowed content (e.g. violence, hate, illegal instructions, real-time events outside knowledge).
- The prompt spec must embed policy rules and refusal templates.
- Proxy must enforce additional safety / filtering even if agent fails to comply.
- If output is malformed or violates structure, proxy regenerates or “safe refuse”.

### Tool Integration & Agentic Loop

- The agent can call predefined **tools** (e.g. `search`, `calculator`, others) as part of its reasoning. Tools have defined input schemas.
- The loop is:
  1. Agent reasons and may output a tool call request.
  2. Proxy (or backend) executes tool.
  3. Agent may be called again (or resume) with tool results to finalize output.
- The number of loop steps is capped to avoid runaway loops.
- UI must support rendering intermediate reasoning, tool outputs, possibly back-and-forth.

---

## 3. API & Data Flow

### API Request (UI → Proxy)

```json
{
  "version": "beta",
  "messages": [
    { "role": "system" | "user" | "assistant", "content": "…" }
  ]
}
```
version tells the proxy which spec to use (e.g. "beta").

messages includes conversation history and the user’s new message.


### Proxy Processing Steps

1. Version guard: reject if version unsupported.


2. Input sanitization: check for disallowed content / policy violations.


3. Prompt wrap: prepend a system prompt as defined in OpenBD-beta.md.


4. Call model: send to Gemini 2.5 Pro (or fallback) with wrapped messages.


5. Output parse: parse model’s returned text as JSON or MDX structure.


6. Post-check: validate schema, check for policy violations, possibly regenerate.


7. Tool execution (if tool field non-null): run the tool, feed result back.


8. Compose final output: either final answer or refusal.


9. Logging / audit: record full trace (prompt, output, tools, flags).


10. Return to UI: structured response (JSON + MDX markup).



### Proxy → UI Response Schema

A sample JSON response:
```json
{
  "answer": "… (MDX / text / markup) …",
  "reasoning": "(internal / optional text)",
  "tool": null,
  "sources": ["…"]
}
```
UI will embed and render this answer (interpreting MDX) and optionally show reasoning.


---

## 4. Example Prompt Spec (OpenBD-beta.md)

This is a rough sketch of the versioned spec file (referenced by proxy and UI):

# OpenBD-beta Spec

## Version
beta

## Prompt Wrapping
Wrap user queries within this template:

“You are **OpenBD (beta)**, powered by Gemini 2.5 Pro (or fallback). You output MDX / JSX-aware markup with embedded components. Use step-by-step reasoning, tool calling if needed, self-critique, revision. Provide schema output as JSON with fields answer, reasoning, tool, sources. Respond in the same language as user (Bangla if query in Bangla).”

## Output Schema

```json
{
  "answer": string,    // MDX / markup + text
  "reasoning": string, // optional internal reasoning
  "tool": { name, input } | null,
  "sources": [string]
}
```
### Allowed Tools

`search` → `input { query: string }`

`calculator` → `input { expression: string }`

(future) `code_exec`, `wiki_lookup`, etc.


### Components / Tags Allowed

`<StepFlow steps={[…]} />`

`<ReasoningPanel> … </ReasoningPanel>`

`<BanglaExplain> … </BanglaExplain>`

`<Quiz … />`

`<math> $$ … $$ </math>`


### Code Block Metadata Rules

Always include metadata for code blocks:

… code …

Do not omit imports or fragmentary code.


### Policy & Refusal

On disallowed requests, output exactly:

`I’m sorry. I’m not able to assist with that.`

No partial compliance that violates rules.

If asked for real-time / external data beyond knowledge cutoff, refuse or safe fallback.


### Version & Fallback Logic

If model fails to output valid JSON / structure, proxy should request regeneration up to N times.

If still failing, fallback to simpler model (Gemma or OpenBD local).

UI should handle version upgrades gracefully.


---

## 5. Agent Behavior Lifecycle & Example

### Lifecycle of a user query

1. **User types query** in UI (Bangla / English).
2. **UI sends** messages + version to proxy.
3. **Proxy wraps** prompt as per spec and calls model.
4. **Model returns** MDX + JSON structure (with possible tool field).
5. **Proxy validates** output. If tool requested, executes it.
6. **Proxy finalizes** answer, enforces policy, logs.
7. **UI renders** the MDX / markup into React components (via MDX parser + mapping to custom components).
8. Optionally **user asks for follow-up**, loop resumes.

### Example (Bangla query + embedded UI)

- **User**: “সৌর প্যানেল কীভাবে কাজ করে?”
- **Agent output** (MDX):

  ```mdx
  <ReasoningPanel>
  …internal reasoning in steps…
  </ReasoningPanel>

  <StepFlow steps={[
    "সূর্য আলো সংগ্রহ",
    "ফটোসেলে ইলেকট্রন বিচ্ছিন্নতা",
    "কারেন্ট উৎপন্ন",
    "আউটপুট প্রেরণ"
  ]} />

  <BanglaExplain>
  সৌর প্যানেল … (বাংলা ব্যাখ্যা)
  এটি কাজ করে … (বিস্তারিত)
  </BanglaExplain>

  References:
  - [Wikipedia: Solar cell](https://en.wikipedia.org/wiki/Solar_cell)
  - …
  ```
UI renders the reasoning panel (collapsible), the step flow as a visual component, and the Bangla explanation.



---

## 6. Safety, Auditing & Governance

All prompts, responses, and tool calls must be logged (with anonymization if needed) for audits.

Periodic red teaming / external audits to test abuse or failure modes.

Governance / oversight board must have access to logs, flags, and override / disable access when abuse is detected.

Proxy must have fallback refusal / safe output path if model misbehaves.

UI must include moderation / user feedback UI (report, flag, rate, override).



---

## 7. Versioning & Evolution

Start with OpenBD-beta, later version into OpenBD-v1, OpenBD-v2, etc.

Each version gets its own spec file (OpenBD-v1.md) with potentially new tools, new components, new prompt rules.

UI & proxy must support backward compatibility or version negotiation.

Deprecate old versions carefully, migrate users, allow rollback.



---

## 8. Next Steps & To-Dos

Finalize OpenBD-beta.md spec (components, tools, policies).

Build proxy server implementing the spec (wrapping, safety, tool execution, fallback).

Build frontend Next.js / React with ai-elements, integrate MDX parser & custom components.

Set up logging / audit / moderation infrastructure.

Run tests with sample queries (Bangla / English) to verify formatting, correct tool behavior, error recovery.

Engage red teams / internal tests to probe for policy violations, hallucinations, injection attacks.

Plan version upgrade paths for future OpenBD versions.



---