const fetch = require('node-fetch');
const fs = require('fs');
var sort = require('./sort');
let load_balancer = JSON.parse(fs.readFileSync('load-balancer.json')); // Load servers


//https://javascript.info/promise-api
let requests = load_balancer.map(o => fetch(o.url, { timeout: 5000 })
    .then(function (response) {
        if (response.status < 200 || response.status > 299) {
            return { priority: o.priority, url: o.url.match(/\w+:\d+/g)[0], status: false };
        }
        return { priority: o.priority, url: o.url.match(/\w+:\d+/g)[0], status: true };
    })
    .catch(function (err) {
        return { priority: o.priority, url: o.url.match(/\w+:\d+/g)[0], status: false };
    }));

Promise.all(requests).then(function (responses) {
    let active_server = findServer(responses);
    if (active_server == null) {
        console.log('Rejected.')
    } else {
        console.log(active_server)
    }
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