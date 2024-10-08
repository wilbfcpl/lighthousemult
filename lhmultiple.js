#!/usr/bin/env node
const execSync = require('child_process').execSync;
let url = "http://10.10.224.220"; // Change this to the url you want to run your performance tests against
// let url = "/home/wblake/lighthouse/URLlist.json"; // Change this to the url you want to run your performance tests against
let runs = 0;
let runLimit = 1; // Change this to be the number of performance tests you want to do
do {
    console.log(`Starting performance test ${runs + 1}`); // Logs this to the console just before it kicks off
    try {
        execSync(`lighthouse ${url} --emulated-form-factor=desktop --only-categories=performance --throttling-method=provided --chrome-flags=--headless --quiet --view`); // Executes this on the command line to run the performance test
    }
    catch(err) {
        console.log(`Performance test ${runs + 1} failed`); // If Lighthouse happens to fail it'll log this to the console and log the error message
        break;
    }
    console.log(`Finished running performance test ${runs + 1}`); // Logs this to the console just after it finishes running each performance test
    runs++;
}
while (runs < runLimit); // Keeps looping around until this condition is false
console.log(`All finished`);
