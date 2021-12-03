import './Covoit.scss'
import Ads from './Ads/Ads'

import { Link, useNavigate } from 'react-router-dom'
import { fireContext } from '../App'
import { useContext, useEffect } from 'react'

export default function Covoit() {
  const { user } = useContext(fireContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])
  return (
    <>
      <div className="covoit">
        {user ? (
          <>
            <h1>En voiture Michel !</h1>
            <Link to="add">Publier un trajet</Link>

            <Ads></Ads>
          </>
        ) : null}
      </div>
    </>
  )
}
