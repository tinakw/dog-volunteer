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
const Event = require('./models/Event');
const mongoose = require('mongoose');
const cors = require('cors');
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());


// seed();

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



// This is your *default* route. If the route being received does not match any other route that exists on the server, it sends it back information about the frontend React App and renders it to the page. This is why it is put at the very end, because if it does not match anything else, it knows to do this.

io.on('connection', (socket) => {
  console.log('someone connected');

  // Once a user emites a message, the server has to receive the message
  socket.on('message', async (message) => {

    const token = message.token;
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {


      // Store that message in the database
      const newMessage = await Message.create({
        user: mongoose.Types.ObjectId(decoded.user._id),
        body: message.body,
        event: mongoose.Types.ObjectId(message.eventId)
      })
      await newMessage.populate('user');
      console.log('new message sent', newMessage)
      // Server will send that message ONLY to everyone in that event chat
      io.to(message.eventId).emit('new message', newMessage);



    });

  })

  socket.on('join event chat', async ({ eventId, token }) => {
    // Description of that event
    const event = await Event.findOne({ _id: mongoose.Types.ObjectId(eventId) });
    console.log('event found:', event);



    // Grab every message in that chat
    const messages = await Message.find({ event: mongoose.Types.ObjectId(eventId) }).populate({ path: 'user', select: 'first_name last_name' });
    // Grab ever user in that chat
    console.log('messages', messages);
    const users = {};
    for (let i = 0; i < messages.length; i++) {
      const userId = messages[i].user._id;
      // If that user is not already listed in the list of users, add them
      if (!users[userId]) {
        users[userId] = {
          _id: userId,
          first_name: messages[i].user.first_name,
          last_name: messages[i].user.last_name
        }
      }
    }

   
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (!users[decoded.user._id]) {
      users[decoded.user._id] = {
        _id: decoded.user._id,
        first_name: decoded.user.first_name,
        last_name: decoded.user.last_name
      }
    }

    const userList = Object.values(users);
    console.log('list of unique users', users);

    // console.log('all messages for this event: ', eventId, messages)
    socket.join(eventId)
    // console.log('event that the user wants to join',eventId )
    io.to(eventId).emit('send event info', { event, messages, users: userList });

  })
})

// ----------

server.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

// tells the server that the API is running on to open the port that we specified at the very beginning of the file and run the API on that port.