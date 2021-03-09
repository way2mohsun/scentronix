const fetch = require('node-fetch');
const fs = require('fs');
var sort = require('./sort');
let load_balancer = JSON.parse(fs.readFileSync('load-balancer.json')); // Load servers


let responses = [
    { priority: 4, url: 'http://localhost:3004', status: false },
    { priority: 3, url: 'http://localhost:3003', status: true },
    { priority: 2, url: 'http://localhost:3002', status: true },
    { priority: 1, url: 'http://localhost:3001', status: false },
];


describe("Active Service", () => {
    test("If test is passed means we have at least one active server.", () => {
        expect(findServer(responses)).not.toBeNull();
    });
});

function findServer(responses) {
    responses = sort(responses, 'priority'); // Sort by priority
    let active = {};
    for (let res in responses) {
        if (responses[res].status) {
            return responses[res];
        }
    }
    return null;
}