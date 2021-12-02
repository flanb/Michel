import { collection, addDoc } from 'firebase/firestore'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import Btn from '../../../Btn/Btn'
import { fireContext } from '../../../App'
import './Add.scss'

export default function Add() {
  const { db } = useContext(fireContext)
  const navigate = useNavigate()

  function handleSubmit(e) {
    console.log(e)
    e.preventDefault()
    addDoc(collection(db, 'ads'), {
      title: e.target[0].value,
      description: e.target[1].value,
    })
    navigate('/covoit')
  }

  return (
    <>
      <div className="add">
        <div className="form-container-add">
          <h1>Publier un trajet</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label>
              D'où partez-vous ?
              <input required type="text" placeholder="Titre" />
            </label>
            <label>
              Où allez-vous ?
              <input required type="text" placeholder="Titre" id="test" />
            </label>
            <label>
              Temps de trajet ?
              <input required type="text" placeholder="Titre" id="test" />
            </label>
            <label>
              Quand partez-vous ?
              <input required type="text" placeholder="Titre" id="test" />
            </label>
            <label>
              à quelle heure souhaitez-vous retouvrer vos passagers ?
              <input required type="text" placeholder="Titre" id="test" />
            </label>
            <label>
              Combien de passagers pouvez-vous accepter ?
              <input required type="text" placeholder="Titre" id="test" />
            </label>
            <label>
              Prix ?
              <input required type="text" placeholder="Titre" id="test" />
            </label>
            <Btn type="submit">Ajouter une annonce</Btn>
          </form>
        </div>
      </div>
    </>
  )
}
