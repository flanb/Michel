import './Covoit.scss'
import Ads from './Ads/Ads'

import { Link, useNavigate } from 'react-router-dom'
import { fireContext } from '../../App'
import { useContext, useEffect } from 'react'

export default function Covoit() {
  const { cookies } = useContext(fireContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!cookies.user) {
      navigate("/login")
    }
  }, [navigate, cookies.user])
  return (
    <>
      <div className="covoit">
        {cookies.user ? (
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
