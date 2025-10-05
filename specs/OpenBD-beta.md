# OpenBD Beta Specification

This document outlines the features and specifications for the OpenBD beta release.

## Core Features

- **Bilingual Chat:** The chatbot MUST support both Bangla and English.
- **MDX Component Support:** The chatbot MUST be able to render custom MDX components like `BanglaExplain`, `ReasoningPanel`, `StepFlow`, and `Quiz`.
- **Tool Integration:** The chatbot SHOULD support tool integration for functionalities like search and calculation.

## Technical Specifications

- **Framework:** Next.js with App Router
- **UI Library:** shadcn/ui with ai-elements
- **AI SDK:** Vercel AI SDK
- **Styling:** Tailwind CSS
- **Language:** TypeScript