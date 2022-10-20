import { useState } from "react";
import { signUp } from '../utilities/users-service'
import './SignUpForm.css';
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm(props) {
  const navigate = useNavigate();

  const [errorState, setErrorState] = useState('');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm: ''
  });

  const [disable, setDisable] = useState(formData.password !== formData.confirm)

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const payload = {
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name
      }

      const user = await signUp(payload);
      props.setUser(user);
      navigate('/');

    } catch {
      setErrorState('Sign Up Failed - Try Again');
    }
  }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <section className="signUpFormContainer">
      <div className="form-container">
        <div className="form-header">
          <img src="/ShirlDogsLogoMagP2.jpg" />
          <h2>Shirlington Dogs II</h2>
        </div>
        <form className="signup-form" autoComplete="off" onSubmit={handleSubmit}>
          <h2>Create An Account</h2>
          <h3>Volunteer Communication & Bark Events</h3>
          <div className="name_container">
            <div>
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="input_box">


            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input_box">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input_box">
            <label htmlFor="confirm">Confirm:</label>
            <input
              type="password"
              name="confirm"
              value={formData.confirm}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={disable}>Create an Account</button>
        </form>
        <p className="error-message">{errorState}</p>
      </div>
      <p>Already have an account? <Link to="/login">Sign In</Link></p>
    </section>
  )
}