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

Every user in that chat will see that message instaneously through the use of this real connection


USer1 and User2 in a group chat


User1 has a web socket conection with server
User2 also has a web socket connection with server


User1 sends a message to the server

Server has to first store that message in the database
Server sends that message to everyone who is connected to it

Server sends that message to User2

USer2 ssees that message in their chat