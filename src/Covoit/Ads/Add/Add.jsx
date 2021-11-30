import { collection, addDoc } from "firebase/firestore"
import { useContext } from "react"
import { useNavigate } from "react-router"

import { fireContext } from "../../../App"

export default function Add() {
  const { db } = useContext(fireContext)
  const navigate = useNavigate()

  function handleSubmit(e) {
    console.log(e)
    e.preventDefault()
    addDoc(collection(db, "ads"), {
      title: e.target[0].value,
      description: e.target[1].value,
    })
    navigate("/covoit")
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input required type="text" placeholder="Titre" id="test" />
        <textarea
          required
          cols="30"
          rows="10"
          placeholder="Description"
        ></textarea>
        <button type="submit">Ajouter une annonce</button>
      </form>
    </>
  )
}
