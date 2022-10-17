import './App.css';
import { useState, useEffect } from 'react';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Chat from './pages/Chat';
import NewOrder from './pages/NewOrder';
import OrderHistory from './pages/OrderHistory';
import NavBar from './components/NavBar';
import Test from './pages/Test'
import { Routes, Route } from 'react-router-dom'
import { getUser} from './utilities/users-service';
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
            <NavBar user={user} />
            <Routes>
              <Route path="/" element={<Home socket={socket}/>} />
              <Route path="/chat" element={<Chat socket={socket}/>} />
             
            </Routes>
          </>
          :
          <>
           <Routes>
              <Route path="/signup" element={<SignUpForm setUser={setUser} />} />
              <Route path="/login" element={<LoginForm setUser={setUser} />} />
             
            </Routes>
                  
                  
          </>
 
      }
    </div>
  );
}

export default App;
