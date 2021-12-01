import "./Covoit.scss"
import Ads from "./Ads/Ads" 

import { Link, useNavigate } from "react-router-dom"
import { fireContext } from "../App"
import { useContext } from "react"

export default function Covoit() {
  const { user } = useContext(fireContext)
  const navigate = useNavigate()
  return (
    <>
      {user ? (
        <>
          <h1>En voiture Michel !</h1>

          <Link to="add">Ajouter une annonce</Link>

          <Ads></Ads>
        </>
      ) : (
        setTimeout(() => navigate("/login"), 1)
      )}
    </>
  )
}
