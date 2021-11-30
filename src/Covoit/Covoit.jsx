import "./Covoit.scss"
import Ads from "./Ads/Ads"

import { Link, Outlet } from "react-router-dom"
import { fireContext } from "../App"
import { useContext } from "react"

export default function Covoit() {
  const { user } = useContext(fireContext)

  return (
    <>
      {user ? (
        <>
          <h1>En voiture Michelle !</h1>

          <Link to="add">Ajouter une annonce</Link>

          <Ads></Ads>
        </>
      ) : (
        <h1>Veuillez vous connecter</h1>
      )}
    </>
  )
}
