// Global state management
const state = {
  currentSession: 'landing', // landing, reporter, specialist
  currentStep: 0,
  responses: {},
  totalSteps: 9,
  specialistView: 'dashboard',
  currentUser: null
};

// Mock data for specialist session
const mockCases = [
  { id: 2305, date: '2025-11-14', type: 'Acoso físico', grade: '5to A', severity: 'critical', status: 'new', description: 'Agresión física repetida' },
  { id: 2304, date: '2025-11-13', type: 'Acoso verbal', grade: '6to B', severity: 'high', status: 'inprogress', description: 'Insultos constantes' },
  { id: 2303, date: '2025-11-12', type: 'Ciberacoso', grade: '5to A', severity: 'critical', status: 'new', description: 'Amenazas por redes sociales' },
  { id: 2302, date: '2025-11-11', type: 'Aislamiento', grade: '7mo C', severity: 'moderate', status: 'inprogress', description: 'Exclusión social' },
  { id: 2301, date: '2025-11-10', type: 'Acoso verbal', grade: '5to A', severity: 'high', status: 'resolved', description: 'Comentarios ofensivos' }
];

const networkData = {
  nodes: [
    { id: 'maria', name: 'María G.', type: 'leader', x: 250, y: 200, connections: 8 },
    { id: 'carlos', name: 'Carlos A.', type: 'aggressor', x: 450, y: 150, connections: 3 },
    { id: 'pedro', name: 'Pedro M.', type: 'victim', x: 450, y: 350, connections: 1 },
    { id: 'luis', name: 'Luis R.', type: 'victim', x: 600, y: 250, connections: 2 },
    { id: 'ana', name: 'Ana S.', type: 'mediator', x: 350, y: 300, connections: 6 },
    { id: 'jorge', name: 'Jorge P.', type: 'witness', x: 150, y: 350, connections: 4 },
    { id: 'sofia', name: 'Sofía L.', type: 'leader', x: 150, y: 150, connections: 7 },
    { id: 'diego', name: 'Diego M.', type: 'witness', x: 550, y: 100, connections: 3 }
  ],
  edges: [
    { from: 'maria', to: 'ana', type: 'friendship' },
    { from: 'maria', to: 'sofia', type: 'friendship' },
    { from: 'carlos', to: 'pedro', type: 'aggression' },
    { from: 'pedro', to: 'luis', type: 'support' },
    { from: 'ana', to: 'pedro', type: 'support' },
    { from: 'jorge', to: 'pedro', type: 'witness' },
    { from: 'sofia', to: 'maria', type: 'friendship' },
    { from: 'diego', to: 'carlos', type: 'witness' }
  ]
};

