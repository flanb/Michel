import "./Login.scss"

import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import Btn from "../../Btn/Btn"
import { Link } from "react-router-dom"

export default function Login() {
  const emailInput = useRef(null)
  const passInput = useRef(null)
  const response = useRef(null)
  const auth = getAuth()
  const navigate = useNavigate()

  function Loguser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
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
      <div className="form-container-log">
        <h2>Connexion</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            response.current.innerHtml = "Chargement..."
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
