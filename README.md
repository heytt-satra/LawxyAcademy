# LawxyAcademy

> **Level Up Your Practice** — Official Lawxy AI-Native Lawyer Certification Platform.
> 
> *Education is free. Certification is earned.*

---

## 🏛️ Overview

LawxyAcademy is a high-rigor, production-grade legal-technology education and certification platform. Designed with an editorial aesthetic inspired by Harvey Academy and built with Lawxy's custom brand identity (`#02212e` obsidian teal, `#80e5ff` laser cyan, `#d4af37` gold seal), it provides lawyers, corporate legal departments, litigation partners, and law students with:

- **Free Open Curriculum**: 12 comprehensive Level 1 modules and 11 Level 2 modules covering AI fundamentals, legal prompt engineering, RAG architecture, citation auditing, and ethical compliance (ABA Model Rules 1.1, 1.6, 5.3).
- **Interactive Masterclass Studio**: Live HTML5 canvas lecture visualizer, real-time waveform player, speed toggles, synchronized audio transcript with click-to-seek timestamp jumping, and interactive legal sub-word tokenizer sandbox.
- **Proctored Certification Assessment**: 120-minute timed exam with window-blur / tab-switching integrity monitoring and automatic evaluation enforcing the mandatory 60% minimum threshold on critical ethics and verification modules.
- **Public Credential Registry & Certificate Generation**: Instant zero-auth public verification at `/verify/[ID]` and dynamically generated vector SVG certificates with engraved guilloche borders, embossed seals, and SHA-256 cryptographic audit logs.
- **Faculty Command Center**: Real-time pass-rate telemetry and credential management tools.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/heytt-satra/LawxyAcademy.git
cd LawxyAcademy

# Start the server (zero external npm dependencies required)
node server.js
```

Open your browser and navigate to **[http://localhost:3000](http://localhost:3000)**.

---

## 📂 Project Architecture

```
LawxyAcademy/
├── public/
│   ├── css/
│   │   └── style.css            # Editorial design system, serif typography, 8px grid
│   ├── images/
│   │   ├── hero-sketch.jpg      # Architectural charcoal graphite legal team sketch
│   │   ├── card-foundations.jpg # Foundations module sketch
│   │   └── card-workflows.jpg   # Workflows module sketch
│   ├── js/
│   │   └── app.js               # State store, SPA router, canvas video player, tokenizer lab
│   └── index.html               # Semantic, accessible Harvey-style HTML structure
├── src/
│   └── data/
│       ├── courses.js           # 12-module Level 1 & 11-module Level 2 syllabus
│       └── questions.js         # Multi-format legal assessment question pool
├── server.js                    # Zero-dependency Node.js REST API & SVG certificate generator
├── package.json
└── README.md
```

---

## 📜 License & Copyright

© 2026 Lawxy AI Inc. All rights reserved. Built for the future of AI-native legal professionals.
