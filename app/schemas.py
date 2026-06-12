from pydantic import BaseModel, Field
from typing import List

class AnalysisRequest(BaseModel):
    relationship_context: str = Field(..., description="The metadata layer indicating origin mapping.")
    describe_drift: str = Field(..., description="The raw un-sanitized string buffer to compute.")

class TelemetryMetrics(BaseModel):
    latency: str
    token_load: int
    safety_score: str
    context_channels: int

class ReasoningStep(BaseModel):
    step: str
    log: str

class DraftTrack(BaseModel):
    title: str
    text: str
    classification: str
    target: str

class EngineResponse(BaseModel):
    telemetry: TelemetryMetrics
    matrix: List[ReasoningStep]
    primary_driver: str
    intensity: str
    strategies: List[str]
    drafts: List[DraftTrack]