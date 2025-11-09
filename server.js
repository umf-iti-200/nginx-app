const express = require('express')
const bodyParser = require("body-parser");


const PORT = process.env.PORT || 3000;

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

app.post('/api/hello', (req, res) => {

    const { name } = req.body;

    console.log("From:", name);

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    
    res.json({ message: randomGreeting + ", " + name });
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})