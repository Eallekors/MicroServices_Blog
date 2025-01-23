const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

const events = []

app.post('/events', (req, res) => {
    const event = req.body

    events.push(event)

    axios.post('https://posts-clusterip-srv:4000/events', event)
    .catch(err => console.error('Error posting to 4000:', err.message));
    axios.post('https://comments-srv:4001/events', event)  // Use the service name
    .catch(err => console.error('Error posting to 4001:', err.message));
    axios.post('https://query-srv:4002/events', event)  // Use the service name
    .catch(err => console.error('Error posting to 4002:', err.message));
    axios.post('https://moderation-srv:4003/events', event)  // Use the service name
    .catch(err => console.error('Error posting to 4003:', err.message));


    res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(4005, () => {
    console.log('Listening on 4005')
} )