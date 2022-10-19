import { Link } from 'react-router-dom';

export default function NavBar (props) {
  return (
    <nav>
      <h3>{props?.user?.name}</h3>
      
      <Link to="/">Home</Link>
      <button onClick={()=> {
        localStorage.removeItem('token');
        props.setUser(null);
      }}>Log Out</button>
    </nav>
  )
}