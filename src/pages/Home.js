import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utilities/users-service'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
            <div className="eventscontainer">
            {events.map(event => (
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={event.img} />
                <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>
                    {event.description}
                    </Card.Text>
                    <Link to={"/chat/" + event._id}>Chat</Link>
                </Card.Body>
            </Card>
                // <div>
                //     <h2>{event.title}</h2>
                //     <p>{event.description}</p>
                //     <Link to={"/chat/" + event._id}>Chat</Link>
                // </div>
            ))}
</div>
        </div>

    )
}