import "./Home.scss"
import { fireContext } from "../../App"
import { useContext } from "react"
import { Link } from "react-router-dom"

export default function Home() {
  const { user } = useContext(fireContext)
  return (
    <>
      <div className="home">
        <div className="hello">
          <img src="/logo.svg" alt="Logo" />
          <h2>Bonjour {user ? user.email : null}👋</h2>
        </div>
        <div className="section">
          <h2>👍 Bons plans</h2>
          <div className="cartes">
            <h3>Carte Jeune Bordeaux Métropole</h3>
            <p>L'outil pour vous accompagner dans toutes vos sorties !</p>
          </div>
        </div>
        <div className="section">
          <h2>🎉 Evenements BDE</h2>
          <div className="cartes">
            <h3>Calendrier de l'Avent 🎄</h3>
            <p>📆 Mercredi 15 décembre</p>
            <p>🐺 Loup-Garou géant</p>
          </div>
          <div className="cartes">
            <h3>Calendrier de l'Avent 🎄</h3>
            <p>📆 Mercredi 16 décembre</p>
            <p>✨ Bal de Noel</p>
          </div>
        </div>
        <div className="section covoit-section">
          <h2>🚗 En voiture Michel !</h2>
          <div className="cartes">
            <h3>Le service de covoiturage dans l'IUT Bordeaux-Montaigne</h3>
            <Link to="/covoit">
              <div className="cartes-bouton">Proposer un covoit</div>
            </Link>
          </div>
        </div>
        <div className="section">
          <h2>🗞️ Actualités du BDE</h2>
          <div className="cartes">
            <h3>Social</h3>
            <p>
              Merci au club Inner Wheel Bordeaux Alienor Europea de nous avoir
              offert, ce mardi 9 Novembre, un chèque de 1000 euros pour
              permettre à notre association d’aider les étudiants en situation
              de précarité.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
