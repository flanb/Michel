import "./Register.scss"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRef } from "react"
import Btn from "../../Btn/Btn"
import { Link } from "react-router-dom"

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
    <div className="register">
      <div className="form-container-log">
        <h2>Inscription</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            response.current.innerHtml = "Chargement..."
            CreateAccount(emailInput.current.value, passInput.current.value)
          }}
        >
          <div className="input-container">
            <input
              type="email"
              id="email"
              autoComplete="on"
              placeholder="Email*"
              required
              ref={emailInput}
            />
            <label htmlFor="email">Email*</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              autoComplete="on"
              placeholder="Mot de passe*"
              required
              minLength="6"
              ref={passInput}
            />
            <label htmlFor="password">Mot de passe*</label>
          </div>
          <span ref={response}>Les champs marqués * sont obligatoires</span>
          <Btn type="submit">Je m'inscris</Btn>
        </form>
      </div>
      <div className="redirect">
        Tu as dejà un compte ?<Link to="/login">Se connecter</Link>
      </div>
    </div>
  )
}
