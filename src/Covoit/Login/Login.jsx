import "./Login.scss"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRef } from "react"

export default function Login() {
  const emailInput = useRef(null)
  const passInput = useRef(null)
  const response = useRef(null)

  function Loguser(email, password) {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        response.current.innerHTML = `connected as ${user.email}`
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          response.current.innerHTML = "Wrong password."
        }
        if (error.code === "auth/user-not-found") {
          response.current.innerHTML = "User not found."
        }

        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <>
      <h1>Connexion</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          Loguser(emailInput.current.value, passInput.current.value)
        }}
      >
        <input
          type="email"
          autoComplete="email"
          placeholder="Email"
          ref={emailInput}
        />
        <input
          type="password"
          autoComplete="currentPassword"
          placeholder="Password"
          ref={passInput}
        />
        <button type="submit">Je me connecte</button>
      </form>
      <span ref={response}></span>
    </>
  )
}
