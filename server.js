// ----------
// Require Statments -- tells the app what packages are being used
// ----------

const express = require('express');
const app = express()
const path = require('path');
const http = require('http');
const server = http.createServer(app)
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');
const seed = require('./seed');
const jwt = require('jsonwebtoken')
const Message = require('./models/Message');
const mongoose = require('mongoose');

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


seed();

// ----------
// Defining the port that the app runs on
// ----------

const port = process.env.PORT || 3001

// ----------
// Creating the application using express so that it can actually process requests
// ----------


// ----------
// BEGINNING OF MIDDLEWARE
// ----------

// Middleware functions (preceded by app.use) are run EVERY time a server receives a request of any type.

app.use(logger('dev')); // this just logs the request to the console (using a package called morgan)
app.use(express.json()); // this turns the body of the request into JSON so that we can actually do stuff with it

app.use(favicon(path.join(__dirname, 'build', 'favicon.ico'))); // this uses the favicon package to make sure the react site is showing the right favicon
app.use(express.static(path.join(__dirname, 'build'))); // this points the react app to the server's "build" folder so it knows where to get the frontend code from.

// ----------
// END OF MIDDLEWARE
// ----------

// ----------
// ROUTES START HERE
// ----------

app.use('/api/users', require('./routes/api/users'));
app.use('/api/events', require('./routes/api/events'));

// This app.use is a little different because it takes *two* arguments, the first of which is a string. Since it is a string, it knows that it needs to send any request that starts with that string to the file that is put in the second argument slot.

// ----------

// Create Read Update Destroy routes go here (Index, Show, Create, Update, Delete) -- (New and Edit go on the front end (And kind of Index and Show))

// Index and Show on the express server grab the data from the database that's needed and send it to the front end to be rendered there.

// ----------

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

// This is your *default* route. If the route being received does not match any other route that exists on the server, it sends it back information about the frontend React App and renders it to the page. This is why it is put at the very end, because if it does not match anything else, it knows to do this.

io.on('connection', (socket) => {
  console.log('someone connected');

  // Once a user emites a message, the server has to receive the message
  socket.on('message', (message) => {
    console.log('what is the message the user is sending?', message);
    const token = message.token;
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
      console.log('decoded user', decoded);

      // Store that message in the database
      // Message


    });
    // Make sure to store that message in the database

    // Send that message to every user who is connected
    socket.broadcast.emit('receive', {message})
  })

  socket.on('join event chat', async ({eventId}) => {
    // Grab every message in that chat
    const messages = await Message.find({event: mongoose.Types.ObjectId(eventId)});
    console.log('all messages for this event: ', eventId, messages)
    socket.join(eventId)
    console.log('event that the user wants to join',eventId )
    io.to(eventId).emit('send messages', messages);

  })
})

// ----------

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

// tells the server that the API is running on to open the port that we specified at the very beginning of the file and run the API on that port.