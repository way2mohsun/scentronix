const fetch = require('node-fetch');
const fs = require('fs');
var sort = require('./sort');
let load_balancer = JSON.parse(fs.readFileSync('load-balancer.json')); // Load servers


for (req in load_balancer) {

}



function findServer(responses) {
    responses = sort(responses, 'priority'); // Sort by priority
    let active = {};
    for (res in responses) {
        if (responses[res].status) {
            return responses[res];
        }
    }
    return null;
}