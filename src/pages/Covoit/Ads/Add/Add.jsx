import { collection, addDoc } from "firebase/firestore"
import { useContext } from "react"
import { useNavigate } from "react-router"
import Btn from "../../../../components/Btn/Btn"
import { Link } from "react-router-dom"
import { fireContext } from "../../../../App"
import "./Add.scss"

export default function Add() {
  const { db } = useContext(fireContext)
  const navigate = useNavigate()

  function handleSubmit(e) {
    console.log(e)
    e.preventDefault()
    addDoc(collection(db, "ads"), {
      start: e.target[0].value,
      finish: e.target[1].value,
      when: new Date(e.target[2].value),
      price: parseFloat(e.target[3].value),
    })
    navigate("/covoit")
  }

  return (
    <>
      <div className="add">
        <Link to="/covoit" className="back">
          Retour
        </Link>
        <h1>Publier un trajet</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            D'où partez-vous ?
            <input required type="text" placeholder="Départ" />
          </label>
          <label>
            Où allez-vous ?
            <input required type="text" placeholder="Arrivée" />
          </label>
          <label>
            Quand partez-vous ?
            <input required type="datetime-local" placeholder="Date" />
          </label>
          {/* <label>
              Combien de passagers pouvez-vous accepter ?
              <input required type="text" placeholder="Titre" />
            </label> */}
          <label className="price">
            Prix ?
            <input required type="number" placeholder="Prix" maxLength="2" />
          </label>
          <Btn type="submit">Ajouter une annonce</Btn>
        </form>
      </div>
    </>
  )
}
