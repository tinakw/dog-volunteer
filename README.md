The Dog Volunteer app is a MERN stack application that provides a private platform for multiple users to coordinate communication and planning around specific events instantly and simultaneously. Communication is currently global and messages are date/time stamped. User and event data and message history is stored in MongoDB.

Users are prompted to signup or login to create their profile using their first and last names, an email address and a password. 

The homepage is a wall of events; each event lists its title, date/time, and a hyper-linked text to "chat". 

Each chat page hosts one event and displays event details, the list of users and a messaging panel. Multiple users can be loggedin simultaneously and posting conversations in real time through websockets.

The app is hosted on Heroku for (Express) and Netlify for (React) and incorporates the technologies of the MERN-stack:

MongoDB/Mongoose
Express
React
Node

Additional technologies used: 

Socket.io .............axios
json webtoken..........bcrypt
bootstrap..............morgan

The main/central Mongoose model: ObjectId converts objects into 12-byte ObjectId
Your "favorite" Express controller method - Router to events
Your "favorite" React component "Callback Props" for User Forms (ie.handlesubmit)
The client-side routing - frontend/browser/UI handled in components folder
Share the experience by answering the following:

My biggest challenge is deployment because you think you're finished but it seems that each platform has its own issues.

Key takeaways: Organize your workstation and remove unnecessary files. Work side-by-side with JS and CSS files

<img width="1351" alt="Screen Shot 2022-10-20 at 9 31 01 PM" src="https://user-images.githubusercontent.com/110048198/197097460-4da31fa9-6f7a-4b53-8aea-a85ea47eaad8.png">

