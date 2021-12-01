import "./User.scss"

import Btn from "../Btn/Btn"
import { useContext } from "react"
import { fireContext } from "../App"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function User() {
  const { user, auth } = useContext(fireContext)
  const navigate = useNavigate()

  return (
    <>
      {user ? (
        <>
          <h2>Connecté en tant que {user.email}</h2>
          <Btn onClick={() => signOut(auth)}>Se déconnecter</Btn>
        </>
      ) : (
        setTimeout(() => navigate("/login"), 1)
      )}
    </>
  )
}
