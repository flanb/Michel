import "./Register.scss"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRef } from "react"

export default function Register() {
  const emailInput = useRef(null)
  const passInput = useRef(null)
  const response = useRef(null)

  function CreateAccount(email, password) {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user
        response.current.innerHTML = "Inscription réussie"
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          response.current.innerHTML = "Cette adresse email est déjà utilisée"
        }
        if (error.code === "auth/invalid-email") {
          response.current.innerHTML = "Cette adresse email est invalide"
        }
        if (error.code === "auth/weak-password") {
          response.current.innerHTML = "Le mot de passe est trop faible"
        }
      })
  }
  return (
    <>
      <h2>Inscription</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          CreateAccount(emailInput.current.value, passInput.current.value)
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
        <button type="submit">Je m'inscris</button>
      </form>
      <span ref={response}></span>
    </>
  )
}
