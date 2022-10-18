import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { getEvents } from '../utilities/users-service'
export default function Home(props) {
   
    const [events, setEvents] = useState([])
  



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
            
        </div>

    )
}