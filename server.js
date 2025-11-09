const express = require('express')
const bodyParser = require("body-parser");
const pino = require("pino")

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
