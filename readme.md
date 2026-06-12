# Aura AI — Core Computational Reasoning Engine
### 🧠 Submission for Microsoft Agents League Hackathon 2026 (Reasoning Agents Track)

**Developer Identification:** Niyati Joshi  

---

## 📋 Executive Project Summary

**Aura AI** is an advanced interpersonal reasoning agent designed to mitigate communication bottlenecks, asynchronous chat drifts, and emotional friction between individuals. Rather than relying on simple text generation, the platform intercepts raw, unstructured, or emotionally reactive inputs and processes them through a deterministic, multi-staged algorithmic verification pipeline. 

By leveraging architectural principles aligned with the **Microsoft IQ Intelligence Layer**, Aura AI maps conversational dynamics against proven psychological frameworks, producing high-empathy, accessible communication strategies optimized to preserve long-term social bonds.

---

## 🧠 Core Computational Architecture & Core Logic Flow

Aura AI strictly avoids the standard, single-prompt "LLM wrapper" pattern. Instead, it breaks down the interpretation and resolution of interpersonal conflict into five distinct, observable execution stages:

```text
[Raw Emotional User Input] 
       │
       ▼
 ┌─────────── Step 1 ───────────┐
 │ Microsoft Safety Guardrails  │ ➔ (Filters Toxicity & Sanitizes Input Buffer)
 └─────────────┬────────────────┘
               ▼
 ┌─────────── Step 2 ───────────┐
 │   Microsoft Work IQ Sync     │ ➔ (Indexes Shared Messaging History Graphs)
 └─────────────┬────────────────┘
               ▼
 ┌─────────── Step 3 ───────────┐
 │ Microsoft Foundry IQ Node    │ ➔ (Retrieves Secure Anti-Hallucination Citations)
 └─────────────┬────────────────┘
               ▼
 ┌─────────── Step 4 ───────────┐
 │ Roadmap Pipeline Generator   │ ➔ (Synthesizes Actionable Resolution Step Maps)
 └─────────────┬────────────────┘
               ▼
 ┌─────────── Step 5 ───────────┐
 │ Accessible UI Render Core    │ ➔ (Formats Copy-Ready High-Accessibility Drafts)
 └──────────────────────────────┘
```
### Deep Dive into the 5-Step Execution Trace:

1. **Safety Policy & Lexical Parsing Guardrails**
   The incoming text buffer is immediately evaluated against systemic safety guidelines to filter high-toxicity indicators. Simultaneously, an algorithmic lexical parser calculates the linguistic intensity based on sentence case weights and capitalization ratios.
   
2. **Dynamic Context Retrieval (Aligned with Microsoft Work IQ)**
   The engine maps relational boundaries by analyzing the user's relationship context description. It dynamically evaluates whether the connection profile represents a high-density, generational legacy relationship or an active, mid-density workspace/social connection.
   
3. **Anti-Hallucination Grounding Node (Aligned with Microsoft Foundry IQ)**
   To eliminate generative drift and hallucination vectors, the system anchors its deduction layer within validated human communication ontologies. It programmatically retrieves structured frameworks, mapping solutions specifically from *Gottman Core Repair Systems* and *Non-Violent Communication (NVC)* catalog specs.
   
4. **Strategic Roadmap Synthesis**
   The pipeline evaluates the processed emotional velocity and situational parameters to generate a live, step-by-step psychological de-escalation roadmap, forcing a cognitive pause sequence for the user.
   
5. **Accessible Dynamic Variant Processing**
   The terminal block compiles multiple custom action tracks (Empathetic, Direct, and Minimal). Each track is explicitly adjusted based on the relationship profile and comes with a clear structural rationale.

---

## 📊 Alignment with Evaluation Rubrics

### 1. Reasoning & Multi-Step Thinking (20% Rubric Weight)
The backend does not just output a flat text blocks; it explicitly exposes its operational state engine. The frontend dashboard parses this runtime trace log stream live, visually displaying computational deductions, specific memory tokens, and component latencies down to the millisecond.

### 2. Reliability, Safety, and IQ Tools (40% Combined Weight)
* **Deterministic Grounding:** Every resolution option is backed by a structured data grid displaying the source layer, exact source document URI, and retrieved context snippets.
* **Telemetry Observability:** The enterprise monitoring console tracks performance data including real-time pipeline latency, token consumption count, active memory slots, and safety compliance status scores.

### 3. User Experience, Presentation & Accessibility (30% Combined Weight)
* **Fluid Interface Geometry:** The canvas features an optimized fluid layout with strict overflow constraints to completely eliminate unwanted horizontal scrolling and layout shifts.
* **Anxiety-Aware Accessible UX:** To assist users experiencing cognitive overload or choice-paralysis, the platform features a clean visual hierarchy, semantic data tables, full keyboard focus routing targets, instant async clipboard copy triggers, and hidden `aria-live="assertive"` announcers for real-time screen readers.

---

## 🚀 Local Installation & Execution Guide

The platform is designed as an decoupled ecosystem featuring a **FastAPI python backend core** and a **Material-UI React.js frontend workspace**.

### 1. Backend Engine Deployment
```bash
cd aura-ai
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

*API interactive endpoints can be audited via Swagger at:* `http://localhost:8000/docs`
```
### 2. Frontend Workspace Deployment
Open a parallel command line instance in your workspace directory:
```bash
cd aura-ai
npm install
npm start
```
*The local UI environment will spin up instantly at:* `http://localhost:3000`

---

## ⚖️ Architectural Enforceability Statement
*Aura AI utilizes a high-fidelity simulation infrastructure network layer (`MicrosoftIQEngine`) designed to precisely mirror production SDK schemas and response payloads for Microsoft Foundry IQ and Work IQ context graphs, enabling complete offline validation without exposing private session tokens in a public repository.*
