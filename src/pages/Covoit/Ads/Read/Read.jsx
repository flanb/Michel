import './Read.scss'

import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { fireContext } from '../../../../App'
import { doc, getDoc } from 'firebase/firestore'

import Btn from '../../../../components/Btn/Btn'

export default function Read () {
  let { adsId } = useParams()
  const { db, days, months } = useContext(fireContext)
  const navigate = useNavigate()
  const [adData, setAdData] = useState({})
  const [date, setDate] = useState({})
  const docRef = doc(db, 'ads', adsId)

  useEffect(() => {
    getDoc(docRef)
      .then((ad) => {
        setAdData(ad.data())
      })
      .catch((e) => {
        console.error(e)
      })
  }, [docRef])

  //parse date
  useEffect(() => {
    if (adData) {
      setDate({
        date: new Date(adData?.when?.seconds * 1000),
        duration: new Date(adData.duration * 1000),
        endDate: new Date((adData?.when?.seconds + adData.duration) * 1000)
      })
    }
  }, [adData])

  return (
    <div className="read">
      <Btn className="back" onClick={() => navigate('/covoit')}>
        Revenir aux trajets
      </Btn>
      {adData ? (
        <>
          <h1>
            {days[date?.date?.getDay()]} {date?.date?.getDate()}{' '}
            {months[date?.date?.getMonth()]}
          </h1>
          <div className="infos">
            <span className="date-start">
              {date?.date?.getHours()}:
              {date?.date?.getMinutes().toString().padStart(2, '0')}
            </span>
            <div className="point point-start"></div>
            <span className="start">{adData.start}</span>
            <span className="duration">
              {date?.duration?.getHours() ? (
                <>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"/>
                    <path d="M9 4.5V9L12 10.5"/>
                  </svg>
                  {date?.duration?.getHours()} h{' '}
                  {date?.duration?.getMinutes().toString().padStart(2, '0')}
                </>
              ) : (
                'Trajet'
              )}
            </span>
            <div className="line-container">
              <div className="line"/>
            </div>
            <span className="date-finish">
              {date?.duration?.getHours()
                ? date?.endDate?.getHours() +
                ':' +
                date?.endDate?.getMinutes().toString().padStart(2, '0')
                : 'inconnu'}
            </span>
            <div className="point point-end"></div>
            <span className="finish">{adData.finish}</span>
          </div>
          <hr/>
          <div className="priceuser-container">
            <div className="price">
              Prix total <span>{adData.price}</span>
            </div>
            <div className="user">
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 19V17C17 14.7909 15.2091 13 13 13H5C2.79086 13 1 14.7909 1 17V19"/>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
                />
              </svg>
              <span>{adData.user}</span>
            </div>
          </div>
          <div className="description">
            Description <p>{adData.description}</p>
          </div>
        </>
      ) : (
        <div className="read-error">
          <h1>Voyage Introuvable</h1>
          <span>Le voyage <b>{adsId}</b> n'existe pas.</span>
        </div>
      )}
    </div>
  )
}
