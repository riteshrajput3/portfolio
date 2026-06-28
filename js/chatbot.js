const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-input");

const resumeKnowledge = {
  automation: "Ritesh automated Incoming Quality Control (IQC) testing procedures with his <b>PCB Testing & Quality Automation</b> project using Python and MATLAB, reducing manual validation times by <b>80%</b>.",
  hackathon: "Ritesh won top ranks at back-to-back hackathons:<br>1. <b>GHR Hack 2.0 (2026) - 3rd Prize</b>: Zero-Trust biometric facial recognition MFA system.<br>2. <b>GHR Hack 1.0 (2025) - Runner-Up</b>: Ethereum Solidity student records ledger with a 35% reduction in blockchain gas execution costs.",
  internship: "Ritesh's professional background includes:<br><br>• <b>Electronics & Quality Engineer at Ecozen</b> (2026 - Present): Conducting Incoming Quality Control (IQC) component testing, PCB validations, defect analysis, and root cause audits (RCA/CAPA) in Pune, India.<br><br>• <b>Full Stack Developer Intern at STSARC</b> (Dec 2025 - Mar 2026): Engineered React interfaces and Node.js microservices, maintaining high API availability.",
  contact: "You can connect with Ritesh directly via:<br>📧 Email: <a href='mailto:rishirajput3924@gmail.com' style='color: var(--accent-primary); text-decoration: underline;'>rishirajput3924@gmail.com</a><br>📱 Phone: +91 8767887417<br>💼 LinkedIn: <a href='https://linkedin.com/in/ritesh-rajput39' target='_blank' style='color: var(--accent-primary); text-decoration: underline;'>/in/ritesh-rajput39</a><br>💻 GitHub: <a href='https://github.com/riteshrajput3' target='_blank' style='color: var(--accent-primary); text-decoration: underline;'>/riteshrajput3</a>",
  skills: "Ritesh's technical capabilities include:<br>• <b>Embedded Systems</b>: ESP32, STM32, Arduino, low-level drivers, SPI/I2C/UART, RTOS, PCB testing.<br>• <b>Cybersecurity</b>: Zero-Trust, WebAuthn/FIDO2, AES-256-GCM, Secure Firmware, SIEM threat logging.<br>• <b>AI & Automation</b>: OpenCV, YOLO models, TensorFlow, n8n workflow engine, RAG pipelines.<br>• <b>Full Stack</b>: Python (FastAPI), Javascript (React, Node.js), Docker, Git, CI/CD, SQL.",
  blockchain: "Ritesh built a <b>Decentralized Student Records Registry</b> using Solidity, Web3.js, and IPFS, providing a secure, tamper-proof student record ledger. Optimized variables to cut execution gas fees by 35%, winning Runner-Up at GHR Hack 1.0 (2025).",
  mfa: "Ritesh's <b>Zero-Trust Passwordless MFA System</b> is a phishing-resistant biometric face recognition portal mitigating credential-stuffing threats, featuring local OpenCV template matching and AES-256-GCM encryption. Earning 3rd Prize at GHR Hack 2.0 (2026).",
  education: "Ritesh is pursuing a <b>B.Tech in Electronics and Telecommunication Engineering</b> at G.H. Raisoni College of Engineering and Management (CGPA: 7.69/10.0, expected graduation July 2026). He holds an Ethical Hacking certification from IIT Bombay.",
  drone: "Ritesh engineered an <b>Autonomous Drone Detection System</b> combining OpenCV/YOLOv8 visual classification and RF spectrum scanning (under 45ms latency). He also served as the <b>President of GHCEM Drone Club</b> (2024 - 2025) leading a 25-member engineering team.",
  jivan: "Ritesh developed a high-throughput <b>Industrial IoT Telemetry Platform</b> reading multi-sensor matrices over MQTT. He also deployed the online gaming portal <b><a href='https://jivangaming.in' target='_blank' style='color: var(--accent-primary); text-decoration: underline;'>jivangaming.in</a></b> using React, Node.js, and PHP."
};

function addBubble(text, sender) {
  if (!chatWindow) return;
  
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = text;
  
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return bubble;
}

function showTypingIndicator() {
  if (!chatWindow) return;
  
  const bubble = document.createElement("div");
  bubble.className = "chat-bubble bot typing-indicator";
  bubble.innerHTML = `<span style="display:inline-block; font-style: italic;">Typing...</span>`;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return bubble;
}

function processBotReply(userMsg) {
  const query = userMsg.toLowerCase();
  let reply = "I can share details about Ritesh's background. Try asking me about his 'drone detection', 'pcb automation', 'passwordless mfa', 'iot telemetry', 'hackathons', 'skills', or click one of the suggestion chips below.";
  
  if (query.includes("drone") || query.includes("detection") || query.includes("aircraft") || query.includes("visual")) {
    reply = resumeKnowledge.drone;
  } else if (query.includes("pcb") || query.includes("automation") || query.includes("quality") || query.includes("incoming")) {
    reply = resumeKnowledge.automation;
  } else if (query.includes("jivan") || query.includes("telemetry") || query.includes("iot") || query.includes("mqtt") || query.includes("gaming")) {
    reply = resumeKnowledge.jivan;
  } else if (query.includes("hackathon") || query.includes("ghr hack") || query.includes("prize") || query.includes("winner") || query.includes("award")) {
    reply = resumeKnowledge.hackathon;
  } else if (query.includes("intern") || query.includes("stsarc") || query.includes("experience") || query.includes("job") || query.includes("ecozen")) {
    reply = resumeKnowledge.internship;
  } else if (query.includes("contact") || query.includes("email") || query.includes("phone") || query.includes("reach") || query.includes("call")) {
    reply = resumeKnowledge.contact;
  } else if (query.includes("skill") || query.includes("languages") || query.includes("tools") || query.includes("stack")) {
    reply = resumeKnowledge.skills;
  } else if (query.includes("blockchain") || query.includes("solidity") || query.includes("smart contract") || query.includes("web3")) {
    reply = resumeKnowledge.blockchain;
  } else if (query.includes("mfa") || query.includes("face") || query.includes("facial") || query.includes("biometric") || query.includes("passwordless")) {
    reply = resumeKnowledge.mfa;
  } else if (query.includes("education") || query.includes("college") || query.includes("degree") || query.includes("certification")) {
    reply = resumeKnowledge.education;
  } else if (query.includes("drone") || query.includes("president") || query.includes("club") || query.includes("leadership")) {
    reply = resumeKnowledge.drone;
  }
  
  return reply;
}

function sendMessage() {
  if (!chatInput) return;
  const text = chatInput.value.trim();
  if (text === "") return;
  
  // User bubble
  addBubble(text, "user");
  chatInput.value = "";
  
  // Typing indicator
  const indicator = showTypingIndicator();
  
  // Simulate delay
  setTimeout(() => {
    if (indicator) {
      indicator.remove();
    }
    const reply = processBotReply(text);
    addBubble(reply, "bot");
  }, 700);
}

function sendChipText(text) {
  addBubble(text, "user");
  const indicator = showTypingIndicator();
  setTimeout(() => {
    if (indicator) {
      indicator.remove();
    }
    const reply = processBotReply(text);
    addBubble(reply, "bot");
  }, 600);
}

// Allow Enter key to send message in chat
document.addEventListener("DOMContentLoaded", () => {
  if (chatInput) {
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }
});
