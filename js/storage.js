const username = document.getElementById("Username");
const finalScore = document.getElementById("finalScore");
const saveScoreButton = document.getElementById("saveScoreButton");

const recentScore = localStorage.getItem("recentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

console.log(highScores);

finalScore.innerText = "Your Score, Rookie:" + recentScore;

username.addEventListener("keyup", () => {
  saveScoreButton.disabled = !username.value;
});

theHighScore = e => {
  e.preventDefault();

  const score = {
    score: recentScore,
    name: username.value
  };
  console.log(score);

  highScores.push(score); // to save and push for json, after

  highScores.sort((a, b) => {
    return b.score - a.score;
  });
  highScores.splice(5); // to save just 5 and to the highscore table
  localStorage.setItem("highScores", JSON.stringify(highScores)); // stringify to save in string format to json
  window.location.assign("/index.html");
};
