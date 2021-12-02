import './Home.scss'
// import { Link } from "react-router-dom"
import { fireContext } from '../App'
import { useContext } from 'react'

export default function Home() {
  const { user } = useContext(fireContext)
  return (
    <>
      <div className="home">
        <h1>Bonjour {user ? user.email : null}👋</h1>
        <div className="section">
          <h2>🎉 Evenements BDE</h2>
          <div className="cartes">
            <p>Calendrier de l'Avent 🎄</p>
            <p>Mercredi 15 décembre</p>
            <h3>Loup-Garou géant</h3>
            <h2></h2>
          </div>
        </div>
        <div className="section">
          <h2>🚗 En voiture Michel !</h2>
          <div className="cartes">
            <h3>Proposer un covoit</h3>
          </div>
        </div>
        <div className="section">
        <h2>🗞️ Actualités du BDE</h2>
        
         <div className="cartes">
            <h2></h2>
          </div>
        </div>
      </div>

      {/* {ads.map((ad, index) => (
        <div key={index} className="ad">
          <div className="infos">
            <span className="date-start">
              {new Date(ad.when.seconds).getHours()}
            </span>
            <div className="point point-start"></div>
            <span className="start">{ad.start}</span>
            <span className="duration">1h00</span>
            <div className="line-container">
              <div className="line" />
            </div>
            <span className="date-finish">1:00</span>
            <div className="point point-end"></div>
            <span className="finish">{ad.finish}</span>
          </div>
          <span className="date">
            {new Date(ad.when.seconds).getTime()} {ad.when.seconds}
          </span>
          <span className="user">Michel</span>
          <span className="price">{ad.price}</span>
        </div>
      ))}
    */}
    </>
  )
}
