import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvents } from '../utilities/users-service'
export default function Chat(props) {
    const params = useParams();
    const [message, setMessage] = useState('')
    const [events, setEvents] = useState([])
    const submitMessage = () => {
        // Send message to server
        props.socket.emit('message', { message, token: localStorage.getItem('token') })
    }

    console.log('what are my params', params)


    useEffect(() => {

        // When someone navigates to the chat page
        // We want to grab the messages associated with this event
        // We also want to establish a connection to the server 
        // so that our messages only get sent to the right event

        props.socket.emit('join event chat', {eventId: params.eventId})

        // const get = async () => {
        //     const events = await getEvents();
        //     // Each event in our databse is an object
        //     console.log('events', events)
        //     setEvents(events)
        // }
        // get();
    }, [])

    return (
        <div>
            <h1>Chat Page</h1>
           
            <textarea onChange={e => setMessage(e.target.value)}></textarea>
            <button onClick={submitMessage}>Send</button>
        </div>

    )
}