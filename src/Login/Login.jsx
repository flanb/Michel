import "./Login.scss"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRef } from "react"
import { useCookies } from "react-cookie"

export default function Login() {
  const emailInput = useRef(null)
  const passInput = useRef(null)
  const response = useRef(null)
  const auth = getAuth()

  function Loguser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
        response.current.innerHTML = `Connecté à ${user.email}`
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          response.current.innerHTML = "Mot de passe erroné."
        }
        if (error.code === "auth/user-not-found") {
          response.current.innerHTML = "Utilisateur non trouvé."
        }

        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <>
      <h2>Connexion</h2>
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
