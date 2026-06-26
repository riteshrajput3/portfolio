const terminalElement = document.getElementById("terminal");
const cmdInput = document.getElementById("terminal-cmd");

const greetings = [
  "==============================================",
  "  WELCOME TO RITESH'S SECURITY CORE CONSOLE    ",
  "  Type 'help' to see the list of commands.    ",
  "==============================================",
  "Status: Active | Connection: Secure (TLS 1.3)"
];

function printLine(text, isPrompt = false, isError = false) {
  if (!terminalElement) return;
  
  const line = document.createElement("div");
  line.className = "terminal-line";
  
  if (isPrompt) {
    line.innerHTML = `<span class="terminal-prompt">ritesh@embedded-core:~$</span> ${text}`;
  } else if (isError) {
    line.innerHTML = `<span style="color: var(--accent-error);">${text}</span>`;
  } else {
    line.innerHTML = text;
  }
  
  terminalElement.appendChild(line);
  terminalElement.scrollTop = terminalElement.scrollHeight;
}

function initTerminal() {
  if (!terminalElement) return;
  terminalElement.innerHTML = '';
  greetings.forEach(line => printLine(line));
}

function processCommand(cmdText) {
  const cleanCmd = cmdText.trim();
  if (cleanCmd === "") return;
  
  printLine(cleanCmd, true);
  
  const cmd = cleanCmd.toLowerCase();
  
  switch(cmd) {
    case "help":
      printLine("Available commands:");
      printLine("  <span style='color: var(--accent-primary);'>whoami</span>     - Display profile overview");
      printLine("  <span style='color: var(--accent-primary);'>experience</span> - List professional work experience");
      printLine("  <span style='color: var(--accent-primary);'>skills</span>     - List core technical competencies");
      printLine("  <span style='color: var(--accent-primary);'>projects</span>   - Review featured engineering projects");
      printLine("  <span style='color: var(--accent-primary);'>education</span>  - Academic background & certifications");
      printLine("  <span style='color: var(--accent-primary);'>contact</span>    - Get communication coordinates");
      printLine("  <span style='color: var(--accent-primary);'>clear</span>      - Clear console screen");
      break;
      
    case "whoami":
      printLine("Ritesh Rajput - Electronics & Quality Engineer | Full Stack & Security Developer");
      printLine("Currently working as an Electronics & Quality Engineer at Ecozen.");
      printLine("Pursuing B.Tech in Electronics and Telecommunication at GHCEM (Expected July 2026).");
      printLine("Passionate about automating processes, developing embedded systems, and building secure software.");
      break;

    case "experience":
      printLine("<b>[Professional Experience]</b>");
      printLine("<span style='color: var(--accent-primary);'>1. Electronics & Quality Engineer at Ecozen (2026 - Present)</span>");
      printLine("   - Incoming Quality Control (IQC) & component specifications verification");
      printLine("   - Defect testing, circuit validation, and root cause analysis (RCA/CAPA)");
      printLine("<span style='color: var(--accent-primary);'>2. Full Stack Developer Intern at STSARC (Dec 2025 - Mar 2026)</span>");
      printLine("   - Engineered 15+ React components & Node.js microservices");
      printLine("   - Deployed high-availability REST APIs; optimized latency and CI/CD pipelines");
      printLine("<span style='color: var(--accent-primary);'>3. Freelance Full Stack Developer (2024 - 2025)</span>");
      printLine("   - Designed and launched online gaming portal and shop (jivangaming.in)");
      printLine("   - Developed databases, secure user auth, and payment integrations");
      break;
      
    case "skills":
      printLine("<b>[Technical Skills]</b>");
      printLine("<span style='color: var(--accent-primary);'>Cybersecurity:</span> Zero-Trust Architecture, OWASP Web Security, FIDO2/WebAuthn, SIEM, Pen Testing");
      printLine("<span style='color: var(--accent-primary);'>AI & Automation:</span> n8n workflows, Agentic AI, OpenAI API integrations, LLM RAG pipelines");
      printLine("<span style='color: var(--accent-primary);'>Blockchain:</span> Solidity smart contracts, Web3.js, Hardhat testing environment, IPFS");
      printLine("<span style='color: var(--accent-primary);'>Full Stack:</span> Python (FastAPI/Flask), Javascript (React, Node.js), Docker, Git, CI/CD, MySQL");
      printLine("<span style='color: var(--accent-primary);'>Embedded:</span> C, C++, ESP32, Arduino, STM32, PCB Testing, MATLAB");
      break;
      
    case "projects":
      printLine("<b>[Featured Projects]</b>");
      printLine("<span style='color: var(--accent-primary);'>1. Intelligent Automation Suite</span> - n8n and OpenAI integration reducing operational efforts by 80%.");
      printLine("<span style='color: var(--accent-primary);'>2. Cybersecurity AI Workflows</span> - Automated threat triage pipelines reducing MTTR by 70%.");
      printLine("<span style='color: var(--accent-primary);'>3. Passwordless MFA</span> - Zero-Trust facial biometrics with Flask & OpenCV (3rd Prize, GHR Hack 2.0).");
      printLine("<span style='color: var(--accent-primary);'>4. Decentralized Records Ledger</span> - Immutable Solidity data ledger (Runner-Up, GHR Hack 1.0).");
      printLine("<span style='color: var(--accent-primary);'>5. Jivan Gaming (jivangaming.in)</span> - Custom freelance gaming community portal & payment gateways.");
      break;
      
    case "education":
      printLine("<b>[Academic Profile]</b>");
      printLine("G.H. Raisoni College of Engineering and Management (B.Tech in ETX, CGPA: 7.69/10.0)");
      printLine("<b>[Certifications]</b>");
      printLine(" - Ethical Hacking (IIT Bombay)");
      printLine(" - Advent of Cyber (TryHackMe)");
      printLine(" - C++ and Web Development Certifications");
      break;
      
    case "contact":
      printLine("<b>[Contact Details]</b>");
      printLine("Email:    <a href='mailto:rishirajput3924@gmail.com' style='color: var(--accent-secondary);'>rishirajput3924@gmail.com</a>");
      printLine("Phone:    +91 8767887417");
      printLine("LinkedIn: <a href='https://linkedin.com/in/ritesh-rajput39' target='_blank' style='color: var(--accent-secondary);'>/in/ritesh-rajput39</a>");
      printLine("GitHub:   <a href='https://github.com/riteshrajput3' target='_blank' style='color: var(--accent-secondary);'>/riteshrajput3</a>");
      break;
      
    case "clear":
      if (terminalElement) {
        terminalElement.innerHTML = '';
      }
      break;
      
    default:
      printLine(`shell: command not found: ${cleanCmd}. Type 'help' for options.`, false, true);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initTerminal();
  
  if (cmdInput) {
    cmdInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = cmdInput.value;
        processCommand(val);
        cmdInput.value = "";
      }
    });
  }
});