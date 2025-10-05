# OpenBD Agent Architecture

This repository contains the implementation of the OpenBD agent architecture, as specified in `specs/AGENTS.md`.

## Project Structure

The project is organized into three main directories:

-   `specs/`: Contains the specification documents that define the agent's behavior, API, and versioning.
    -   `AGENTS.md`: The primary, comprehensive specification document.
    -   `OpenBD-beta.md`: The specific prompt and component specification for the "beta" version of the agent.

-   `proxy/`: A Node.js Express server that acts as the backend proxy. It receives requests from the frontend, wraps prompts according to the spec, calls the underlying language model, executes tools, and returns a structured response.

-   `frontend/`: A Next.js application that provides the user interface for interacting with the agent. It is responsible for rendering the chat interface and the custom MDX components returned by the proxy.

## Getting Started

### Proxy Server

To run the proxy server:

```bash
cd proxy
npm install
npm start
```

The server will start on port 3001 by default.

### Frontend Application

To run the frontend application:

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

---

This project was bootstrapped based on the detailed specification provided in `specs/AGENTS.md`.