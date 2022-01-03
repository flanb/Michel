import "./Add.scss"

import { addDoc, collection } from "firebase/firestore"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router"
import Btn from "../../../../components/Btn/Btn"
import { Link } from "react-router-dom"
import { fireContext } from "../../../../App"
import { Loader } from "@googlemaps/js-api-loader"

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const loader = new Loader({
  apiKey: FIREBASE_API_KEY,
  version: "weekly"
})
let distanceService
loader.load().then((google) => {
  distanceService = new google.maps.DistanceMatrixService()
})

export default function Add () {
  const { db, cookies } = useContext(fireContext)
  const navigate = useNavigate()

  function handleSubmit (e) {
    e.preventDefault()
    //TODO : better error handling
    distanceService.getDistanceMatrix(
      {
        origins: [e.target[0].value],
        destinations: [e.target[1].value],
        travelMode: "DRIVING"
      },
      (response) => {
        if (!response) {
          alert("Erreur de connexion")
        }
        if (response.desinationAddresses || response.originAddresses) {
          addDoc(collection(db, "ads"), {
            start: e.target[0].value,
            finish: e.target[1].value,
            when: new Date(e.target[2].value),
            price: parseFloat(e.target[3].value),
            user: cookies.user.displayName
              ? cookies.user.displayName
              : cookies.user.email,
            //TODO : ask Maxence about call another one api to get user name
            userId: cookies.user.uid,
            description: e.target[4].value,
            duration: new Date(response.rows[0].elements[0].duration.value * 1000)
          }).then(() => {
            navigate("/covoit")
          })
            .catch((err) => {
              console.error(err)
            })
        } else {
          alert("Adresse de départ ou d'arrivée invalide")
        }
      }
    )
  }


  useEffect(() => {
    if (!cookies.user) {
      navigate("/login")
    }
  }, [navigate, cookies.user])

  return (
    <>
      {cookies.user ? (
        <div className="add">
          <Link to="/covoit" className="back">
            Retour
          </Link>
          <h1>Publier un trajet</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              D'où partez-vous ?
              <input required type="text" placeholder="Départ"/>
            </label>
            <label>
              Où allez-vous ?
              <input required type="text" placeholder="Arrivée"/>
            </label>
            <label>
              Quand partez-vous ?
              <input required type="date"
                     min={new Date().toISOString().split("T")[0]}
                     placeholder="Date"/>
            </label>
            <label className="price">
              Prix ?
              <input required type="number" placeholder="Prix" maxLength="2"/>
            </label>
            <label>
              Description
              <textarea
                required
                placeholder="Modèle et couleur du véhicule, chemin particulier, commentaires, etc…"
              />
            </label>
            <Btn type="submit">Ajouter une annonce</Btn>
          </form>
        </div>
      ) : null}
    </>
  )
}
