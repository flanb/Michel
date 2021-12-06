import './Ads.scss'

import { collection, getDocs } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { fireContext } from "../../../App"
import { Link } from "react-router-dom"
// import { Loader } from "@googlemaps/js-api-loader"

// const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
// const loader = new Loader({
//   apiKey: FIREBASE_API_KEY,
//   version: "weekly",
// })
// let distanceService
// let duration
// loader.load().then((google) => {
//   distanceService = new google.maps.DistanceMatrixService()
// })

export default function Ads() {
  const { db, months, days } = useContext(fireContext)
  const [ads, setAds] = useState([])

  useEffect(() => {
    setAds([])
    getDocs(collection(db, 'ads')).then((ads) => {
      ads.forEach((ad) => {
        setAds((ads) => [...ads, ad.data()])
      })
    })
  }, [db])

  useEffect(() => {}, [])

  return (
    <div className="ads">
      {ads.map((ad, index) => {
        const date = new Date(ad.when.seconds * 1000)
        // if (distanceService) {
        //   distanceService.getDistanceMatrix(
        //     {
        //       origins: [ad.start],
        //       destinations: [ad.finish],
        //       travelMode: "DRIVING",
        //     },
        //     (response) => {
        //       duration = response.rows[0].elements[0].duration
        //     }
        //   )
        // }
        // console.log(duration)
        return (
          <Link to="add" key={index} className="ad">
            <div className="infos">
              <span className="date-start">
                {date.getHours()}:
                {date.getMinutes().toString().padStart(2, '0')}
              </span>
              <div className="point point-start"></div>
              <span className="start">{ad.start}</span>
              <span className="duration">1h00</span>
              <div className="line-container">
                <div className="line" />
              </div>
              <span className="date-finish">1:00</span>
              <div className="point point-end"></div>
              <span className="finish">{ad.finish}</span>
            </div>
            <span className="date">
              {days[date.getDay()]} {date.getDate()} {months[date.getMonth()]}
            </span>
            <span className="name">Michel</span>
            <span className="price">{ad.price}</span>
          </Link>
        )
      })}
    </div>
  )
}
