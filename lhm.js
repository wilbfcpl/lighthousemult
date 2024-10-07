#!/usr/bin/env node
const execSync = require('child_process').execSync;
const exec =require('child_process').exec;

let urls = require('./URLlist.json'); // The file where your list of urls lives
let runs = 0
let cron_url = "http://10.10.224.220/cron/-GKYUCGhx8VfsaKjjLLo-_Hm8pwLkvFZXJIGRoQPT_VkjNbYJzNbxDTEqo6lnsEYF0qJ04oKOg"
try {
    exec('google-chrome-stable ${cron_url}');
}
catch(err) {
        console.log(`chrome cron launch ${cron_url} failed`); // If Lighthouse happens to fail it'll log this to the console and log the error message
    }
for (const url of urls) {
    
    console.log(`Running performance test ${runs + 1}`); // Logs this to the console just before it kicks off
    try {
        execSync(`lighthouse ${url} --emulated-form-factor=desktop --throttling-method=provided  --view`); // Executes this on the command line to run the performance test
	//         execSync(`lighthouse ${url} --emulated-form-factor=desktop --throttling-method=provided --chrome-flags=--headless --quiet --view`); // Executes this on the command line to run the performance test
    }
    catch(err) {
        console.log(`Performance test ${runs + 1} failed`); // If Lighthouse happens to fail it'll log this to the console and log the error message
        break;
    }
    console.log(`Finished running performance test ${runs + 1}`); // Logs this to the console just after it finishes running each performance test
    runs++;
}
console.log(`All finished`);
