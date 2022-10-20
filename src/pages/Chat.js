import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';

export default function Chat(props) {
    const params = useParams();
    const [message, setMessage] = useState('')
    const [event, setEvent] = useState({})
    const [users, setUsers] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);

    const submitMessage = () => {
        // Send message to server
        props.socket.emit('message', { body: message, token: localStorage.getItem('token'), eventId: params.eventId })
        setMessage('');
    }

    useEffect(() => {
        // When someone navigates to the chat page
        // We want to grab the messages associated with this event
        // We also want to establish a connection to the server 
        // so that our messages only get sent to the right event

        props.socket.emit('join event chat', { eventId: params.eventId, token: localStorage.getItem('token')})

        props.socket.on('send event info', ({ event, messages, users }) => {
            console.log('messages received from the backend for this chat', event, users, messages)
            setEvent(event);
            setUsers(users);
            setChatMessages(messages);
        })

        props.socket.on('new message', (newMessage) => {
            console.log('someone sent a new message', newMessage)
            setChatMessages((prevState) => [...prevState, newMessage])
        })


    }, [])

    return (
        <div className='chatPage'>
            <div className="users_container">

                <div className="event_info">
                    <h2>{event.title}</h2>
                    <p>{event.date}</p>
                    <p>{event.description}</p>
                </div>

                <h2 className="user_list_title">User List</h2>
                <div className="user_list">
                    {users.map(user => (
                        <div className='user_box'>
                            <div>{user.first_name[0].toUpperCase()}{user.last_name[0].toUpperCase()}</div>
                            <p>{user.first_name} {user.last_name}</p>

                        </div>
                    ))
                    }
                </div>

            </div>
            <div className="messages_container"
            >

            <div className="messages">
            {chatMessages.map(message => {
                    return (
                        <div>
                            {message.user._id === props.user._id ? (
                                <div className="my_message_box">
                                    <div>
                                        <div className="text_box">{message.body}</div>
                                        <div className="avatar">{message.user.first_name[0].toUpperCase()}{message.user.last_name[0].toUpperCase()}</div>
                                    </div>
                                    <p>10/22/2022 10:15pm</p>
                                </div>
                            )
                                :
                                (
                                    <div className="their_message_box">
                                        <div>
                                            <div className='avatar'>{message.user.first_name[0].toUpperCase()}{message.user.last_name[0].toUpperCase()}</div>
                                            <div className="text_box">{message.body}</div>
                                        </div>
                                        <p>{new Date(message.createdAt).toLocaleString()}</p>


                                    </div>


                                )}

                        </div>
                    )
                }
                )}
            </div>

               


                <div className="send_message_container">
                    <textarea value={message} placeholder="Enter a message" onChange={e => setMessage(e.target.value)}></textarea>
                    <button onClick={submitMessage}>Send</button>
                </div>

            </div>


        </div >

    )
}