const lines=[
"$ whoami",
"Ritesh Rajput",
"$ skills",
"Python | Cybersecurity | Automation",
"$ current_focus",
"Building secure systems"
]

let index=0

function terminal(){

if(index<lines.length){

document.getElementById("terminal").innerHTML+=lines[index]+"<br>"
index++

}

setTimeout(terminal,700)

}

terminal()