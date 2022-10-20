import { useState } from "react";
import { login } from '../utilities/users-service'
import './LoginForm.css'
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm(props) {
    const navigate = useNavigate();
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
                    <h2>Welcome Back</h2>
                    <h3>Sign in to access your account</h3>
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

                    <button type="submit">Login</button>
                </form>
                <p className="error-message">{errorState}</p>
            </div>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </section>
    )
}