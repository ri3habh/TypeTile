/*
NORMAL MODE CHART
*/
const normalLabels = [];
const normalVanillaScores = [];
for (score of normalScores)
{
    normalLabels.push(moment(score.date).format('L'));
    normalVanillaScores.push(score.score);
}
const normalData = {
  labels: normalLabels,
  datasets: [{
    label: 'Normal Scores Progression',
    backgroundColor: 'rgb(57, 166, 230)',
    borderColor: 'rgb(57, 166, 230)',
    data: normalVanillaScores,
  }]
};

const normalConfig = {
  type: 'line',
  data: normalData,
  options: {}
};
const normalChart = new Chart(
    document.getElementById('normalProgressionChart'),
    normalConfig
);

/*
NORMAL POISON MODE CHART
*/
const normalPoisonLabels = [];
const normalPoisonVanillaScores = [];
for (score of normalPoisonScores)
{
    normalPoisonLabels.push(moment(score.date).format('L'));
    normalPoisonVanillaScores.push(score.score);
}
const normalPoisonData = {
  labels: normalPoisonLabels,
  datasets: [{
    label: 'Normal Poison Scores Progression',
    backgroundColor: 'rgb(9, 53, 79)',
    borderColor: 'rgb(9, 53, 79)',
    data: normalPoisonVanillaScores,
  }]
};
const normalPoisonConfig = {
  type: 'line',
  data: normalPoisonData,
  options: {}
};
const normalPoisonChart = new Chart(
    document.getElementById('normalPoisonProgressionChart'),
    normalPoisonConfig
);

/*
RANDOM MODE CHART
*/
const randomLabels = [];
const randomVanillaScores = [];
for (score of randomScores)
{
    randomLabels.push(moment(score.date).format('L'));
    randomVanillaScores.push(score.score);
}
const randomData = {
  labels: randomLabels,
  datasets: [{
    label: 'Random Scores Progression',
    backgroundColor: 'rgb(232, 19, 40)',
    borderColor: 'rgb(232, 19, 40)',
    data: randomVanillaScores,
  }]
};
const randomConfig = {
  type: 'line',
  data: randomData,
  options: {}
};
const randomChart = new Chart(
    document.getElementById('randomProgressionChart'),
    randomConfig
);

/*
RANDOM POISON MODE CHART
*/
const randomPoisonLabels = [];
const randomPoisonVanillaScores = [];
for (score of randomPoisonScores)
{
    randomPoisonLabels.push(moment(score.date).format('L'));
    randomVPoisonanillaScores.push(score.score);
}
const randomPoisonData = {
  labels: randomPoisonLabels,
  datasets: [{
    label: 'Random Poison Scores Progression',
    backgroundColor: 'rgb(110, 2, 13)',
    borderColor: 'rgb(110, 2, 13)',
    data: randomPoisonVanillaScores,
  }]
};
const randomPoisonConfig = {
  type: 'line',
  data: randomPoisonData,
  options: {}
};
const randomPoisonChart = new Chart(
    document.getElementById('randomPoisonProgressionChart'),
    randomPoisonConfig
);