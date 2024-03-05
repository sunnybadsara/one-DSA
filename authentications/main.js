
const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer");
const streak = document.querySelector('.streak')
let navuser = document.querySelector('.username');
let count = JSON.parse(localStorage.getItem("streak"));
let link = "";

async function fetchAndShowRandomQuestion() {
    const response = await fetch('dsa.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1); // Skip the header row

    const randomIndex = Math.floor(Math.random() * rows.length);
    let currentQuestion = rows[randomIndex].split(',')[0]; // Extract the first element as the question
    
    //questionElement.textContent = currentQuestion;
    link = currentQuestion
    currentQuestion;
    console.log(currentQuestion);
    const secondLastIndex = link.length - 2;
    currentQuestion = link.substring(30, secondLastIndex + 1);
    questionElement.innerHTML = currentQuestion;
    //console.log(link)

    count++;
    localStorage.setItem("streak",JSON.stringify(count));
    console.log(count);

    streak.innerHTML = count;
    
    return currentQuestion;
    
}


function openquestion(){ 
    const newTab = window.open(link, '_blank');
    newTab.focus();
}


function showAnswer() {
    answerElement.style.display = "block";
}




fetchAndShowRandomQuestion()

const username = window.username; // Assuming username is a global variable

  if (username) {
    console.log("Username:", username);
  } else {
    console.log("Username not available");
  }
