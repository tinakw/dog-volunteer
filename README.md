The Dog Volunteer app is a MERN stack application that provides a private platform for multiple users to coordinate communication and planning around specific events instantly and simultaneously. Communication is global and messages are date/time stamped. User and event data and message history are stored in MongoDB.

Users are prompted to signup or login to create their profile using their first and last names, an email address and a password. 

<img width="1349" alt="Screen Shot 2022-10-20 at 10 33 12 PM" src="https://user-images.githubusercontent.com/110048198/197097720-41fe1cad-6a00-4b8c-b693-373629fc73b3.png">


The homepage is a wall of events; each event lists its title, date/time, and a hyper-linked text to "chat". 

<img width="1351" alt="Screen Shot 2022-10-20 at 9 31 01 PM" src="https://user-images.githubusercontent.com/110048198/197097460-4da31fa9-6f7a-4b53-8aea-a85ea47eaad8.png">


Each chat page hosts one event and displays event details, the list of users and a messaging panel. Multiple users can be loggedin simultaneously and post conversations in real time through websockets.


<img width="1348" alt="Screen Shot 2022-10-20 at 10 36 21 PM" src="https://user-images.githubusercontent.com/110048198/197098201-f88be3a6-9d50-45d9-ae49-8745d57e2829.png">


The app is hosted on Heroku for (Express) and Netlify for (React). DEPLOY HERE: https://harmonious-biscochitos-b429e7.netlify.app/ and incorporates the technologies of the MERN-stack:

MongoDB/Mongoose;
Express;
React;
Node

Additional technologies used: 

Socket.io .............axios..........
json webtoken..........bcrypt.........
bootstrap..............morgan

The main/central Mongoose model used: ObjectId, this model converts objects into 12-byte ObjectId.
My "favorite" Express controller method - Router to events.
My "favorite" React component is "Callback Props" used for User-Forms (ie.handlesubmit).
For client-side routing - frontend/browser/UI were handled in components folder.

My biggest challenge is deployment because just when you think you're finished, you're not. It seems that each platform has its own issues that require trouble-shooting.

Key takeaways: Organize your workstation and remove unnecessary files. Work side-by-side with JS and CSS files.

While user communication is global now, a private chat feature may be added in the future. 

Enjoy! Happy Coding!