// Bot flow configuration
const botFlow = [
  {
    step: 1,
    type: 'greeting',
    question: 'Hola, soy el asistente de SociaiEye. Estoy aquí para ayudarte a reportar una incidencia de forma segura y confidencial. ¿Cuál es tu nombre?',
    field: 'nombre',
    inputType: 'text'
  },
  {
    step: 2,
    type: 'context',
    question: '¿Quién eres?',
    field: 'rol',
    inputType: 'buttons',
    options: ['Docente', 'Tutor', 'Psicólogo escolar', 'Padre/Madre', 'Otro']
  },
  {
    step: 3,
    type: 'general_info',
    question: '¿En qué grado o aula ocurrió la incidencia?',
    field: 'grado',
    inputType: 'text'
  },
  {
    step: 4,
    type: 'behavioral',
    questions: [
      {
        question: '¿Qué acciones o comportamientos observaste?',
        field: 'comportamiento_observado',
        inputType: 'textarea'
      },
      {
        question: '¿Con qué frecuencia ocurre esto?',
        field: 'frecuencia',
        inputType: 'buttons',
        options: ['Primera vez', 'Ocasionalmente', 'Frecuentemente', 'Constantemente']
      },
      {
        question: '¿Incluye agresión física, verbal, gestual o digital?',
        field: 'tipo_agresion',
        inputType: 'buttons',
        options: ['Solo verbal', 'Solo digital', 'Solo físico', 'Combinados']
      }
    ]
  },
  {
    step: 5,
    type: 'emotional',
    questions: [
      {
        question: '¿Cómo se ve afectado emocionalmente? (Puedes seleccionar varias opciones)',
        field: 'estado_emocional',
        inputType: 'checkboxes',
        options: ['Tristeza', 'Miedo', 'Ansiedad', 'Baja autoestima', 'Aislamiento', 'Rabia/Frustración']
      },
      {
        question: '¿Has notado cambios en su comportamiento?',
        field: 'cambios_emocionales',
        inputType: 'buttons',
        options: ['Sí, muy notables', 'Sí, pero leves', 'No estoy seguro', 'No']
      },
      {
        question: '¿Ha expresado ideas de autolesión o suicidio?',
        field: 'riesgo_autolesion',
        inputType: 'buttons',
        priority: 'critical',
        options: ['Sí - CRÍTICO', 'Posiblemente', 'No', 'No sé']
      }
    ]
  },
  {
    step: 6,
    type: 'social',
    questions: [
      {
        question: '¿Cuál es la posición social del estudiante afectado?',
        field: 'posicion_social',
        inputType: 'buttons',
        options: ['Aislado por el grupo', 'Con pocos amigos', 'Tiene amigos de confianza', 'Líder del grupo']
      },
      {
        question: '¿Quiénes están involucrados en la incidencia?',
        field: 'tipo_agresor',
        inputType: 'buttons',
        options: ['Un solo agresor', 'Grupo de agresores', 'Agresor con cómplices']
      },
      {
        question: '¿Cuál es el rol del grupo observador?',
        field: 'rol_observadores',
        inputType: 'buttons',
        options: ['Observan pasivamente', 'Animan al agresor', 'Intentan ayudar']
      },
      {
        question: '¿Hay influencia de redes sociales o espacios digitales?',
        field: 'influencia_digital',
        inputType: 'buttons',
        options: ['Sí, principalmente en línea', 'Sí, tanto en línea como presencial', 'Solo presencial']
      }
    ]
  },
  {
    step: 7,
    type: 'cognitive',
    questions: [
      {
        question: '¿Ha habido cambios en el rendimiento académico?',
        field: 'rendimiento_academico',
        inputType: 'buttons',
        options: ['Disminución notoria', 'Disminución leve', 'Sin cambios', 'Mejora']
      },
      {
        question: '¿Dificultades para concentrarse o participar?',
        field: 'concentracion',
        inputType: 'buttons',
        options: ['Sí, severas', 'Sí, moderadas', 'Leves', 'No']
      },
      {
        question: '¿Ha expresado creencias negativas sobre sí mismo?',
        field: 'creencias_negativas',
        inputType: 'textarea'
      }
    ]
  },
  {
    step: 8,
    type: 'temporal',
    questions: [
      {
        question: '¿Cuándo comenzó esta situación?',
        field: 'fecha_inicio',
        inputType: 'date'
      },
      {
        question: '¿Dónde ocurren principalmente estos hechos?',
        field: 'lugar_hechos',
        inputType: 'buttons',
        options: ['En el aula', 'En el recreo', 'A la entrada/salida', 'Fuera del colegio', 'En línea', 'Múltiples lugares']
      }
    ]
  },
  {
    step: 9,
    type: 'summary',
    question: 'He recopilado toda la información. A continuación verás un resumen completo. ¿Deseas revisar antes de enviar?'
  }
];

// Initialize
function init() {
  addBotMessage(botFlow[0].question);
  renderInput(botFlow[0]);
}

// Add message to chat
function addBotMessage(message) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot';
  messageDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <div class="message-bubble">${message}</div>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

function addUserMessage(message) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user';
  messageDiv.innerHTML = `
    <div class="message-avatar">👤</div>
    <div class="message-content">
      <div class="message-bubble">${message}</div>
    </div>
  `;
  chatMessages.appendChild(messageDiv);
  scrollToBottom();
}

