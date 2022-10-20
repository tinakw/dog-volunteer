User vists our app

They are prompted to login or signup 

Once they are logged in or register, what do they see?

A user sees a list of events on their homepage

A user clicks on one of these events and is shown a messaging page for that particular event 

We want to establish a web socket connection with the server JUST for this particular event chat

User1 sends a message to Event Id 1
Server takes that message, stores it in our database, 
Server needs to send that message to everyone in that chat



Messaging page consists of message chat and maybe list of users and RSVP button


Use websockets to create a real time connection in order to be able to send and receive messages instantaenously 

A user enters one of the event chat rooms 
A user types and sends a message to the group chat

Every user in that chat will see that message instantly through the use of this real connection


USer1 and User2 in a group chat


User1 has a web socket connection with server
User2 also has a web socket connection with server


User1 sends a message to the server

Server has to first store that message in the database
Server sends that message to everyone who is connected to it

Server sends that message to User2

USer2 sees that message in their chat



Left Todo
[x] Style the signup page
[x] Style the login page
[x] Create cards for each event in the home page
[x] Navigation bar can have links back to Home, Also show the user's name, and a logout button
[x] Come up with a design for the chat page
[x] Show who sent the message and what time they sent the message
[] Make sure that the chat log or chat history doesn't get too long (make it scrollable)
[] Deploy
[x] Come up with some mock events (title, description, date, image)
