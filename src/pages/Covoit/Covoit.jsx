import "./Covoit.scss"
import Ads from "./Ads/Ads"

import { Link } from "react-router-dom"

export default function Covoit() {
  return (
    <div className="covoit">
      <h1>En voiture Michel !</h1>
      <Link to="add">Publier un trajet</Link>
      <Ads></Ads>
    </div>
  )
}