function showTypingIndicator() {
  const chatMessages = document.getElementById('chatMessages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot';
  typingDiv.id = 'typingIndicator';
  typingDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div class="message-content">
      <div class="message-bubble">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    </div>
  `;
  chatMessages.appendChild(typingDiv);
  scrollToBottom();
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typingIndicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function scrollToBottom() {
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Render input based on type
function renderInput(stepData) {
  const inputSection = document.getElementById('inputSection');
  inputSection.innerHTML = '';

  if (stepData.inputType === 'text') {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'text-input';
    input.placeholder = 'Escribe tu respuesta...';
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        handleResponse(stepData.field, input.value.trim());
      }
    });
    inputSection.appendChild(input);
    
    const button = document.createElement('button');
    button.className = 'submit-button';
    button.textContent = 'Enviar';
    button.onclick = () => {
      if (input.value.trim()) {
        handleResponse(stepData.field, input.value.trim());
      }
    };
    inputSection.appendChild(button);
    input.focus();
  } else if (stepData.inputType === 'textarea') {
    const textarea = document.createElement('textarea');
    textarea.className = 'text-input';
    textarea.placeholder = 'Describe lo que observaste...';
    inputSection.appendChild(textarea);
    
    const button = document.createElement('button');
    button.className = 'submit-button';
    button.textContent = 'Enviar';
    button.onclick = () => {
      if (textarea.value.trim()) {
        handleResponse(stepData.field, textarea.value.trim());
      }
    };
    inputSection.appendChild(button);
    textarea.focus();
  } else if (stepData.inputType === 'date') {
    const input = document.createElement('input');
    input.type = 'date';
    input.className = 'date-input';
    input.max = new Date().toISOString().split('T')[0];
    inputSection.appendChild(input);
    
    const button = document.createElement('button');
    button.className = 'submit-button';
    button.textContent = 'Continuar';
    button.onclick = () => {
      if (input.value) {
        handleResponse(stepData.field, input.value);
      }
    };
    inputSection.appendChild(button);
  } else if (stepData.inputType === 'buttons') {
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'input-buttons';
    stepData.options.forEach(option => {
      const button = document.createElement('button');
      button.className = 'input-button';
      button.textContent = option;
      button.onclick = () => handleResponse(stepData.field, option, stepData.priority);
      buttonsDiv.appendChild(button);
    });
    inputSection.appendChild(buttonsDiv);
  } else if (stepData.inputType === 'checkboxes') {
    const checkboxesDiv = document.createElement('div');
    checkboxesDiv.className = 'input-checkboxes';
    stepData.options.forEach(option => {
      const label = document.createElement('label');
      label.className = 'checkbox-option';
      label.innerHTML = `
        <input type="checkbox" value="${option}">
        <span>${option}</span>
      `;
      checkboxesDiv.appendChild(label);
    });
    inputSection.appendChild(checkboxesDiv);
    
    const button = document.createElement('button');
    button.className = 'submit-button';
    button.textContent = 'Continuar';
    button.onclick = () => {
      const checked = Array.from(inputSection.querySelectorAll('input[type="checkbox"]:checked'))
        .map(cb => cb.value);
      if (checked.length > 0) {
        handleResponse(stepData.field, checked.join(', '));
      }
    };
    inputSection.appendChild(button);
  }
}

// Handle response
function handleResponse(field, value, priority) {
  // Save response
  state.responses[field] = value;
  
  // Show user message
  addUserMessage(value);
  
  // Check for critical response
  if (priority === 'critical' && value.includes('CRÍTICO')) {
    document.getElementById('criticalAlert').classList.add('active');
  }
  
  // Update summary
  updateSummary();
  
  // Clear input
  document.getElementById('inputSection').innerHTML = '';
  
  // Move to next question
  setTimeout(() => {
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      nextQuestion();
    }, 1000);
  }, 500);
}

// Move to next question
function nextQuestion() {
  const currentStepData = botFlow[state.currentStep];
  
  // Handle multi-question steps
  if (currentStepData.questions) {
    const currentQuestionIndex = currentStepData.questions.findIndex(q => !state.responses[q.field]);
    
    if (currentQuestionIndex !== -1) {
      const questionData = currentStepData.questions[currentQuestionIndex];
      addBotMessage(questionData.question);
      renderInput(questionData);
      updateProgress();
      return;
    }
  }
  
  // Move to next step
  state.currentStep++;
  
  if (state.currentStep >= botFlow.length) {
    showFinalSummary();
    return;
  }
  
  const nextStepData = botFlow[state.currentStep];
  
  if (nextStepData.questions) {
    addBotMessage(nextStepData.questions[0].question);
    renderInput(nextStepData.questions[0]);
  } else {
    addBotMessage(nextStepData.question);
    if (nextStepData.inputType) {
      renderInput(nextStepData);
    } else {
      showFinalSummary();
    }
  }
  
  updateProgress();
}

// Update progress bar
function updateProgress() {
  const progress = ((state.currentStep + 1) / state.totalSteps) * 100;
  document.getElementById('progressFill').style.width = `${progress}%`;
  document.getElementById('progressText').textContent = `Paso ${state.currentStep + 1} de ${state.totalSteps}`;
}

// Update summary panel
function updateSummary() {
  // Update user info
  if (state.responses.nombre) {
    document.getElementById('summaryNombre').textContent = state.responses.nombre;
  }
  if (state.responses.rol) {
    document.getElementById('summaryRol').textContent = state.responses.rol;
  }
  if (state.responses.grado) {
    document.getElementById('summaryGrado').textContent = state.responses.grado;
  }
  
  // Update dimensions
  if (state.responses.frecuencia) {
    document.getElementById('summaryFrecuencia').textContent = state.responses.frecuencia;
  }
  if (state.responses.tipo_agresion) {
    document.getElementById('summaryTipoAgresion').textContent = state.responses.tipo_agresion;
  }
  if (state.responses.estado_emocional) {
    document.getElementById('summaryEstados').textContent = state.responses.estado_emocional;
  }
  if (state.responses.riesgo_autolesion) {
    document.getElementById('summaryRiesgo').textContent = state.responses.riesgo_autolesion;
  }
  if (state.responses.posicion_social) {
    document.getElementById('summaryPosicion').textContent = state.responses.posicion_social;
  }
  if (state.responses.tipo_agresor) {
    document.getElementById('summaryAgresor').textContent = state.responses.tipo_agresor;
  }
  if (state.responses.rendimiento_academico) {
    document.getElementById('summaryRendimiento').textContent = state.responses.rendimiento_academico;
  }
  if (state.responses.concentracion) {
    document.getElementById('summaryConcentracion').textContent = state.responses.concentracion;
  }
  
  // Update severity
  updateSeverity();
}

// Calculate and update severity
function updateSeverity() {
  let severityScore = 0;
  const severityCard = document.getElementById('severityCard');
  const severityLevel = document.getElementById('severityLevel');
  const severityDescription = document.getElementById('severityDescription');
  
  // Critical factors
  if (state.responses.riesgo_autolesion && state.responses.riesgo_autolesion.includes('CRÍTICO')) {
    severityScore = 4;
  }
  
  // High frequency
  if (state.responses.frecuencia === 'Constantemente' || state.responses.frecuencia === 'Frecuentemente') {
    severityScore = Math.max(severityScore, 3);
  }
  
  // Physical or combined aggression
  if (state.responses.tipo_agresion === 'Solo físico' || state.responses.tipo_agresion === 'Combinados') {
    severityScore = Math.max(severityScore, 3);
  }
  
  // Notable behavioral changes
  if (state.responses.cambios_emocionales === 'Sí, muy notables') {
    severityScore = Math.max(severityScore, 2);
  }
  
  // Severe concentration issues
  if (state.responses.concentracion === 'Sí, severas') {
    severityScore = Math.max(severityScore, 2);
  }
  
  // Apply severity styling
  severityCard.className = 'severity-card';
  
  if (severityScore === 4) {
    severityCard.classList.add('critical');
    severityLevel.textContent = 'CRÍTICO';
    severityDescription.textContent = 'Intervención inmediata requerida';
  } else if (severityScore === 3) {
    severityCard.classList.add('high');
    severityLevel.textContent = 'Riesgo Alto';
    severityDescription.textContent = 'Situación severa que requiere atención urgente';
  } else if (severityScore === 2) {
    severityCard.classList.add('moderate');
    severityLevel.textContent = 'Riesgo Moderado';
    severityDescription.textContent = 'Patrón detectado - Se recomienda intervención';
  } else if (severityScore === 1) {
    severityLevel.textContent = 'Riesgo Bajo';
    severityDescription.textContent = 'Incidente aislado - Monitoreo preventivo';
  } else {
    severityLevel.textContent = 'Evaluando...';
    severityDescription.textContent = 'Completando información del reporte';
  }
}

// Show final summary
function showFinalSummary() {
  const inputSection = document.getElementById('inputSection');
  inputSection.innerHTML = `
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      <button class="input-button" onclick="editReport()">✏️ Editar</button>
      <button class="submit-button" onclick="submitReport()">Enviar Reporte</button>
    </div>
  `;
  updateProgress();
}

// Action functions
function saveDraft() {
  alert('Borrador guardado exitosamente');
}

function showPreview() {
  const previewText = Object.entries(state.responses)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
  alert('Vista Previa:\n\n' + previewText);
}

function editReport() {
  if (confirm('¿Deseas volver al inicio para editar el reporte?')) {
    location.reload();
  }
}

function submitReport() {
  if (confirm('¿Estás seguro de enviar este reporte?')) {
    addBotMessage('✅ Reporte enviado exitosamente. Gracias por ayudarnos a proteger a los estudiantes. Un especialista revisará este caso.');
    document.getElementById('inputSection').innerHTML = '<button class="btn-primary" style="width: 100%; padding: 12px;" onclick="location.reload()">Crear Nuevo Reporte</button>';
  }
}

// Navigation functions
function startReporterSession() {
  state.currentSession = 'reporter';
  document.getElementById('landingPage').classList.add('hidden');
  document.getElementById('reporterSession').classList.remove('hidden');
  init();
}

function showSpecialistLogin() {
  document.getElementById('landingPage').classList.add('hidden');
  document.getElementById('specialistLogin').classList.remove('hidden');
}

function backToLanding() {
  document.getElementById('landingPage').classList.remove('hidden');
  document.getElementById('specialistLogin').classList.add('hidden');
  document.getElementById('reporterSession').classList.add('hidden');
  document.getElementById('specialistSession').classList.add('hidden');
  state.currentSession = 'landing';
}

function authenticateSpecialist() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if (!email || !password) {
    alert('Por favor completa todos los campos');
    return;
  }
  
  // Mock authentication
  state.currentUser = { name: 'Dr. Especialista', email: email };
  document.getElementById('specialistLogin').classList.add('hidden');
  document.getElementById('specialistSession').classList.remove('hidden');
  state.currentSession = 'specialist';
  
  // Update user name
  document.getElementById('userName').textContent = state.currentUser.name;
  
  // Initialize specialist dashboard
  loadDashboard();
}

function logout() {
  state.currentUser = null;
  backToLanding();
}

// Specialist navigation
function showDashboard(e) {
  if (e) e.preventDefault();
  hideAllViews();
  document.getElementById('dashboardView').classList.remove('hidden');
  updateActiveNav(e?.target);
  loadDashboard();
}

function showCases(e) {
  if (e) e.preventDefault();
  hideAllViews();
  document.getElementById('dashboardView').classList.remove('hidden');
  updateActiveNav(e?.target);
}

function showSociometricMap(e) {
  if (e) e.preventDefault();
  hideAllViews();
  document.getElementById('sociometricView').classList.remove('hidden');
  updateActiveNav(e?.target);
  initializeSociometricMap();
}

function showAnalytics(e) {
  if (e) e.preventDefault();
  hideAllViews();
  document.getElementById('analyticsView').classList.remove('hidden');
  updateActiveNav(e?.target);
  initializeAnalytics();
}

function showReports(e) {
  if (e) e.preventDefault();
  hideAllViews();
  document.getElementById('reportsView').classList.remove('hidden');
  updateActiveNav(e?.target);
}

function hideAllViews() {
  document.querySelectorAll('.specialist-view').forEach(view => {
    view.classList.add('hidden');
  });
}

function updateActiveNav(target) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  if (target) {
    const navItem = target.closest('.nav-item');
    if (navItem) navItem.classList.add('active');
  }
}

// Load dashboard data
function loadDashboard() {
  const tbody = document.getElementById('casesTableBody');
  tbody.innerHTML = '';
  
  mockCases.forEach(caseData => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${caseData.date}</td>
      <td>${caseData.type}</td>
      <td>${caseData.grade}</td>
      <td><span class="severity-badge ${caseData.severity}">${getSeverityLabel(caseData.severity)}</span></td>
      <td><span class="status-badge ${caseData.status}">${getStatusLabel(caseData.status)}</span></td>
      <td>
        <div class="table-actions">
          <button onclick="viewCase(${caseData.id})">Ver</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function getSeverityLabel(severity) {
  const labels = {
    critical: 'Crítico',
    high: 'Alto',
    moderate: 'Moderado'
  };
  return labels[severity] || severity;
}

function getStatusLabel(status) {
  const labels = {
    new: 'Nuevo',
    inprogress: 'En Proceso',
    resolved: 'Resuelto'
  };
  return labels[status] || status;
}

function viewCase(caseId) {
  alert(`Viendo detalles del caso #${caseId}\n\nEsta funcionalidad mostraría un panel detallado con:\n- Información completa del reporte\n- Análisis dimensional\n- Score de riesgo\n- Recomendaciones IA`);
}

// Sociometric map
function initializeSociometricMap() {
  const canvas = document.getElementById('sociometricCanvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  
  drawSociometricNetwork(ctx, canvas.width, canvas.height);
}

function drawSociometricNetwork(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);
  
  // Draw edges first
  networkData.edges.forEach(edge => {
    const fromNode = networkData.nodes.find(n => n.id === edge.from);
    const toNode = networkData.nodes.find(n => n.id === edge.to);
    
    if (fromNode && toNode) {
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      
      // Style based on edge type
      if (edge.type === 'aggression') {
        ctx.strokeStyle = '#DC2626';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
      } else if (edge.type === 'friendship') {
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
      } else if (edge.type === 'witness') {
        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 2;
        ctx.setLineDash([2, 4]);
      } else if (edge.type === 'support') {
        ctx.strokeStyle = '#8B5CF6';
        ctx.lineWidth = 2;
        ctx.setLineDash([3, 3]);
      }
      
      ctx.stroke();
    }
  });
  
  // Draw nodes
  networkData.nodes.forEach(node => {
    const size = 8 + node.connections * 2;
    
    ctx.save();
    ctx.translate(node.x, node.y);
    
    // Draw shape based on type
    if (node.type === 'victim') {
      // Circle
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (node.type === 'aggressor') {
      // Triangle
      ctx.fillStyle = '#DC2626';
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.866, size * 0.5);
      ctx.lineTo(-size * 0.866, size * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#991B1B';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (node.type === 'witness') {
      // Square
      ctx.fillStyle = '#F59E0B';
      ctx.fillRect(-size, -size, size * 2, size * 2);
      ctx.strokeStyle = '#D97706';
      ctx.lineWidth = 2;
      ctx.strokeRect(-size, -size, size * 2, size * 2);
    } else if (node.type === 'leader') {
      // Star
      ctx.fillStyle = '#2563EB';
      drawStar(ctx, 0, 0, 5, size * 1.5, size * 0.7);
      ctx.fill();
      ctx.strokeStyle = '#1E40AF';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (node.type === 'mediator') {
      // Hexagon
      ctx.fillStyle = '#8B5CF6';
      drawHexagon(ctx, 0, 0, size);
      ctx.fill();
      ctx.strokeStyle = '#7C3AED';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    ctx.restore();
    
    // Draw label
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(node.name, node.x, node.y + size + 16);
  });
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = Math.PI / 2 * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;
  
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;
    
    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
}

function drawHexagon(ctx, cx, cy, size) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = cx + size * Math.cos(angle);
    const y = cy + size * Math.sin(angle);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
}

function updateSociometricMap() {
  initializeSociometricMap();
}

// Analytics charts
function initializeAnalytics() {
  // Cycles Chart
  const cyclesCtx = document.getElementById('cyclesChart');
  if (cyclesCtx && !cyclesCtx.chart) {
    cyclesCtx.chart = new Chart(cyclesCtx, {
      type: 'doughnut',
      data: {
        labels: ['Ciclos activos', 'Ciclos resueltos', 'Sin ciclos'],
        datasets: [{
          data: [2, 5, 18],
          backgroundColor: ['#DC2626', '#F59E0B', '#10B981']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
  
  // Roles Chart
  const rolesCtx = document.getElementById('rolesChart');
  if (rolesCtx && !rolesCtx.chart) {
    rolesCtx.chart = new Chart(rolesCtx, {
      type: 'bar',
      data: {
        labels: ['Instigadores', 'Ejecutores', 'Seguidores'],
        datasets: [{
          label: 'Cantidad',
          data: [3, 5, 8],
          backgroundColor: ['#DC2626', '#EF4444', '#F59E0B']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Digital Influence Chart
  const digitalCtx = document.getElementById('digitalChart');
  if (digitalCtx && !digitalCtx.chart) {
    digitalCtx.chart = new Chart(digitalCtx, {
      type: 'line',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
        datasets: [{
          label: 'Incidentes digitales',
          data: [2, 4, 3, 7, 5],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

// Report generation
function generateReport(type) {
  const reportNames = {
    individual: 'Reporte de Caso Individual',
    period: 'Análisis de Período',
    institution: 'Estadísticas de Institución',
    sociometric: 'Mapa Sociométrico',
    intervention: 'Plan de Intervención'
  };
  
  alert(`Generando: ${reportNames[type]}\n\nEl reporte estará disponible en formato PDF en unos momentos.`);
}

// Initialize on load
if (state.currentSession === 'landing') {
  // Landing page is shown by default
}