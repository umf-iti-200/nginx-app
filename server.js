const express = require('express')
const bodyParser = require("body-parser");
const pino = require("pino")
const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

console.log(results)

const PORT = process.env.PORT || 3000;

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})
const app = express()

app.use(bodyParser.json());
app.use(express.static('public'))

const greetings = [
    "Hello",
    "Hi",
    "Hey",
    "Good morning",
    "Greetings"
];

const delay = [1000, 2000, 3000, 4000, 5000];

function getGreetings() {
    return greetings[Math.floor(Math.random() * greetings.length)];
}

function getDelay() {
    return delay[Math.floor(Math.random() * delay.length)];
}

app.post('/api/hello', (req, res) => {

    const { name } = req.body;

    logger.info(`From: ${name}`);

    const greeting = getGreetings();

    const message = `${greeting},  ${name}`;

    const delay = getDelay();

    setTimeout((() => {
        res.json({ message });
    }), delay)
})

app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
})
