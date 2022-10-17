import { useState } from "react";
import { signUp } from '../utilities/users-service'

export default function SignUpForm (props) {

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
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
           <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
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
          <label htmlFor="confirm">Confirm:</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>SIGN UP!</button>
        </form>
        <p className="error-message">{errorState}</p>
      </div>
    </>
  )
}