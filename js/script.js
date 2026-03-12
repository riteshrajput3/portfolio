const text=[
"Cybersecurity Enthusiast",
"Python Developer",
"Automation Builder"
]

let i=0
let j=0

function typing(){

if(i<text.length){

document.getElementById("typing").innerHTML=text[i].substring(0,j++)

if(j>text[i].length){

i++
j=0

}

}

setTimeout(typing,120)

}

typing()