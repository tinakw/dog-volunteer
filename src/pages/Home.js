import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { getEvents } from '../utilities/users-service'
export default function Home(props) {
    const [message, setMessage] = useState('')
    const [events, setEvents] = useState([])
    const submitMessage = () => {
        // Send message to server
        props.socket.emit('message', { message, token: localStorage.getItem('token') })
    }




    useEffect(() => {
        const get = async () => {
            const events = await getEvents();
            // Each event in our databse is an object
            console.log('events', events)
            setEvents(events)
        }
        get();
    }, [])

    return (
        <div>
            <h1>Home</h1>
            {events.map(event => (
                <div>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <Link to={"/chat/" + event._id}>Chat</Link>
                </div>
            ))}
            <textarea onChange={e => setMessage(e.target.value)}></textarea>
            <button onClick={submitMessage}>Send</button>
        </div>

    )
}