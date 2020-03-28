const highScoresList = document.getElementById('highScoresList');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
.map( score =>{
return `<ul class = 'high-score'> ${score.name} - ${score.score}</ul>`;
})
.join(""); // join the array element's 