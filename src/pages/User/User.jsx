import "./User.scss"

import Btn from "../../components/Btn/Btn"
import { useContext, useEffect } from "react"
import { fireContext } from "../../App"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import {
  updateProfile,
  // updateEmail,
  // reauthenticateWithCredential,
} from "firebase/auth"

export default function User() {
  const { cookies, setCookie, auth } = useContext(fireContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.user) {
      navigate("/login")
    }
  }, [cookies.user, navigate])

  function updatePseudo(e) {
    updateProfile(auth.currentUser, {
      displayName: e.target[0].value,
    })
      .then(() => {
        setCookie("user", {
          ...cookies.user,
          displayName: e.target[0].value,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  // function updateEmailSubmit(e) {
  //   reauthenticateWithCredential(cookies.user.email, "aaaaaaaa")
  //     .then(() => {
  //       updateEmail(auth.currentUser, e.target[0].value)
  //         .then(() => {
  //           setCookie("user", {
  //             ...cookies.user,
  //             email: e.target[0].value,
  //           })
  //         })
  //         .catch((error) => {
  //           console.error(error)
  //         })
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  // }

  return (
    <>
      <div className="user-page">
        {cookies.user ? (
          <>
            <h1>Profil</h1>
            <p>
              Connecté en tant que{" "}
              <b>
                {cookies.user.displayName
                  ? cookies.user.displayName
                  : cookies.user.email}
              </b>
            </p>
            <Btn
              onClick={() => {
                signOut(auth)
                setCookie("user", "", -1)
              }}
            >
              Se déconnecter
            </Btn>
            <div className="form-container">
              <h3>Définir un pseudo</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  updatePseudo(e)
                }}
              >
                <input
                  type="text"
                  placeholder="Pseudo"
                  defaultValue={cookies.user.displayName}
                />
                <Btn type="submit">Valider</Btn>
              </form>
            </div>
            {/* <div className="form-container">
              <h3>Changer d'adresse mail</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  updateEmailSubmit(e)
                }}
              >
                <input
                  type="text"
                  placeholder="Adresse mail"
                  defaultValue={cookies.user.email}
                />
                <Btn type="submit">Valider</Btn>
              </form>
            </div> */}
          </>
        ) : null}
      </div>
    </>
  )
}
