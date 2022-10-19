import SignUpForm from "../components/SignUpForm"
import LoginForm from "../components/LoginForm"

export default function Auth (props) {
  return (
    <main>
      <h1>Auth Page</h1>
      <h2>Sign Up</h2>
      <SignUpForm setUser={props.setUser}/>
      <h2>Log In</h2>
      <LoginForm setUser={props.setUser} />
    </main>
  )
}