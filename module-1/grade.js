function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

const scores = [95, 82, 71, 60, 45];
for (const score of scores) {
  console.log(`Score ${score} -> Grade ${getGrade(score)}`);
}
