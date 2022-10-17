import { useState } from "react";
import { login } from '../utilities/users-service'

export default function LoginForm (props) {

  const [errorState, setErrorState] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const payload = {
        email: formData.email,
        password: formData.password,
    
      }

      const user = await login(payload);
      console.log('user logged in', user)
      props.setUser(user);

    } catch {
      setErrorState('Sign Up Failed - Try Again');
    }
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        
          <button type="submit">Login</button>
        </form>
        <p className="error-message">{errorState}</p>
      </div>
    </>
  )
}