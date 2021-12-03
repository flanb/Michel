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
      .then(() => {
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
            <svg
              width="24"
              height="18"
              viewBox="0 0 24 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              onClick={() => {
                passInput.current.type === "password"
                  ? (passInput.current.type = "text")
                  : (passInput.current.type = "password")
              }}
            >
              <path d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z" />
              <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" />
            </svg>
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
