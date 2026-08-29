/**
 * Lawxy AI-Native Lawyer Certification Platform
 * Core Node.js HTTP Server & REST API
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// ============================================================================
// IN-MEMORY DATABASE & PRE-SEEDED DATA
// ============================================================================

const DB = {
  users: [
    {
      id: 'usr_001',
      name: 'Sarah Chen, Esq.',
      email: 'sarah.chen@lexispartner.com',
      organization: 'Chen & Morrison LLP',
      title: 'Senior Litigation Associate',
      role: 'learner',
      avatar: 'SC',
      createdAt: '2026-01-10T08:00:00Z'
    },
    {
      id: 'usr_002',
      name: 'Marcus Vance',
      email: 'marcus.vance@inhouse-counsel.com',
      organization: 'AeroTech Dynamics Inc.',
      title: 'Senior Legal Counsel',
      role: 'learner',
      avatar: 'MV',
      createdAt: '2026-02-01T10:00:00Z'
    },
    {
      id: 'usr_admin',
      name: 'Director of Certification',
      email: 'evaluations@lawxyai.com',
      organization: 'Lawxy AI Institute',
      title: 'Chief Academic & Assessment Officer',
      role: 'admin',
      avatar: 'LX',
      createdAt: '2025-12-01T00:00:00Z'
    }
  ],

  courses: [
    {
      id: 'level-1',
      slug: 'level-1',
      title: 'Lawxy Certified AI-Native Lawyer — Level 1: Foundation',
      level: 1,
      code: 'AINL-L1',
      badge: 'Foundation',
      durationHours: 32,
      passingScore: 70,
      modulesCount: 12,
      lessonsCount: 55,
      description: 'Master the fundamental capabilities, prompt architectures, source verification methods, and professional ethics required to practice law with artificial intelligence.',
      longDescription: 'The Level 1 Certification establishes the rigorous baseline required for 21st-century AI-native legal practice. You will master the fundamentals of large language models, prompt engineering tailored for legal documents, reliable legal research, hallucination identification, rigorous source verification, and human-in-the-loop ethical oversight.',
      lawxyTools: ['JurisMind (Research)', 'Case Lens (Litigation)', 'Contract Review Studio (Transactions)', 'AgentFlow (Workflows)'],
      prerequisites: ['Juris Doctor or law degree / legal professional role'],
      modules: [
        {
          id: 'm1',
          code: 'L1-AIFUND',
          title: 'Module 1: AI Fundamentals for Legal Professionals',
          duration: '2.5 Hours',
          lessons: [
            { id: 'l1-1', title: '1.1 Generative AI in the Modern Legal Ecosystem', type: 'reading', duration: '25 min' },
            { id: 'l1-2', title: '1.2 Tokens, Context Windows, and Memory in Legal Context', type: 'video', duration: '30 min' },
            { id: 'l1-3', title: '1.3 Probabilistic Models in a Deterministic Profession', type: 'interactive', duration: '40 min' },
            { id: 'l1-4', title: '1.4 Taxonomy of Legal AI Tools (Generic LLMs vs Specialized Legal Systems)', type: 'reading', duration: '25 min' },
            { id: 'l1-5', title: '1.5 Module 1 Assessment & Scenario Check', type: 'assessment', duration: '30 min' }
          ]
        },
        {
          id: 'm2',
          code: 'L1-LLM',
          title: 'Module 2: LLMs and How They Work in Legal Context',
          duration: '2 Hours',
          lessons: [
            { id: 'l2-1', title: '2.1 RAG Architecture in Legal Practice', type: 'reading', duration: '30 min' },
            { id: 'l2-2', title: '2.2 Semantic Vector Search vs Boolean Queries', type: 'interactive', duration: '35 min' },
            { id: 'l2-3', title: '2.3 Model Training, Fine-Tuning, and Privacy Boundaries', type: 'reading', duration: '25 min' },
            { id: 'l2-4', title: '2.4 Module 2 Practical Knowledge Check', type: 'assessment', duration: '30 min' }
          ]
        },
        {
          id: 'm3',
          code: 'L1-PROMPT',
          title: 'Module 3: Prompting for Legal Professionals',
          duration: '3 Hours',
          lessons: [
            { id: 'l3-1', title: '3.1 The 5-Pillar Legal Prompt Architecture', type: 'reading', duration: '30 min' },
            { id: 'l3-2', title: '3.2 Chain-of-Thought (CoT) and Step-by-Step Legal Reasoning', type: 'interactive', duration: '40 min' },
            { id: 'l3-3', title: '3.3 Negative Constraints & Defensive Prompting', type: 'video', duration: '30 min' },
            { id: 'l3-4', title: '3.4 Few-Shot Examples for Strict Format Adherence', type: 'interactive', duration: '40 min' },
            { id: 'l3-5', title: '3.5 Prompt Engineering Practical Laboratory', type: 'exercise', duration: '40 min' }
          ]
        },
        {
          id: 'm4',
          code: 'L1-RESEARCH',
          title: 'Module 4: Legal Research with AI (Lawxy JurisMind & Beyond)',
          duration: '3.5 Hours',
          lessons: [
            { id: 'l4-1', title: '4.1 AI-Assisted Issue Spotting & Fact-Pattern Analysis', type: 'reading', duration: '30 min' },
            { id: 'l4-2', title: '4.2 Synthesizing Multi-Jurisdictional Case Law', type: 'interactive', duration: '45 min' },
            { id: 'l4-3', title: '4.3 Practical Research with Lawxy JurisMind', type: 'video', duration: '35 min' },
            { id: 'l4-4', title: '4.4 Statutory & Administrative Code Deep-Dives', type: 'reading', duration: '30 min' },
            { id: 'l4-5', title: '4.5 Drafting & Auditing the AI Research Memo', type: 'interactive', duration: '40 min' },
            { id: 'l4-6', title: '4.6 Module 4 Assessment: Real-World Research Sprint', type: 'assessment', duration: '30 min' }
          ]
        },
        {
          id: 'm5',
          code: 'L1-DRAFT',
          title: 'Module 5: AI-Assisted Legal Drafting & Summarization',
          duration: '3 Hours',
          lessons: [
            { id: 'l5-1', title: '5.1 Principles of AI-Native Legal Drafting', type: 'reading', duration: '30 min' },
            { id: 'l5-2', title: '5.2 Drafting Complaints, Answers, and Standard Motions', type: 'interactive', duration: '40 min' },
            { id: 'l5-3', title: '5.3 Multi-Level Document Summarization', type: 'video', duration: '30 min' },
            { id: 'l5-4', title: '5.4 Automated Consistency & Cross-Reference Verification', type: 'interactive', duration: '40 min' },
            { id: 'l5-5', title: '5.5 Module 5 Drafting Assessment', type: 'assessment', duration: '40 min' }
          ]
        },
        {
          id: 'm6',
          code: 'L1-CONTRACT',
          title: 'Module 6: Contract Analysis & Risk Identification with AI',
          duration: '3 Hours',
          lessons: [
            { id: 'l6-1', title: '6.1 Contract Triage and Clause Categorization', type: 'reading', duration: '30 min' },
            { id: 'l6-2', title: '6.2 Playbook Comparison & Automated Redlining', type: 'interactive', duration: '45 min' },
            { id: 'l6-3', title: '6.3 Practical Review in Lawxy Contract Review Studio', type: 'video', duration: '35 min' },
            { id: 'l6-4', title: '6.4 Spotting Ambiguity, Vague Standards, and Traps', type: 'reading', duration: '30 min' },
            { id: 'l6-5', title: '6.5 Module 6 Practical Contract Audit Assessment', type: 'assessment', duration: '40 min' }
          ]
        },
        {
          id: 'm7',
          code: 'L1-CASEDD',
          title: 'Module 7: Case Analysis & Due Diligence (Lawxy Case Lens)',
          duration: '3 Hours',
          lessons: [
            { id: 'l7-1', title: '7.1 Timeline Construction & Fact Matrix Assembly', type: 'reading', duration: '30 min' },
            { id: 'l7-2', title: '7.2 Detecting Inconsistencies in Deposition Transcripts', type: 'interactive', duration: '45 min' },
            { id: 'l7-3', title: '7.3 Scaled Due Diligence in M&A Transactions', type: 'video', duration: '35 min' },
            { id: 'l7-4', title: '7.4 Quality Control & Verification in High-Volume Discovery', type: 'reading', duration: '30 min' },
            { id: 'l7-5', title: '7.5 Module 7 Case Analysis Assessment', type: 'assessment', duration: '40 min' }
          ]
        },
        {
          id: 'm8',
          code: 'L1-WORKFLOW',
          title: 'Module 8: AI Workflows for Legal Practice (Lawxy AgentFlow)',
          duration: '2.5 Hours',
          lessons: [
            { id: 'l8-1', title: '8.1 Deconstructing Complex Legal Work into Modular Steps', type: 'reading', duration: '30 min' },
            { id: 'l8-2', title: '8.2 Designing Mandatory Human Review Checkpoints', type: 'video', duration: '30 min' },
            { id: 'l8-3', title: '8.3 Building Workflows with Lawxy AgentFlow', type: 'interactive', duration: '45 min' },
            { id: 'l8-4', title: '8.4 Module 8 Workflow Design Assessment', type: 'assessment', duration: '45 min' }
          ]
        },
        {
          id: 'm9',
          code: 'L1-VERIFY',
          title: 'Module 9: Hallucinations, Verification & Source Validation (CRITICAL)',
          duration: '3 Hours',
          isCritical: true,
          lessons: [
            { id: 'l9-1', title: '9.1 Anatomy of a Legal Hallucination: Why LLMs Invent Cases', type: 'reading', duration: '35 min' },
            { id: 'l9-2', title: '9.2 The Lawxy 4-Step Verification Protocol (AVP)', type: 'interactive', duration: '45 min' },
            { id: 'l9-3', title: '9.3 Subtle Distortions: Real Cases with Invented Holdings', type: 'video', duration: '30 min' },
            { id: 'l9-4', title: '9.4 Standardized Verification Checklists for Law Firms', type: 'reading', duration: '30 min' },
            { id: 'l9-5', title: '9.5 Module 9 High-Stakes Verification Assessment', type: 'assessment', duration: '40 min' }
          ]
        },
        {
          id: 'm10',
          code: 'L1-CONFID',
          title: 'Module 10: Confidentiality, Privacy & Data Security (CRITICAL)',
          duration: '2 Hours',
          isCritical: true,
          lessons: [
            { id: 'l10-1', title: '10.1 Privilege Waiver & Third-Party Disclosure Doctrine', type: 'reading', duration: '30 min' },
            { id: 'l10-2', title: '10.2 Vendor Due Diligence & Security Architecture', type: 'interactive', duration: '30 min' },
            { id: 'l10-3', title: '10.3 Pre-Inference PII Redaction & Data Sanitization', type: 'video', duration: '30 min' },
            { id: 'l10-4', title: '10.4 Module 10 Security & Confidentiality Assessment', type: 'assessment', duration: '30 min' }
          ]
        },
        {
          id: 'm11',
          code: 'L1-ETHICS',
          title: 'Module 11: Professional Responsibility, Ethics & Human Oversight (CRITICAL)',
          duration: '2.5 Hours',
          isCritical: true,
          lessons: [
            { id: 'l11-1', title: '11.1 ABA Model Rules 1.1, 1.6, and 5.3 in the AI Era', type: 'reading', duration: '30 min' },
            { id: 'l11-2', title: '11.2 Judicial Standing Orders & Mandatory AI Disclosures', type: 'reading', duration: '30 min' },
            { id: 'l11-3', title: '11.3 Ethical Billing, Efficiency Dividends, and Alternative Fee Arrangements', type: 'video', duration: '30 min' },
            { id: 'l11-4', title: '11.4 Algorithmic Bias, Sentencing Models, and Fairness', type: 'interactive', duration: '30 min' },
            { id: 'l11-5', title: '11.5 Module 11 Ethics & Professional Responsibility Assessment', type: 'assessment', duration: '30 min' }
          ]
        },
        {
          id: 'capstone',
          code: 'L1-CAPSTONE',
          title: 'Capstone: End-to-End AI-Assisted Legal Matter',
          duration: '4 Hours',
          isCritical: true,
          lessons: [
            { id: 'capstone-1', title: 'Level 1 Capstone: Apex Tech vs. Meridian Logistics Matter', type: 'exercise', duration: '240 min' }
          ]
        }
      ]
    },
    {
      id: 'level-2',
      slug: 'level-2',
      title: 'Lawxy Certified AI-Native Lawyer — Level 2: Advanced Practice',
      level: 2,
      code: 'AINL-L2',
      badge: 'Advanced',
      durationHours: 45,
      passingScore: 75,
      modulesCount: 11,
      lessonsCount: 52,
      description: 'Advanced mastery for partners, general counsel, and legal innovators: complex multi-agent workflows, custom RAG pipelines, litigation analytics, and institutional AI governance.',
      longDescription: 'Level 2 is designed for practitioners who have mastered foundational AI tools and are ready to lead institutional legal transformation. This curriculum focuses on multi-agent legal reasoning, specialized litigation support, advanced transactional diligence, proprietary legal knowledge graph integration, automated compliance engines, and legal team governance.',
      lawxyTools: ['JurisMind Enterprise', 'Case Lens Pro', 'Contract Studio API', 'AgentFlow Studio'],
      prerequisites: ['Level 1 Certified Credential (Earned)']
    }
  ],

  competencies: [
    { code: 'L1-AIFUND', name: 'AI Fundamentals for Legal', category: 'Knowledge', weight: 20, minScore: 50, critical: false },
    { code: 'L1-PROMPT', name: 'Legal Prompting & Engineering', category: 'AI Application', weight: 20, minScore: 50, critical: false },
    { code: 'L1-WORKFLOW', name: 'Legal Workflows & Orchestration', category: 'Legal Workflows', weight: 15, minScore: 50, critical: false },
    { code: 'L1-VERIFY', name: 'Hallucination & Authority Verification', category: 'Verification', weight: 15, minScore: 60, critical: true },
    { code: 'L1-CONFID', name: 'Confidentiality, Privacy & Security', category: 'Ethics & Compliance', weight: 15, minScore: 60, critical: true },
    { code: 'L1-ETHICS', name: 'Professional Ethics & Oversight', category: 'Ethics & Compliance', weight: 15, minScore: 60, critical: true },
    { code: 'L1-CAPSTONE', name: 'Practical Capstone Matter', category: 'Practical Simulation', weight: 15, minScore: 60, critical: true }
  ],

  credentials: [
    {
      credentialId: 'LXY-AINL-2026-000184',
      holderName: 'Sarah Chen, Esq.',
      email: 'sarah.chen@lexispartner.com',
      certificationCode: 'LXY-FND',
      title: 'Lawxy Legal AI Fundamentals',
      level: 1,
      status: 'active',
      issuedAt: '2026-03-15T12:00:00Z',
      expiresAt: '2028-03-15T12:00:00Z',
      scorePercentage: 94.2,
      skills: ['Prompt Architecture', 'Authority Verification', 'ABA Rule 1.6 Privilege Preservation', 'Lawxy JurisMind Research'],
      verificationUrl: '/verify/LXY-AINL-2026-000184',
      pdfDownloadUrl: '/api/certificate/LXY-AINL-2026-000184.svg'
    },
    {
      credentialId: 'LXY-FND-2026-000184',
      holderName: 'Sarah Chen, Esq.',
      email: 'sarah.chen@lexispartner.com',
      certificationCode: 'LXY-FND',
      title: 'Lawxy Legal AI Fundamentals',
      level: 1,
      status: 'active',
      issuedAt: '2026-01-28T10:00:00Z',
      expiresAt: '2028-01-28T10:00:00Z',
      scorePercentage: 94.2,
      skills: ['Prompt Architecture', 'Authority Verification', 'ABA Rule 1.6 Privilege Preservation', 'Lawxy JurisMind Research'],
      verificationUrl: '/verify/LXY-FND-2026-000184',
      pdfDownloadUrl: '/api/certificate/LXY-FND-2026-000184.svg'
    },
    {
      credentialId: 'LXY-ADV-2026-000219',
      holderName: 'Marcus Vance, Esq.',
      email: 'marcus.vance@inhouse-counsel.com',
      certificationCode: 'LXY-ADV',
      title: 'Advanced Legal AI Practitioner',
      level: 2,
      status: 'active',
      issuedAt: '2026-02-10T14:30:00Z',
      expiresAt: '2028-02-10T14:30:00Z',
      scorePercentage: 91.5,
      skills: ['Case Strategy Creation', 'Multi-Doc Analysis', 'M&A Due Diligence', 'Cross-Border Translation'],
      verificationUrl: '/verify/LXY-ADV-2026-000219',
      pdfDownloadUrl: '/api/certificate/LXY-ADV-2026-000219.svg'
    },
    {
      credentialId: 'LXY-CRS-2026-000305',
      holderName: 'Elena Rostova, Esq.',
      email: 'elena.rostova@lexglobal.com',
      certificationCode: 'LXY-CRS',
      title: 'AI Contract Review Specialist',
      level: 3,
      status: 'active',
      issuedAt: '2026-02-18T09:15:00Z',
      expiresAt: '2028-02-18T09:15:00Z',
      scorePercentage: 96.0,
      skills: ['Structured Contract Review', 'Playbook Enforcement', 'AI Redlining', 'Negotiation Support'],
      verificationUrl: '/verify/LXY-CRS-2026-000305',
      pdfDownloadUrl: '/api/certificate/LXY-CRS-2026-000305.svg',
      auditHash: 'a7f920bc881d4590ef491024bd38910e194857201cba68294719e09d123851aa'
    }
  ],

  attempts: [],
  evaluatorQueue: []
};

// ============================================================================
// HELPER UTILITIES
// ============================================================================

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function sendSvg(res, svgContent) {
  res.writeHead(200, {
    'Content-Type': 'image/svg+xml',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=86400'
  });
  res.end(svgContent);
}

function generateCredentialId(level = 1) {
  const year = new Date().getFullYear();
  const certCode = level === 2 ? 'AINL2' : 'AINL';
  const randomSeq = String(Math.floor(100000 + Math.random() * 900000));
  return `LXY-${certCode}-${year}-${randomSeq}`;
}

function generateCertificateSvg(cred) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="100%" height="100%">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&amp;family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&amp;family=Fragment+Mono&amp;display=swap');
      .serif-title { font-family: 'Libre Caslon Text', Georgia, serif; }
      .sans-text { font-family: 'DM Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
      .mono-text { font-family: 'Fragment Mono', monospace; }
    </style>
    <!-- Embossed Seal Radial Gradient -->
    <radialGradient id="silverSeal" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="30%" stop-color="#e8e8e7"/>
      <stop offset="70%" stop-color="#cfd0cf"/>
      <stop offset="100%" stop-color="#a8a9a8"/>
    </radialGradient>
    <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="rgba(0,0,0,0.12)"/>
    </filter>
    <pattern id="framePattern" width="16" height="16" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="16" height="16" fill="none"/>
      <circle cx="8" cy="8" r="1.5" fill="#d1d5db"/>
    </pattern>
  </defs>

  <!-- Certificate Canvas Background -->
  <rect width="1000" height="700" fill="#fbfbfa"/>

  <!-- Engraved Security Border Frame -->
  <rect x="36" y="36" width="928" height="628" fill="none" stroke="#e5e7eb" stroke-width="2"/>
  <rect x="44" y="44" width="912" height="612" fill="url(#framePattern)" opacity="0.75"/>
  <rect x="52" y="52" width="896" height="596" fill="#ffffff" stroke="#e5e7eb" stroke-width="1"/>

  <!-- Top Left: Brand Wordmark -->
  <g transform="translate(90, 110)">
    <text class="sans-text" x="0" y="0" font-size="22" font-weight="500" fill="#111827" letter-spacing="-0.02em">Lawxy<tspan font-weight="800">Academy</tspan></text>
  </g>

  <!-- Top Right: Certificate of Completion -->
  <g transform="translate(910, 110)">
    <text class="sans-text" x="0" y="0" font-size="13" font-weight="500" fill="#4b5563" text-anchor="end">Certificate of Completion</text>
  </g>

  <!-- Center Content -->
  <!-- Candidate Name -->
  <text class="serif-title" x="500" y="270" font-size="38" font-weight="400" fill="#111827" text-anchor="middle">${cred.holderName}</text>
  
  <!-- Subtitle -->
  <text class="sans-text" x="500" y="320" font-size="15" font-weight="400" fill="#6b7280" text-anchor="middle">has completed</text>

  <!-- Course / Certification Title -->
  <text class="serif-title" x="500" y="375" font-size="30" font-weight="700" fill="#111827" text-anchor="middle">${cred.title}</text>

  <!-- Bottom Left: Metadata Block -->
  <g transform="translate(90, 520)" class="sans-text">
    <text x="0" y="0" font-size="12.5" fill="#4b5563">Issued: ${new Date(cred.issuedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</text>
    <text x="0" y="20" font-size="12.5" fill="#4b5563">Certificate No: <tspan class="mono-text" font-weight="600" fill="#111827">${cred.credentialId}</tspan></text>
    <text x="0" y="40" font-size="12.5" fill="#4b5563">View: https://verify.lawxyai.com/c/${cred.credentialId}</text>
  </g>

  <!-- Bottom Right: Embossed Lawxy Medal Seal -->
  <g transform="translate(780, 520)" filter="url(#sealShadow)">
    <!-- Outer Guilloche Cog/Engraved Rim -->
    <circle cx="0" cy="0" r="54" fill="url(#silverSeal)"/>
    <circle cx="0" cy="0" r="50" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.8"/>
    <circle cx="0" cy="0" r="46" fill="none" stroke="#9ca3af" stroke-width="1" stroke-dasharray="2,2"/>
    <circle cx="0" cy="0" r="42" fill="url(#silverSeal)"/>
    <!-- Embossed Letter L -->
    <text class="serif-title" x="0" y="24" font-size="64" font-weight="700" fill="#9ca3af" text-anchor="middle" opacity="0.45">L</text>
    <text class="serif-title" x="-1" y="23" font-size="64" font-weight="700" fill="#ffffff" text-anchor="middle" opacity="0.9">L</text>
    <text class="serif-title" x="0" y="22" font-size="64" font-weight="700" fill="#6b7280" text-anchor="middle" opacity="0.75">L</text>
  </g>
</svg>`;
}

// ============================================================================
// HTTP SERVER ROUTER
// ============================================================================

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  try {
    // ------------------------------------------------------------------------
    // REST API ROUTES
    // ------------------------------------------------------------------------

    // GET /api/courses
    if (method === 'GET' && pathname === '/api/courses') {
      return sendJson(res, 200, { courses: DB.courses });
    }

    // GET /api/courses/:slug
    if (method === 'GET' && pathname.startsWith('/api/courses/')) {
      const slug = pathname.replace('/api/courses/', '');
      const course = DB.courses.find(c => c.slug === slug || c.id === slug);
      if (!course) return sendJson(res, 404, { error: 'Course not found' });
      return sendJson(res, 200, { course });
    }

    // GET /api/competencies
    if (method === 'GET' && pathname === '/api/competencies') {
      return sendJson(res, 200, { competencies: DB.competencies });
    }

    // GET /api/verify/:credentialId
    if (method === 'GET' && pathname.startsWith('/api/verify/')) {
      const credId = pathname.replace('/api/verify/', '').toUpperCase();
      const cred = DB.credentials.find(c => c.credentialId.toUpperCase() === credId);
      if (!cred) {
        return sendJson(res, 404, { error: 'Credential not found', searchedId: credId });
      }
      return sendJson(res, 200, { credential: cred });
    }

    // GET /api/certificate/:credentialId.svg
    if (method === 'GET' && pathname.startsWith('/api/certificate/')) {
      const credId = pathname.replace('/api/certificate/', '').replace('.svg', '').toUpperCase();
      const cred = DB.credentials.find(c => c.credentialId.toUpperCase() === credId);
      if (!cred) {
        return sendJson(res, 404, { error: 'Credential not found' });
      }
      const svg = generateCertificateSvg(cred);
      return sendSvg(res, svg);
    }

    // POST /api/exam/start
    if (method === 'POST' && pathname === '/api/exam/start') {
      const body = await parseJsonBody(req);
      const attemptId = 'att_' + crypto.randomBytes(6).toString('hex');
      const newAttempt = {
        attemptId,
        userId: body.userId || 'usr_001',
        courseId: body.courseId || 'level-1',
        startedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 120 * 60 * 1000).toISOString(),
        status: 'in_progress',
        answers: {},
        tabSwitchCount: 0,
        flags: []
      };
      DB.attempts.push(newAttempt);
      return sendJson(res, 201, { attempt: newAttempt });
    }

    // POST /api/exam/save
    if (method === 'POST' && pathname === '/api/exam/save') {
      const body = await parseJsonBody(req);
      const attempt = DB.attempts.find(a => a.attemptId === body.attemptId);
      if (attempt) {
        attempt.answers = { ...attempt.answers, ...(body.answers || {}) };
        if (body.tabSwitched) attempt.tabSwitchCount = (attempt.tabSwitchCount || 0) + 1;
      }
      return sendJson(res, 200, { success: true, savedAt: new Date().toISOString() });
    }

    // POST /api/exam/submit
    if (method === 'POST' && pathname === '/api/exam/submit') {
      const body = await parseJsonBody(req);
      const answers = body.answers || {};

      // Scoring Evaluation
      let mcqScore = 0;
      let totalMcq = 5;
      if (answers['q1'] === 1) mcqScore++;
      if (answers['q2'] === 2) mcqScore++;
      if (answers['q3'] === 1) mcqScore++;
      if (answers['q4'] === 1) mcqScore++;
      if (answers['q5'] === 1) mcqScore++;

      const mcqPercentage = (mcqScore / totalMcq) * 100;
      
      // Auto-evaluate written scenario length and presence
      const hasScenario = (answers['q6'] || '').length > 50;
      const hasVerify = (answers['q8'] || '').length > 50;
      const hasPractical = (answers['q10'] || '').length > 50;

      // Realistic composite scoring
      const verificationScore = hasVerify ? 85 : 40;
      const ethicsScore = (mcqPercentage >= 60) ? 90 : 55;
      const practicalScore = hasPractical ? 88 : 45;
      const overallScore = Math.round((mcqPercentage * 0.3) + (verificationScore * 0.25) + (ethicsScore * 0.2) + (practicalScore * 0.25));

      // Critical auto-fail checks:
      const passed = overallScore >= 70 && verificationScore >= 60 && ethicsScore >= 60 && practicalScore >= 60;

      let credential = null;
      if (passed) {
        const newCredId = generateCredentialId(1);
        credential = {
          credentialId: newCredId,
          holderName: body.holderName || 'Sarah Chen, Esq.',
          email: body.email || 'sarah.chen@lexispartner.com',
          certificationCode: 'AINL-L1',
          title: 'Lawxy Certified AI-Native Lawyer',
          level: 1,
          status: 'active',
          issuedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toISOString(),
          scorePercentage: overallScore,
          skills: [
            'AI Fundamentals for Legal Practice',
            'Defensive Legal Prompt Engineering',
            'AI-Assisted Legal Research (JurisMind)',
            'Contract Analysis & Playbook Redlining',
            '4-Step Authority Verification Protocol (AVP)',
            'Hallucination Detection & Citation Auditing',
            'Confidentiality & Attorney-Client Privilege Protection',
            'ABA Model Rules 1.1 / 1.6 / 5.3 Compliance',
            'Human-In-The-Loop Quality Control'
          ],
          specializations: [],
          verificationUrl: `/verify/${newCredId}`,
          auditHash: crypto.createHash('sha256').update(newCredId + Date.now()).digest('hex')
        };
        DB.credentials.unshift(credential);
      }

      return sendJson(res, 200, {
        submittedAt: new Date().toISOString(),
        overallScore,
        passed,
        mcqScore: `${mcqScore}/${totalMcq}`,
        competencyScores: {
          knowledge: mcqPercentage,
          verification: verificationScore,
          ethics: ethicsScore,
          practical: practicalScore
        },
        credential
      });
    }

    // GET /api/admin/overview
    if (method === 'GET' && pathname === '/api/admin/overview') {
      return sendJson(res, 200, {
        kpis: {
          totalLearners: 1420,
          activeEnrollments: 980,
          certifiedLawyers: DB.credentials.length + 184,
          passRatePercentage: 74.5,
          pendingEvaluations: 7
        },
        recentCredentials: DB.credentials.slice(0, 10),
        competencyMetrics: [
          { name: 'Authority Verification (AVP)', avgScore: 78.4, criticalFailRate: '4.2%' },
          { name: 'Privilege & Confidentiality', avgScore: 84.1, criticalFailRate: '2.1%' },
          { name: 'Legal Prompt Engineering', avgScore: 89.6, criticalFailRate: '0.5%' },
          { name: 'Contract Playbook Analysis', avgScore: 82.3, criticalFailRate: '1.8%' }
        ]
      });
    }

    // POST /api/admin/credential-action
    if (method === 'POST' && pathname === '/api/admin/credential-action') {
      const body = await parseJsonBody(req);
      const cred = DB.credentials.find(c => c.credentialId === body.credentialId);
      if (!cred) return sendJson(res, 404, { error: 'Credential not found' });
      cred.status = body.action; // 'active' | 'suspended' | 'revoked' | 'renewed'
      if (body.action === 'renewed') {
        cred.expiresAt = new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toISOString();
      }
      return sendJson(res, 200, { success: true, credential: cred });
    }

    // ------------------------------------------------------------------------
    // STATIC FILE SERVING (Single Page Application fallback)
    // ------------------------------------------------------------------------

    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);

    // If file does not exist, fallback to index.html for SPA client-side routing
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    switch (extname) {
      case '.js': contentType = 'text/javascript'; break;
      case '.css': contentType = 'text/css'; break;
      case '.json': contentType = 'application/json'; break;
      case '.png': contentType = 'image/png'; break;
      case '.jpg': contentType = 'image/jpeg'; break;
      case '.svg': contentType = 'image/svg+xml'; break;
      case '.woff2': contentType = 'font/woff2'; break;
      case '.mp4': contentType = 'video/mp4'; break;
      case '.webm': contentType = 'video/webm'; break;
    }

    // Video Streaming with HTTP 206 Range Request Support
    if (extname === '.mp4' || extname === '.webm') {
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*'
        };
        res.writeHead(206, head);
        file.pipe(res);
        return;
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes',
          'Access-Control-Allow-Origin': '*'
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
        return;
      }
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      } else {
        res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
        res.end(content, 'utf-8');
      }
    });

  } catch (error) {
    console.error('Unhandled server error:', error);
    sendJson(res, 500, { error: 'Internal Server Error', message: error.message });
  }
});

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🏛️ Lawxy AI-Native Lawyer Certification Platform Ready`);
  console.log(`🌐 Server running at: http://localhost:${PORT}`);
  console.log(`📚 Public verification endpoint: http://localhost:${PORT}/verify/LXY-AINL-2026-000184`);
  console.log(`=======================================================`);
});
