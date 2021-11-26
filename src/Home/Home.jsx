import "./Home.scss"
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link to="/covoit">Covoiturage</Link>

      <h1>A la une</h1>
      <h1>Bons plans</h1>
      <h1>Avantages adhérent</h1>
      <h1>Événements</h1>
      <h1>Nous contacter</h1>
    </>
  )
}
