const chatWindow = document.getElementById("chat-window");
const chatInput = document.getElementById("chat-input");

const resumeKnowledge = {
  automation: "Ritesh engineered an <b>Intelligent Business Process Automation Suite</b> using n8n, Python, and OpenAI APIs. The system automates 8+ end-to-end workflows (such as lead processing, onboarding, and invoicing), reducing manual effort by <b>80%</b> and document processing review times by <b>65%</b> with 92%+ routing accuracy.",
  hackathon: "Ritesh won top ranks at back-to-back hackathons:<br>1. <b>GHR Hack 2.0 (2026) - 3rd Prize</b>: Zero-Trust biometric facial recognition MFA system.<br>2. <b>GHR Hack 1.0 (2025) - Runner-Up</b>: Ethereum Solidity student records ledger with a 35% reduction in blockchain gas execution costs.",
  internship: "Ritesh's professional background includes:<br><br>• <b>Electronics & Quality Engineer at Ecozen</b> (2026 - Present): Conducting Incoming Quality Control (IQC) component testing, PCB validations, defect analysis, and root cause audits (RCA/CAPA) in India.<br><br>• <b>Full Stack Developer Intern at STSARC</b> (Dec 2025 - Mar 2026): Engineered React interfaces and Node.js microservices, maintaining high API availability.",
  contact: "You can connect with Ritesh directly via:<br>📧 Email: <a href='mailto:rishirajput3924@gmail.com' style='color: var(--accent-primary); text-decoration: underline;'>rishirajput3924@gmail.com</a><br>📱 Phone: +91 8767887417<br>💼 LinkedIn: <a href='https://linkedin.com/in/ritesh-rajput39' target='_blank' style='color: var(--accent-primary); text-decoration: underline;'>/in/ritesh-rajput39</a><br>💻 GitHub: <a href='https://github.com/riteshrajput3' target='_blank' style='color: var(--accent-primary); text-decoration: underline;'>/riteshrajput3</a>",
  skills: "Ritesh's technical capabilities include:<br>• <b>Cybersecurity</b>: Zero-Trust, Web Security (OWASP Top 10), WebAuthn/FIDO2 protocols, SIEM threat dashboards, penetration checks.<br>• <b>AI & Automation</b>: n8n, OpenAI API integrations, Agentic AI, RAG pipelines.<br>• <b>Blockchain</b>: Solidity smart contracts, Web3.js, Hardhat testing environment, IPFS storage.<br>• <b>Full Stack</b>: Python (Flask, FastAPI), Javascript (React, Node.js), Docker, Git, CI/CD, SQL.",
  blockchain: "Ritesh built a <b>Decentralized Data Management System</b> using Solidity, Web3.js, and IPFS, providing a secure, tamper-proof student record registry. Optimized variables to cut execution gas fees by 35%, winning Runner-Up at GHR Hack 1.0 (2025).",
  mfa: "Ritesh's <b>Passwordless MFA System</b> is a Zero-Trust biometric face recognition portal mitigating credential-stuffing and phishing threats, featuring AES-256 local encrypted storage. Earning 3rd Prize at GHR Hack 2.0 (2026).",
  education: "Ritesh is pursuing a <b>B.Tech in Electronics and Telecommunication Engineering</b> at G.H. Raisoni College of Engineering and Management (CGPA: 7.69/10.0, expected graduation July 2026). He holds an Ethical Hacking certification from IIT Bombay and is active in TryHackMe rooms.",
  drone: "Ritesh served as <b>President of the GHCEM Drone Club</b> (2024 - 2025). He led a 25-member engineering team, managed budgeting and inventory for electronics, fabricated 3 autonomous drone prototypes, and taught hardware design to 100+ students.",
  jivan: "Ritesh worked as a <b>Freelance Full Stack Developer</b> to design, develop, and launch <b><a href='https://jivangaming.in' target='_blank' style='color: var(--accent-primary); text-decoration: underline;'>jivangaming.in</a></b>. He built the platform using React, Node.js, and PHP, optimized MySQL database queries, and integrated secure payment processing."
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
  let reply = "I can share details about Ritesh's background. Try asking me about his 'n8n project', 'jivangaming.in', 'hackathons', 'internship', 'technical skills', or click one of the suggestion chips below.";
  
  if (query.includes("n8n") || query.includes("automation") || query.includes("workflow") || query.includes("suite")) {
    reply = resumeKnowledge.automation;
  } else if (query.includes("jivan") || query.includes("gaming") || query.includes("jivangaming")) {
    reply = resumeKnowledge.jivan;
  } else if (query.includes("hackathon") || query.includes("ghr hack") || query.includes("prize") || query.includes("winner") || query.includes("award")) {
    reply = resumeKnowledge.hackathon;
  } else if (query.includes("intern") || query.includes("stsarc") || query.includes("experience") || query.includes("job") || query.includes("ecozen") || query.includes("quality")) {
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
