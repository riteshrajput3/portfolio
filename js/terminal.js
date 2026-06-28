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
      printLine("Ritesh Rajput - Electronics & Quality Engineer | Embedded Systems & Security Developer");
      printLine("Currently working as an Electronics & Quality Engineer at Ecozen.");
      printLine("Pursuing B.Tech in Electronics and Telecommunication at GHCEM (Expected July 2026).");
      printLine("Passionate about low-level hardware validation, edge AI, and zero-trust firmware security.");
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
      printLine("<span style='color: var(--accent-primary);'>Embedded:</span> C, C++, ESP32, STM32, Arduino, low-level bus specs, RTOS, PCB testing");
      printLine("<span style='color: var(--accent-primary);'>Cybersecurity:</span> Zero-Trust, WebAuthn/FIDO2, AES-256-GCM, Secure Firmware, SIEM logs");
      printLine("<span style='color: var(--accent-primary);'>AI & Automation:</span> OpenCV, YOLO models, TensorFlow, n8n, workflow scripting");
      printLine("<span style='color: var(--accent-primary);'>Software Eng:</span> Python (FastAPI), JavaScript (React, Node.js), Nginx, Docker, SQL");
      break;
      
    case "projects":
      printLine("<b>[Featured Projects]</b>");
      printLine("<span style='color: var(--accent-primary);'>1. Autonomous Drone Detection</span> - OpenCV/YOLOv8 and RF sensor fusion tracking unauthorized flights.");
      printLine("<span style='color: var(--accent-primary);'>2. PCB Quality Automation</span> - Automated test jigs and oscilloscope telemetry validating custom hardware.");
      printLine("<span style='color: var(--accent-primary);'>3. Zero-Trust Facial MFA</span> - Passwordless identity portal with local AES-256 encrypted verification.");
      printLine("<span style='color: var(--accent-primary);'>4. AI PCB Defect Classifier</span> - Real-time component quality check and classification via TensorFlow.");
      printLine("<span style='color: var(--accent-primary);'>5. Industrial IoT Telemetry</span> - High-speed MQTT acquisition pipeline monitoring sensor matrices.");
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