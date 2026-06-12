// System User Signature Enforced: Niyati Joshi (Roll: E222)
import React, { useState, useEffect } from 'react';
import { 
  Box, Container, TextField, Button, Typography, Paper, 
  Stack, Stepper, Step, StepLabel, LinearProgress, IconButton, Tooltip, Alert 
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BoltIcon from '@mui/icons-material/Bolt';
import axios from 'axios';

export default function AuraFeed() {
  // Input Binding States
  const [userInput, setUserInput] = useState('');
  const [relationshipContext, setRelationshipContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState('');

  // Structured Flattened Response Mappings
  const [telemetry, setTelemetry] = useState(null);
  const [reasoningTrace, setReasoningTrace] = useState([]);
  const [primaryEmotion, setPrimaryEmotion] = useState('');
  const [underlyingNeeds, setUnderlyingNeeds] = useState([]);
  const [detectedTriggers, setDetectedTriggers] = useState([]);
  const [strategySteps, setStrategySteps] = useState([]);
  const [safetyRouting, setSafetyRouting] = useState(null);
  const [drafts, setDrafts] = useState([]);

  // Animation handling for execution traces
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reasoningTrace.length === 0) return;
    setActiveStep(0);
    const intervals = reasoningTrace.map((_, i) => 
      setTimeout(() => setActiveStep(i + 1), i * 250)
    );
    return () => intervals.forEach(clearTimeout);
  }, [reasoningTrace]);

  const triggerConflictAnalysis = async () => {
    if (!userInput.strip && !userInput) return;
    setLoading(true);
    try {
      const res = await axios.post('https://aura-ai-rl34.onrender.com/api/analyze-conflict', {
        user_input: userInput,
        relationship_context: relationshipContext || "Friend"
      });
      
      const d = res.data;
      setTelemetry(d.telemetry);
      setReasoningTrace(d.reasoning_trace);
      setPrimaryEmotion(d.primary_emotion);
      setUnderlyingNeeds(d.underlying_needs);
      setDetectedTriggers(d.detected_triggers);
      setStrategySteps(d.step_by_step_strategy);
      setSafetyRouting(d.safety_routing);
      setDrafts(d.suggested_drafts);
    } catch (err) {
      console.error("Inbound channel execution failed.", err);
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
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, mb: 4, background: '#fafafa' }}>
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Aura AI Core Platform <Typography component="span" variant="h5" color="text.secondary">Reasoning Agents Track</Typography>
        </Typography>
        
        <Stack spacing={3} sx={{ mt: 3 }}>
          <TextField
            label="Relationship Context (e.g., Mom, Friend, Partner)"
            variant="outlined"
            fullWidth
            value={relationshipContext}
            onChange={(e) => setRelationshipContext(e.target.value)}
          />
          <TextField
            label="Describe Drift or Paste Raw Draft"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <Button 
            variant="contained" 
            size="large" 
            startIcon={<BoltIcon />}
            onClick={triggerConflictAnalysis}
            disabled={loading}
            sx={{ height: 55, borderRadius: 3, fontWeight: 'bold' }}
          >
            {loading ? "COMPILING COGNITIVE INFRASTRUCTURE MESH..." : "EXECUTE INTENT PROCESSING"}
          </Button>
        </Stack>
      </Paper>

      {safetyRouting?.resources_shown && (
        <Alert severity="error" variant="filled" aria-live="assertive" sx={{ mb: 3, borderRadius: 3 }}>
          {safetyRouting.message}
        </Alert>
      )}

      {telemetry && (
        <Stack spacing={4}>
          {/* Telemetry Panel */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" uppercase gutterBottom>Operational Telemetry Metrics</Typography>
            <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
              <Box>
                <Typography variant="h5" fontWeight="bold">{telemetry.execution_latency_ms} ms</Typography>
                <Typography variant="caption" color="text.secondary">LATENCY</Typography>
              </Box>
              <Box sx={{ width: '100%', max_width: 200 }}>
                <Typography variant="h5" fontWeight="bold">{telemetry.linguistic_intensity}</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={telemetry.linguistic_intensity * 100} 
                  color={telemetry.linguistic_intensity > 0.6 ? "error" : "warning"}
                  sx={{ height: 8, borderRadius: 4, mt: 1 }}
                />
                <Typography variant="caption" color="text.secondary">LEXICAL INTENSITY</Typography>
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="bold" color="primary">{telemetry.intent_classification.toUpperCase()}</Typography>
                <Typography variant="caption" color="text.secondary">ROUTING STATUS</Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Reasoning Trace Stepper */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>AGENTIC WORKFLOW TRACE MATRIX</Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
              {reasoningTrace.map((step, index) => (
                <Step key={index} completed={activeStep > index}>
                  <StepLabel><Typography variant="body2" fontWeight={activeStep === index ? "bold" : "normal"}>{step}</Typography></StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          {/* Analytical Assessment Panels */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, flex: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">EMOTIONAL SPECTRUM</Typography>
              <Typography variant="h6" fontWeight="bold" color="secondary" sx={{ mt: 1 }}>{primaryEmotion}</Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" fontWeight="bold" color="text.secondary">UNRESOLVED NEEDS</Typography>
                {underlyingNeeds.map((n, i) => <Typography key={i} variant="body2">• {n}</Typography>)}
              </Box>
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, flex: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">STRATEGIC DE-ESCALATION ROADMAP</Typography>
              <Stack spacing={1} sx={{ mt: 2 }}>
                {strategySteps.map((step, i) => (
                  <Typography key={i} variant="body2" sx={{ p: 1, background: '#f5f5f5', borderRadius: 1 }}>{i+1}. {step}</Typography>
                ))}
              </Stack>
            </Paper>
          </Stack>

          {/* Live Suggestion Messaging Bubbles */}
          {drafts.length > 0 && (
            <Box>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>OPTIMIZED DE-ESCALATION DRAFTS</Typography>
              <Stack spacing={2}>
                {drafts.map((d, index) => (
                  <Paper key={index} elevation={1} sx={{ p: 3, borderRadius: 3, borderLeft: '5px solid #2196f3' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="caption" fontWeight="bold" color="primary">{d.variant.toUpperCase()} — {d.tonal_weight}</Typography>
                        <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic' }}>"{d.text}"</Typography>
                      </Box>
                      <Tooltip title={copiedId === d.variant ? "Copied!" : "Copy Draft"}>
                        <IconButton onClick={() => executeClipboardAction(d.text, d.variant)} aria-label={`Copy ${d.variant}`}>
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
      
      {/* Hidden Global ARIA Live Messenger Vector */}
      <span aria-live="polite" style={{ position: 'absolute', left: -9999 }}>
        {copiedId ? `${copiedId} response copied to device clipboard clipboard channels securely.` : ''}
      </span>
    </Container>
  );
}