import React, { useState, useEffect } from 'react';
import { 
  Box, Container, TextField, Button, Typography, Paper, 
  Stack, Stepper, Step, StepLabel, LinearProgress, IconButton, Tooltip, Alert, Chip 
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BoltIcon from '@mui/icons-material/Bolt';
import axios from 'axios';

const DEMO_PRESETS = [
  { label: "Standard conflict", context: "Best Friend", text: "my roommate keeps leaving dishes in the sink and it's driving me crazy" },
  { label: "High intensity", context: "Friend", text: "I CANNOT BELIEVE YOU DID THAT AGAIN!!! This is the third time!!" },
  { label: "Grief", context: "Manager", text: "my dad passed away last week and I don't know how to tell my boss I need time off" },
  { label: "Safety routing", context: "Partner", text: "he screamed at me and I'm scared to go home" },
];

export default function AuraFeed() {
  const [relationshipContext, setRelationshipContext] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState('');

  // Explicit fallback defaults to permanently prevent undefined variable crashes
  const [telemetry, setTelemetry] = useState(null);
  const [reasoningTrace, setReasoningTrace] = useState([]);
  const [primaryEmotion, setPrimaryEmotion] = useState('Analysis Pending');
  const [underlyingNeeds, setUnderlyingNeeds] = useState([]);
  const [detectedTriggers, setDetectedTriggers] = useState([]);
  const [strategySteps, setStrategySteps] = useState([]);
  const [safetyRouting, setSafetyRouting] = useState({ mode: 'standard', message: '', resources_shown: false });
  const [drafts, setDrafts] = useState([]);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reasoningTrace.length === 0) return;
    setActiveStep(0);
    const timeouts = reasoningTrace.map((_, i) => 
      setTimeout(() => setActiveStep(i + 1), i * 250)
    );
    return () => timeouts.forEach(clearTimeout);
  }, [reasoningTrace]);

  const applyPreset = (preset) => {
    setUserInput(preset.text);
    setRelationshipContext(preset.context);
  };

  const triggerConflictAnalysis = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('https://aura-ai-rl34.onrender.com/api/analyze-conflict', {
        user_input: userInput,
        relationship_context: relationshipContext || "Friend"
      });
      
      const d = res.data;
      setTelemetry(d.telemetry);
      setReasoningTrace(d.reasoning_trace || []);
      setPrimaryEmotion(d.primary_emotion || 'Analysis Complete');
      setUnderlyingNeeds(d.underlying_needs || []);
      setDetectedTriggers(d.detected_triggers || []);
      setStrategySteps(d.step_by_step_strategy || []);
      setSafetyRouting(d.safety_routing || { mode: 'standard', message: '', resources_shown: false });
      setDrafts(d.suggested_drafts || []);
    } catch (err) {
      console.error("Analysis request failed.", err);
      setError("Couldn't reach the live analysis engine. Keeping fallback matrix intact.");
    } finally {
      setLoading(false);
    }
  };

  const executeClipboardAction = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedId(type);
    setTimeout(() => setCopiedId(''), 2000);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4, backgroundColor: '#ffffff' }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Aura AI Core Platform <Typography component="span" variant="h5" color="text.secondary">Reasoning Agents Track</Typography>
        </Typography>
        
        {/* Presets Row Label */}
        <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ display: 'block', mt: 2, mb: 1 }}>
          QUICK LOAD PRESENTATION DEMO PRESETS:
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
          {DEMO_PRESETS.map((preset) => (
            <Chip 
              key={preset.label} 
              label={preset.label} 
              onClick={() => applyPreset(preset)} 
              variant="outlined" 
              color="primary"
              clickable
              size="small" 
            />
          ))}
        </Stack>

        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Relationship Context"
            placeholder="e.g., Mom, Friend, Partner, Boss"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={relationshipContext}
            onChange={(e) => setRelationshipContext(e.target.value)}
          />
          <TextField
            label="Describe Drift or Paste Raw Draft"
            placeholder="What is going on? Paste the text or argument details..."
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button 
            variant="contained" 
            size="large" 
            startIcon={<BoltIcon />}
            onClick={triggerConflictAnalysis}
            disabled={loading}
            sx={{ height: 55, borderRadius: 3, fontWeight: 'bold', textTransform: 'uppercase' }}
          >
            {loading ? "Processing Intentionally..." : "Execute Intent Processing"}
          </Button>
          {loading && <LinearProgress sx={{ borderRadius: 2, height: 6 }} />}
        </Stack>
      </Paper>

      {error && (
        <Alert severity="warning" variant="outlined" aria-live="polite" sx={{ mb: 3, borderRadius: 3, backgroundColor: '#fffde7' }}>
          {error}
        </Alert>
      )}

      {safetyRouting?.resources_shown && (
        <Alert severity="error" variant="filled" aria-live="assertive" sx={{ mb: 3, borderRadius: 3 }}>
          {safetyRouting.message}
        </Alert>
      )}

      {safetyRouting?.mode === "grief_support" && safetyRouting?.message && (
        <Alert severity="info" variant="filled" aria-live="polite" sx={{ mb: 3, borderRadius: 3 }}>
          {safetyRouting.message}
        </Alert>
      )}

      {telemetry && (
        <Stack spacing={4}>
          {/* Telemetry Panel */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, backgroundColor: '#fafafa' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }} gutterBottom>
              Operational Telemetry Metrics (Reliability & Safety Track)
            </Typography>
            <Stack direction="row" spacing={4} sx={{ mt: 2, flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="h5" fontWeight="bold" color="text.primary">{telemetry.execution_latency_ms} ms</Typography>
                <Typography variant="caption" color="text.secondary" fontWeight="bold">LATENCY</Typography>
              </Box>
              <Box sx={{ width: '100%', maxWidth: 200 }}>
                <Typography variant="h5" fontWeight="bold" color="text.primary">{telemetry.linguistic_intensity}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={telemetry.linguistic_intensity * 100} 
                  color={telemetry.linguistic_intensity > 0.6 ? "error" : "warning"}
                  sx={{ height: 8, borderRadius: 4, mt: 1 }}
                />
                <Typography variant="caption" color="text.secondary" fontWeight="bold">LEXICAL INTENSITY</Typography>
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" color={telemetry.intent_classification === "fallback" ? "warning.main" : "primary.main"}>
                  {telemetry.intent_classification.toUpperCase()}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight="bold">ROUTING STATUS</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Reasoning Trace Stepper */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, backgroundColor: '#fafafa' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 'bold', mb: 2 }}>
              Agentic Workflow Trace Matrix (20% Weight Evaluation)
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
              {reasoningTrace.map((step, index) => (
                <Step key={index} completed={activeStep > index}>
                  <StepLabel>
                    <Typography variant="body2" color="text.primary" fontWeight={activeStep === index ? "bold" : "normal"}>
                      {step}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          {/* Analytical Assessment Breakdown */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, flex: 1, backgroundColor: '#fafafa' }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }}>LEXICAL RADAR ASSESSMENT</Typography>
              <Typography variant="h6" fontWeight="bold" color="secondary" sx={{ mt: 1 }}>{primaryEmotion}</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>UNRESOLVED NEEDS</Typography>
                {underlyingNeeds.map((n, i) => <Typography key={i} variant="body2" color="text.primary">• {n}</Typography>)}
              </Box>
              {detectedTriggers.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>DETECTED TRIGGERS</Typography>
                  {detectedTriggers.map((t, i) => <Typography key={i} variant="body2" color="text.primary">• {t}</Typography>)}
                </Box>
              )}
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, flex: 1, backgroundColor: '#fafafa' }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold' }}>STRATEGIC DE-ESCALATION ROADMAP</Typography>
              <Stack spacing={1} sx={{ mt: 2 }}>
                {strategySteps.map((step, i) => (
                  <Typography key={i} variant="body2" sx={{ p: 1.2, background: '#f0f4c3', color: '#33691e', borderRadius: 2, fontWeight: '500' }}>
                    {i + 1}. {step}
                  </Typography>
                ))}
              </Stack>
            </Paper>
          </Stack>

          {/* Suggested Copy Panels */}
          {drafts.length > 0 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, color: 'text.primary' }}>
                OPTIMIZED DE-ESCALATION DRAFTS (Accessible Copy Panels)
              </Typography>
              <Stack spacing={2}>
                {drafts.map((d, index) => (
                  <Paper key={index} elevation={1} sx={{ p: 3, borderRadius: 3, borderLeft: '5px solid #2196f3', backgroundColor: '#ffffff' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box sx={{ pr: 2 }}>
                        <Typography variant="caption" fontWeight="bold" color="primary" sx={{ display: 'block', mb: 0.5 }}>
                          {d.variant.toUpperCase()} — {d.tonal_weight}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic', color: 'text.primary', lineHeight: 1.5 }}>
                          "{d.text}"
                        </Typography>
                      </Box>
                      <Tooltip title={copiedId === d.variant ? "Copied!" : "Copy Draft"}>
                        <IconButton onClick={() => executeClipboardAction(d.text, d.variant)} aria-label={`Copy ${d.variant}`} color="primary">
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      )}

      <span aria-live="polite" style={{ position: 'absolute', left: -9999 }}>
        {copiedId ? `${copiedId} draft copied to clipboard successfully.` : ''}
      </span>
    </Container>
  );
}