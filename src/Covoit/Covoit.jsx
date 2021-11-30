import "./Covoit.scss"
import Ads from "./Ads/Ads"

import { Link, Outlet } from "react-router-dom"

export default function Covoit() {
  return (
    <>
      <h1>En voiture Michelle !</h1>

      <Link to="add">Ajouter une annonce</Link>
      
      <Ads></Ads>
      <Outlet></Outlet>
    </>
  )
}
