import "./Home.scss"
import { Link } from "react-router-dom"
import { fireContext } from "../App"
import { useContext } from "react"

export default function Home() {
  const { user } = useContext(fireContext)
  return (
    <>
      {user ? (
        <>
          <h1>Bonjour {user.email} 👋</h1>
          <Link to="/covoit">Covoiturage</Link>
        </>
      ) : (
        <h1>Veuillez vous connecter</h1>
      )}
    </>
  )
}
