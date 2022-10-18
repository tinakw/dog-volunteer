import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvents } from '../utilities/users-service'
export default function Chat(props) {
    const params = useParams();
    const [message, setMessage] = useState('')

    const [chatMessages, setChatMessages] = useState([]);

    const submitMessage = () => {
        // Send message to server
        props.socket.emit('message', { body: message, token: localStorage.getItem('token'), eventId: params.eventId })
    }


  

    useEffect(() => {

        // When someone navigates to the chat page
        // We want to grab the messages associated with this event
        // We also want to establish a connection to the server 
        // so that our messages only get sent to the right event

        props.socket.emit('join event chat', {eventId: params.eventId})

        props.socket.on('send messages', (messages) => {
            console.log('messages received from the backend for this chat', messages)
            setChatMessages(messages);
        })

        props.socket.on('new message', (newMessage) => {
            console.log('someone sent a new message', newMessage)
            setChatMessages((prevState) => [...prevState, newMessage])
        })
    
    }, [])

    return (
        <div>
            <h1>Chat Page</h1>
            {chatMessages.map(message => (
                <div><p>{message.body}</p></div>
            ))
            }
           
            <textarea onChange={e => setMessage(e.target.value)}></textarea>
            <button onClick={submitMessage}>Send</button>
        </div>

    )
}