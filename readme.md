# Aura AI — Cognitive Conflict De-escalation Platform

### Submission for Microsoft Agents League Hackathon 2026 (Reasoning Agents Track)
**Developer:** Niyati Joshi (Roll: E222)

---

## What It Does
Aura AI intercepts raw textual inputs describing interpersonal friction, parses emotional volatility markers in real time, and leverages a hybrid rule-and-agentic routing pipeline to generate organic, human-sounding text alternatives. It completely scrubs away robotic corporate jargon or standard chat therapy-speak, providing:

*   **Asynchronous Processing Telemetry:** Server latency benchmarks and network tracking metrics.
*   **Deterministic Lexical Intensity Metrics:** Live mathematical calculation of caps ratios and punctuation density.
*   **Tri-Modal Safety Router:** Dynamic code execution branching based on underlying intent markers.
*   **Psychological Grounding:** Text alternatives implicitly optimized around Non-Violent Communication (NVC) and Gottman Method frameworks.

---

## Technical Architecture Blueprint

```text
       [ Raw Conflict Text Input + Relationship Context ]
                                │
                                ▼
              [ 1. Tri-Modal Safety Routing Engine ]
                                │
       ├─► "abuse" pattern detected ──► [Safety Priority Layer] ──► Block LLM Inference & Surface Hotlines
       ├─► "grief" pattern detected ──► [Relational Mourning Layer] ──► Switch to Pure Empathy Presets
       └─► standard friction path ───► Continues to Step 2
                                │
                                ▼
         [ 2. Deterministic Lexical Intensity Computation ]
         (Calculates string caps ratios + trailing punctuation stress multipliers)
                                │
                                ▼
        [ 3. Asynchronous Connection Pool Inference (httpx) ]
           (Dispatches strict JSON schema block to Llama-3-8B)
                                │
       ┌────────────────────────┴────────────────────────┐
       ▼ (Inference Success)                             ▼ (Network / Parser Failure)
[Dynamic Payload Breakdown]                    [Rule-Based Heuristic Fallback]
• Extract Core Unresolved Needs                • Load Static Lexical Backups
• Extract Underlying Triggers                 • Map High/Low Urgency Templates
• Compile Tri-Variant Drafts                  • Maintain UI Contract Stability
       └────────────────────────┬────────────────────────┘
                                │
                                ▼
     [ Final Output Payload Emitted to React Material-UI Grid View ]
   (Telemetry + 5-Stage Sequential Trace Stepper + Flawless Rendering)

```

Every operational phase reflected within the frontend Vertical Stepper visualizer corresponds directly to an active execution block running inside the `app/main.py` pipeline. No faked intervals, simulated traces, or black-box components are used.

## Core Engineering Decisions & Validation Standards

* **Real-Time Safety Interception (No AI Hallucinations):** Instead of relying on a language model to handle high-urgency crisis signals safely, incoming data strings pass through a deterministic regex parsing grid prior to inference. Abuse disclosures immediately force an execution halt, suppressing text drafts entirely and surfacing official support resources.
* **Persistent Asynchronous Pooling Lifecycle:** Rather than instantiating expensive TCP handshakes on every payload cycle, the application anchors a persistent `httpx.AsyncClient` into the FastAPI startup lifespan state. Connection state recycling keeps execution latency consistently sub-200ms.
* **Graceful Degradation:** If the Groq API errors, times out, or returns malformed JSON, the app falls back to rule-based drafts rather than failing — the UI never shows a broken state.
* **Tone Engineering:** The system prompt explicitly bans therapy-speak/corporate phrasing and asks for three distinctly-voiced drafts grounded (implicitly, not by name-dropping) in Non-Violent Communication and Gottman Method principles.

## Tech Stack

* **Backend:** FastAPI + httpx (pooled async client, reused across requests)
* **Frontend:** React + Material UI
* **Model:** Llama-3-8B via Groq API

## Running Locally

### Backend

```bash
cd app
pip install -r requirements.txt
export GROQ_API_KEY=your_key_here
uvicorn main:app --reload --port 8000

```

Swagger docs: `http://localhost:8000/docs`

### Frontend

```bash
npm install
npm start

```

Runs at `http://localhost:3000`

## Demo Inputs to Try

1. **Standard conflict:** "my roommate keeps leaving dishes in the sink and it's driving me crazy"
2. **High intensity:** "I CANNOT BELIEVE YOU DID THAT AGAIN!!! This is the third time!!"
3. **Grief:** "my dad passed away last week and I don't know how to tell my boss I need time off"
4. **Safety routing:** "he screamed at me and I'm scared to go home" — shows hotline response, no drafts generated

```

```