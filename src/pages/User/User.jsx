import "./User.scss"

import Btn from "../../components/Btn/Btn"
import { useContext, useEffect } from "react"
import { fireContext } from "../../App"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export default function User() {
  const { cookies, setCookie, auth } = useContext(fireContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.user) {
      navigate("/login")
    }
  }, [cookies.user, navigate])

  return (
    <>
      <div className="user">
        {cookies.user ? (
          <>
            <h1>Profil</h1>
            <p>Connecté en tant que {cookies.user.email}</p>

            <Btn
              onClick={() => {
                signOut(auth)
                setCookie("user", "", -1)
              }}
            >
              Se déconnecter
            </Btn>
          </>
        ) : null}
      </div>
    </>
  )
}
