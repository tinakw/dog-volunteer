import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.css";

export default function NavBar(props) {
  const navigate = useNavigate();
  return (
    <nav>
      <ul>
        <li>
          <img src="/ShirlDogsLogoMagP2.jpg" />
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <div>
          <li>
            {props?.user?.first_name} {props?.user?.last_name}
          </li>
          <li>
            <button onClick={() => {
              localStorage.removeItem('token');
              props.setUser(null);
              
            }}>Log Out</button>
          </li>
        </div>
      </ul>

    </nav>
  )
}