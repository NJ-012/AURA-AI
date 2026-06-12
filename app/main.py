# System User Signature Enforced: Niyati Joshi (Roll: E222)
import os
import time
import uuid
import json
import re
from datetime import datetime
from contextlib import asynccontextmanager
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import httpx

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Pure Render environment injector to bypass GitHub secret scan limits
    api_key = os.environ.get("GROQ_API_KEY", "").strip()
    app.state.http_client = httpx.AsyncClient(
        base_url="https://api.groq.com/openai/v1",
        headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
        timeout=httpx.Timeout(connect=2.0, read=8.0, write=2.0, pool=2.0),
        limits=httpx.Limits(max_keepalive_connections=10, max_connections=20),
    )
    yield
    await app.state.http_client.aclose()

app = FastAPI(
    title="Aura AI - Cognitive Conflict De-escalation Core",
    version="11.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ConflictInput(BaseModel):
    user_input: str
    relationship_context: str

class TelemetryMetrics(BaseModel):
    execution_latency_ms: float
    intent_classification: str
    linguistic_intensity: float

class DraftOption(BaseModel):
    variant: str
    text: str
    tonal_weight: str

class SafetyCrisisNode(BaseModel):
    mode: str
    message: Optional[str] = None
    resources_shown: bool

class UnifiedAuraResponse(BaseModel):
    execution_id: str
    timestamp: str
    telemetry: TelemetryMetrics
    reasoning_trace: List[str]
    safety_routing: SafetyCrisisNode
    primary_emotion: str
    underlying_needs: List[str]
    detected_triggers: List[str]
    step_by_step_strategy: List[str]
    suggested_drafts: List[DraftOption]

CRISIS_PATTERNS = {
    "grief": [r"\bdied\b", r"\bpassed away\b", r"\bfuneral\b", r"\blost (my|her|his|their)\b", r"\bbreakup\b", r"\bbroke up\b", r"\bmiss my\b"],
    "abuse": [r"\bhit me\b", r"\bhurt me\b", r"\bscreamed at\b", r"\bafraid of\b", r"\bthreatened\b", r"\babuse\b", r"\btoxic\b"]
}

def classify_intent(text: str) -> str:
    lowered = text.lower()
    for mode, patterns in CRISIS_PATTERNS.items():
        if any(re.search(p, lowered) for p in patterns):
            return mode
    return "standard"

def compute_lexical_intensity(text: str) -> float:
    if not text.strip():
        return 0.0
    caps_ratio = sum(1 for c in text if c.isupper()) / max(len(text), 1)
    exclam_ratio = text.count("!") / max(len(text.split()), 1)
    return min(1.0, round(caps_ratio * 2 + exclam_ratio * 3, 2))


@app.post("/api/analyze-conflict", response_model=UnifiedAuraResponse)
async def analyze_conflict(payload: ConflictInput, request: Request):
    start_timer = time.perf_counter()
    execution_id = f"aura-real-{uuid.uuid4().hex[:8].upper()}"
    
    intent = classify_intent(payload.user_input)
    intensity = compute_lexical_intensity(payload.user_input)

    primary_emotion = "Friction Dynamic"
    underlying_needs = ["Mutual Respect", "Clear Communication Space"]
    detected_triggers = ["Conversational Divergence"]
    strategy_steps = ["Take a brief cognitive pause.", "Avoid reactive text loops.", "State boundaries neutrally."]
    safety_mode = "standard"
    safety_message = None
    resources_shown = False
    drafts = []

    if intent == "abuse":
        safety_mode = "safety_priority"
        safety_message = "What you've described goes beyond a communication issue. If you're in immediate danger, please contact local emergency services. The National Domestic Violence Hotline is 1-800-799-7233, accessible 24/7."
        resources_shown = True
        primary_emotion = "Crisis Escalation"
        strategy_steps = ["Prioritize physical safety.", "Engage external support channels.", "Cease reactive communication loops."]

    elif intent == "grief":
        safety_mode = "grief_support"
        safety_message = "This sounds like an intense emotional space to process. Take your time—there is zero pressure to find immediate mechanical or relationship resolutions."
        resources_shown = False
        primary_emotion = "Acute Mourning / Loss State"
        strategy_steps = ["Allow yourself processing space without rushing outcomes.", "Focus on low-demand presence over task text execution."]
        drafts = [
            DraftOption(variant="Empathetic Track", text="I just wanted you to know I'm thinking of you. No need to respond at all right now—I'm here whenever you have the capacity to talk.", tonal_weight="Pure Presence"),
            DraftOption(variant="Direct Track", text="I was deeply shaken to hear about this situation. I'm putting everything else on hold for you—let me know if I can help with anything at all.", tonal_weight="Direct Support"),
            DraftOption(variant="Minimal Track", text="Thinking of you right now. Take care of yourself.", tonal_weight="Silent Comfort")
        ]

    else:
        client: httpx.AsyncClient = request.app.state.http_client
        api_key_check = os.environ.get("GROQ_API_KEY", "").strip()
        
        if api_key_check:
            try:
                system_instruction = (
                    f"You are a wise, empathetic relationship coach helping someone draft a text message to their {payload.relationship_context}.\n"
                    "Rules:\n"
                    "- Strictly NO corporate speak or therapy jargon like 'I hear you', 'navigate parameters', or 'processing framework'.\n"
                    "- Write like a real text back to someone: use natural contractions and normal conversational layout.\n"
                    "- Ground response styles implicitly in concepts from Non-Violent Communication and the Gottman Method.\n\n"
                    "Return a raw valid JSON object matching this schema blueprint precisely without markdown formatting or code block wraps:\n"
                    "{\n"
                    "  \"primary_emotion\": \"Short natural description\",\n"
                    "  \"underlying_needs\": [\"Need 1\", \"Need 2\"],\n"
                    "  \"detected_triggers\": [\"Trigger 1\"],\n"
                    "  \"strategy_steps\": [\"Step 1\", \"Step 2\", \"Step 3\"],\n"
                    "  \"empathetic_draft\": \"Warm human text variant\",\n"
                    "  \"direct_draft\": \"Cuts through the noise cleanly\",\n"
                    "  \"minimal_draft\": \"Casual low pressure ping\"\n"
                    "}"
                )
                
                response = await client.post(
                    "/chat/completions",
                    json={
                        "model": "llama3-8b-8192",
                        "messages": [
                            {"role": "system", "content": system_instruction},
                            {"role": "user", "content": payload.user_input}
                        ],
                        "temperature": 0.4 if intensity > 0.5 else 0.7,
                        "response_format": {"type": "json_object"},
                        "max_tokens": 500
                    }
                )
                response.raise_for_status()
                obj = json.loads(response.json()["choices"][0]["message"]["content"])
                
                primary_emotion = obj.get("primary_emotion", primary_emotion)
                underlying_needs = obj.get("underlying_needs", underlying_needs)
                detected_triggers = obj.get("detected_triggers", detected_triggers)
                strategy_steps = obj.get("strategy_steps", strategy_steps)
                
                drafts = [
                    DraftOption(variant="Empathetic Track", text=obj.get("empathetic_draft", ""), tonal_weight="Deep Validation Format"),
                    DraftOption(variant="Direct Track", text=obj.get("direct_draft", ""), tonal_weight="Honest Action Frame"),
                    DraftOption(variant="Minimal Track", text=obj.get("minimal_draft", ""), tonal_weight="Low Burden Touchpoint")
                ]
            except Exception:
                intent = "fallback"

        if not api_key_check or intent == "fallback":
            safety_mode = "fallback"
            primary_emotion = "Frustrated Attenuation" if intensity > 0.4 else "Concern Flow"
            strategy_steps = ["Take a deep breath.", "State your core emotional need briefly.", "Suggest connecting when both are calmer."]
            drafts = [
                DraftOption(variant="Empathetic Track", text="Hey, things feel a bit heated between us right now. Let's take some time and talk when we're both in a better space.", tonal_weight="Fallback Heuristic"),
                DraftOption(variant="Direct Track", text="I need to clear the air about what happened. Can we find a few minutes to talk later today?", tonal_weight="Direct Fallback"),
                DraftOption(variant="Minimal Track", text="Can we sync up later?", tonal_weight="Micro Fallback")
            ]

    elapsed_ms = round((time.perf_counter() - start_timer) * 1000, 2)

    return UnifiedAuraResponse(
        execution_id=execution_id,
        timestamp=datetime.utcnow().isoformat() + "Z",
        telemetry=TelemetryMetrics(execution_latency_ms=elapsed_ms, intent_classification=intent, linguistic_intensity=intensity),
        reasoning_trace=[
            "Safety scanner executed: checking for active crisis signatures.",
            f"Computed real-time lexical intensity multiplier: {intensity}",
            f"Routing engine decision path: determined '{intent}' network profile.",
            "Live Llama3 infrastructure call completed successfully." if intent == "standard" and safety_mode != "fallback" else f"Specialized routing activated: {safety_mode}.",
            "State array compiled. Emitting dynamic response payload onto MUI framework."
        ],
        safety_routing=SafetyCrisisNode(mode=safety_mode, message=safety_message, resources_shown=resources_shown),
        primary_emotion=primary_emotion,
        underlying_needs=underlying_needs,
        detected_triggers=detected_triggers,
        step_by_step_strategy=strategy_steps,
        suggested_drafts=drafts
    )