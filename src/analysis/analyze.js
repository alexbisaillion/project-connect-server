const iteration1Scores = require("./iteration1.json");
const iteration2Scores = require("./iteration2.json");

const allIteration1Scores = [];
for (username of Object.keys(iteration1Scores)) {
  allIteration1Scores.push(...iteration1Scores[username]);
}

const allIteration2Scores = [];
for (username of Object.keys(iteration2Scores)) {
  allIteration2Scores.push(...iteration2Scores[username]);
}

let iteration1HistogramCount = {
  "zero-one": 0,
  "one-two": 0,
  "two-three": 0,
  "three-four": 0,
  "four-five": 0,
  "five-six": 0,
  "six-seven": 0,
  "seven-eight": 0,
  "eight-nine": 0,
  "nine-ten": 0
}

for (const score of allIteration1Scores) {
  if (score >= 0 && score < 0.1) {
    iteration1HistogramCount["zero-one"]++;
  } else if (score >= 0.1 && score < 0.2) {
    iteration1HistogramCount["one-two"]++;
  } else if (score >= 0.2 && score < 0.3) {
    iteration1HistogramCount["two-three"]++;
  } else if (score >= 0.3 && score < 0.4) {
    iteration1HistogramCount["three-four"]++;
  } else if (score >= 0.4 && score < 0.5) {
    iteration1HistogramCount["four-five"]++;
  } else if (score >= 0.5 && score < 0.6) {
    iteration1HistogramCount["five-six"]++;
  } else if (score >= 0.6 && score < 0.7) {
    iteration1HistogramCount["six-seven"]++;
  } else if (score >= 0.7 && score < 0.8) {
    iteration1HistogramCount["seven-eight"]++;
  } else if (score >= 0.8 && score < 0.9) {
    iteration1HistogramCount["eight-nine"]++;
  } else if (score >= 0.9 && score < 1.0) {
    iteration1HistogramCount["nine-ten"]++;
  } else {
    console.log("u wot" + score);
  }
}

let iteration2HistogramCount = {
  "zero-one": 0,
  "one-two": 0,
  "two-three": 0,
  "three-four": 0,
  "four-five": 0,
  "five-six": 0,
  "six-seven": 0,
  "seven-eight": 0,
  "eight-nine": 0,
  "nine-ten": 0
}

console.log(iteration2HistogramCount);

for (const score of allIteration2Scores) {
  if (score >= 0 && score < 0.1) {
    iteration2HistogramCount["zero-one"]++;
  } else if (score >= 0.1 && score < 0.2) {
    iteration2HistogramCount["one-two"]++;
  } else if (score >= 0.2 && score < 0.3) {
    iteration2HistogramCount["two-three"]++;
  } else if (score >= 0.3 && score < 0.4) {
    iteration2HistogramCount["three-four"]++;
  } else if (score >= 0.4 && score < 0.5) {
    iteration2HistogramCount["four-five"]++;
  } else if (score >= 0.5 && score < 0.6) {
    iteration2HistogramCount["five-six"]++;
  } else if (score >= 0.6 && score < 0.7) {
    iteration2HistogramCount["six-seven"]++;
  } else if (score >= 0.7 && score < 0.8) {
    iteration2HistogramCount["seven-eight"]++;
  } else if (score >= 0.8 && score < 0.9) {
    iteration2HistogramCount["eight-nine"]++;
  } else if (score >= 0.9 && score < 1.0) {
    iteration2HistogramCount["nine-ten"]++;
  } else {
    console.log("u wot" + score);
  }
}

console.log(iteration1HistogramCount);
console.log(iteration2HistogramCount);

const getAverage = (scores) => {
  let total = 0;
  for (score of scores) {
    total += score;
  }
  return total / scores.length;
}

const getMinimum = (scores) => {
  const sorted = scores.sort((a, b) => a - b);
  return sorted[0];
}

const getMaximum = (scores) => {
  const sorted = scores.sort((a, b) => b - a);
  return sorted[0];
}

console.log(getAverage(allIteration1Scores));
console.log(getMinimum(allIteration1Scores));
console.log(getMaximum(allIteration1Scores));
console.log("-----")
console.log(getAverage(allIteration2Scores));
console.log(getMinimum(allIteration2Scores));
console.log(getMaximum(allIteration2Scores));