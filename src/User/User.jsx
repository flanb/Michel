import "./User.scss"

import { Link } from "react-router-dom"

export default function User() {
  return (
    <>
      <h2>User</h2>
      <Link to="/login">Se connecter</Link>
      <Link to="/register">S'inscrire</Link>
    </>
  )
}
