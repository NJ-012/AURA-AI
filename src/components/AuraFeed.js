
import React, { useState, useEffect } from 'react';
import { 
  Box, Container, TextField, Button, Typography, Paper, 
  Stack, Stepper, Step, StepLabel, LinearProgress, IconButton, Tooltip, Alert, Chip,
  ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BoltIcon from '@mui/icons-material/Bolt';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import axios from 'axios';

const DEMO_PRESETS = [
  { label: "Standard conflict", context: "Roommate", text: "my roommate keeps leaving dishes in the sink and it's driving me crazy" },
  { label: "High intensity", context: "Friend", text: "I CANNOT BELIEVE YOU DID THAT AGAIN!!! This is the third time!!" },
  { label: "Grief", context: "Manager", text: "my dad passed away last week and I don't know how to tell my boss I need time off" },
  { label: "Safety routing", context: "Partner", text: "he screamed at me and I'm scared to go home" },
];

export default function AuraFeed() {
  const [darkMode, setDarkMode] = useState(true);
  const [relationshipContext, setRelationshipContext] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState('');

  const [telemetry, setTelemetry] = useState(null);
  const [reasoningTrace, setReasoningTrace] = useState([]);
  const [primaryEmotion, setPrimaryEmotion] = useState('Analysis Pending');
  const [underlyingNeeds, setUnderlyingNeeds] = useState([]);
  const [detectedTriggers, setDetectedTriggers] = useState([]);
  const [strategySteps, setStrategySteps] = useState([]);
  const [safetyRouting, setSafetyRouting] = useState({ mode: 'standard', message: '', resources_shown: false });
  const [drafts, setDrafts] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  // Dynamic Theme Configuration Matrix
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#6366f1' },
      secondary: { main: '#ec4899' },
      background: {
        default: darkMode ? '#0b0f19' : '#f8fafc',
        paper: darkMode ? '#111827' : '#ffffff',
      }
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    }
  });

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
      const res = await axios.post('[https://aura-ai-rl34.onrender.com/api/analyze-conflict](https://aura-ai-rl34.onrender.com/api/analyze-conflict)', {
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
      console.error(err);
      setError("Couldn't reach live processing nodes. Running local backup data structures.");
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 6 }}>
        
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight="800" color="primary">
              Aura AI <Typography component="span" variant="h4" fontWeight="300" color="text.secondary">Core Platform</Typography>
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">Reasoning Agents Track Submission</Typography>
          </Box>
          <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit" sx={{ border: '1px solid', borderColor: 'divider' }}>
              {darkMode ? <LightModeIcon color="warning" /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        
        <Paper elevation={2} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
          <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>
            Quick Load Presentation Demo Presets:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
            {DEMO_PRESETS.map((preset) => (
              <Chip 
                key={preset.label} 
                label={preset.label} 
                onClick={() => applyPreset(preset)} 
                variant="outlined" 
                color="primary"
                clickable
              />
            ))}
          </Stack>

          <Stack spacing={3}>
            <TextField
              label="Relationship Context"
              placeholder="e.g., Mom, Friend, Partner, Manager"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={relationshipContext}
              onChange={(e) => setRelationshipContext(e.target.value)}
            />
            <TextField
              label="Describe Conflict Drift / Paste Draft"
              placeholder="Provide interaction data or past transcript text matrices..."
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
              sx={{ height: 55, borderRadius: 3, fontWeight: 'bold' }}
            >
              {loading ? "Compiling Inference Stream..." : "Execute Intent Processing"}
            </Button>
            {loading && <LinearProgress sx={{ borderRadius: 2, height: 4 }} />}
          </Stack>
        </Paper>

        {error && (
          <Alert severity="warning" variant="outlined" sx={{ mb: 3, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        {safetyRouting?.resources_shown && (
          <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 3 }}>
            {safetyRouting.message}
          </Alert>
        )}

        {safetyRouting?.mode === "grief_support" && safetyRouting?.message && (
          <Alert severity="info" variant="filled" sx={{ mb: 3, borderRadius: 3 }}>
            {safetyRouting.message}
          </Alert>
        )}

        {telemetry && (
          <Stack spacing={4}>
            
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 'bold' }} gutterBottom>
                Operational Telemetry Metrics
              </Typography>
              <Stack direction="row" spacing={4} sx={{ mt: 2, flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography variant="h5" fontWeight="bold">{telemetry.execution_latency_ms} ms</Typography>
                  <Typography variant="caption" color="text.secondary">LATENCY</Typography>
                </Box>
                <Box sx={{ width: '100%', maxWidth: 200 }}>
                  <Typography variant="h5" fontWeight="bold">{telemetry.linguistic_intensity}</Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={telemetry.linguistic_intensity * 100} 
                    color={telemetry.linguistic_intensity > 0.6 ? "error" : "warning"}
                    sx={{ height: 6, borderRadius: 4, mt: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">LEXICAL INTENSITY</Typography>
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight="bold" color="primary">
                    {telemetry.intent_classification.toUpperCase()}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">ROUTING STATUS</Typography>
                </Box>
              </Stack>
            </Paper>

            
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 'bold', mb: 2 }}>
                Agentic Workflow Trace Matrix
              </Typography>
              <Stepper activeStep={activeStep} orientation="vertical">
                {reasoningTrace.map((step, index) => (
                  <Step key={index} completed={activeStep > index}>
                    <StepLabel>
                      <Typography variant="body2" fontWeight={activeStep === index ? "bold" : "normal"}>
                        {step}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Paper>

            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, flex: 1 }}>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">LEXICAL RADAR ASSESSMENT</Typography>
                <Typography variant="h6" fontWeight="bold" color="secondary" sx={{ mt: 1 }}>{primaryEmotion}</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>UNRESOLVED NEEDS</Typography>
                  {underlyingNeeds.map((n, i) => <Typography key={i} variant="body2">• {n}</Typography>)}
                </Box>
                {detectedTriggers.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>DETECTED TRIGGERS</Typography>
                    {detectedTriggers.map((t, i) => <Typography key={i} variant="body2">• {t}</Typography>)}
                  </Box>
                )}
              </Paper>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, flex: 1, borderLeft: '4px solid #6366f1' }}>
                <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">STRATEGIC DE-ESCALATION ROADMAP</Typography>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  {strategySteps.map((step, i) => (
                    <Typography key={i} variant="body2" sx={{ p: 1.2, backgroundColor: 'action.hover', borderRadius: 2 }}>
                      {i + 1}. {step}
                    </Typography>
                  ))}
                </Stack>
              </Paper>
            </Stack>

            
            {drafts.length > 0 && (
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  OPTIMIZED DE-ESCALATION DRAFTS
                </Typography>
                <Stack spacing={2}>
                  {drafts.map((d, index) => (
                    <Paper key={index} elevation={1} sx={{ p: 3, borderRadius: 3, borderLeft: '5px solid #6366f1' }}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Box sx={{ pr: 2 }}>
                          <Typography variant="caption" fontWeight="bold" color="primary" sx={{ display: 'block', mb: 0.5 }}>
                            {d.variant.toUpperCase()} — {d.tonal_weight}
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 1, fontStyle: 'italic', lineHeight: 1.5 }}>
                            "{d.text}"
                          </Typography>
                        </Box>
                        <Tooltip title={copiedId === d.variant ? "Copied!" : "Copy Draft"}>
                          <IconButton onClick={() => executeClipboardAction(d.text, d.variant)} color="primary">
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
          {copiedId ? `${copiedId} response copied to device clipboard.` : ''}
        </span>
      </Container>
    </ThemeProvider>
  );
}