let score = 0;
let timeLeft = 30;
let username = "";
let gameInterval;

function login() {
  username = document.getElementById("username").value;
  if (username === "") return alert("Enter name");

  document.getElementById("login").style.display = "none";
  document.getElementById("gameArea").style.display = "block";
  document.getElementById("welcome").innerText = "Welcome " + username;

  startGame();
}

function startGame() {
  moveTiger();

  gameInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(gameInterval);
      endGame();
    }
  }, 1000);
}

function moveTiger() {
  const tiger = document.getElementById("tiger");

  setInterval(() => {
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);

    tiger.style.left = x + "px";
    tiger.style.top = y + "px";
  }, 800);
}

document.addEventListener("DOMContentLoaded", () => {
  const tiger = document.getElementById("tiger");

  tiger.onclick = function () {
    score++;
    document.getElementById("score").innerText = score;

    let audio = new Audio("https://www.soundjay.com/button/sounds/button-16.mp3");
    audio.play();
  };
});

function endGame() {
  alert("Game Over! Score: " + score);

  saveScore();
  showLeaderboard();
}

function saveScore() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({ name: username, score: score });
  scores.sort((a, b) => b.score - a.score);
  localStorage.setItem("scores", JSON.stringify(scores));
}

function showLeaderboard() {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  let list = document.getElementById("scores");
  list.innerHTML = "";

  scores.slice(0, 5).forEach(s => {
    let li = document.createElement("li");
    li.innerText = s.name + " - " + s.score;
    list.appendChild(li);
  });
}