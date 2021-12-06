import "./Login.scss"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Btn from "../../../components/Btn/Btn"
import { Link } from "react-router-dom"
import { fireContext } from "../../../App"

export default function Login() {
  const emailInput = useRef(null)
  const passInput = useRef(null)
  const response = useRef(null)
  const auth = getAuth()
  const navigate = useNavigate()
  const { setCookie } = useContext(fireContext)

  function Loguser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setCookie("user", user, { path: "/" })
        response.current.innerHTML = `Connecté à ${user.email}`
        navigate("/user")
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          response.current.innerHTML = "Mot de passe erroné."
        } else if (error.code === "auth/user-not-found") {
          response.current.innerHTML = "Utilisateur non trouvé."
        } else if (error.code === "auth/invalid-email") {
          response.current.innerHTML = "Email invalide."
        } else if (error.code === "auth/network-request-failed") {
          response.current.innerHTML = "Erreur de connexion."
        } else {
          response.current.innerHTML = error.message
        }
        response.current.style.color = "var(--color-primary)"
        const errorCode = error.code
        const errorMessage = error.message
        console.error(errorCode, errorMessage)
      })
  }
  return (
    <div className="login">
      <div className="form-container-log ">
        <h2>Connexion</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            response.current.innerHTML = "Chargement..."
            Loguser(emailInput.current.value, passInput.current.value)
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
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
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
          <Btn type="submit">Je me connecte</Btn>
        </form>
      </div>
      <div className="redirect">
        Tu n'as pas encore de compte ?<Link to="/register">S'inscrire</Link>
      </div>
    </div>
  )
}
