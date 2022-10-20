import './App.css';
import { useState, useEffect } from 'react';
// import Auth from './pages/Auth';
import Home from './pages/Home';
import Chat from './pages/Chat';
import NavBar from './components/NavBar';

import { Routes, Route } from 'react-router-dom'
import { getUser } from './utilities/users-service';
import io from 'socket.io-client';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

const socket = io('http://localhost:3001')

function App() {

  const [user, setUser] = useState(getUser());


  useEffect(() => {
    socket.on('connect', () => {
      console.log('we are connected to the server')
    })

    socket.on('receive', (message) => {
      console.log('message received', message);
    })
  }, [])



  console.log('user', user)
  return (
    <div className="App">
      {
        user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={<Home socket={socket} />} />
              <Route path="/chat/:eventId" element={<Chat socket={socket} user={user} />} />

            </Routes>
          </>
          :
          <>
            <Routes>
              <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
              <Route path="/login" element={<LoginForm setUser={setUser} />} />
              <Route path="*" element={<LoginForm setUser={setUser} />} />
            </Routes>


          </>

      }
    </div>
  );
}

export default App;
