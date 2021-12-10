import "./User.scss"

import Btn from "../../components/Btn/Btn"
import { useContext, useEffect } from "react"
import { fireContext } from "../../App"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "firebase/auth"

export default function User() {
  const { cookies, setCookie, auth } = useContext(fireContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.user) {
      navigate("/login")
    }
  }, [cookies.user, navigate])


  function handleSubmit(e) {
    e.preventDefault()
    updateProfile(auth.currentUser, {
      displayName: e.target[0].value,
    })
      .then(() => {
        console.log(cookies.user)
        setCookie("user", {
          ...cookies.user,
          displayName: e.target[0].value,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="user">
        {cookies.user ? (
          <>
            <h1>Profil</h1>
            <p>
              Connecté en tant que{" "}
              {cookies.user.displayName 
                ? cookies.user.displayName
                : cookies.user.email}
            </p>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                placeholder="Pseudo"
                defaultValue={cookies.user.displayName}
              />
              <Btn type="submit">Valider</Btn>
            </form>
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
