const spawnSync = require('child_process').spawnSync;
const lighthouseCli = require.resolve('lighthouse/cli');

const {computeMedianRun,} = require('lighthouse/core/lib/median-run.js');


const results = [];
for (let i = 0; i < 5; i++) {
  console.log(`Running Lighthouse attempt #${i + 1}...`);
  const { status = -1, stdout } = spawnSync('node', [
    lighthouseCli,
    'http://10.10.224.220',
    '--output=json',
  ]);
  if (status !== 0) {
    console.log('Lighthouse failed, skipping run...');
    continue;
  }
  results.push(JSON.parse(stdout));
}

const median = computeMedianRun(results);
console.log(
  'Median performance score was',
  median.categories.performance.score * 100
);
