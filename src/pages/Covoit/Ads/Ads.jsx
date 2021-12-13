import "./Ads.scss"

import { collection, getDocs } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { fireContext } from "../../../App"
import { Link } from "react-router-dom"
import { Loader } from "@googlemaps/js-api-loader"

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY
const loader = new Loader({
  apiKey: FIREBASE_API_KEY,
  version: "weekly",
})
let distanceService
loader.load().then((google) => {
  distanceService = new google.maps.DistanceMatrixService()
})

export default function Ads() {
  const { db, months, days, setCookie, cookies } = useContext(fireContext)
  const [adverts, setAdverts] = useState([])

  useEffect(() => {
    setAdverts([])
    //collect all adverts
    getDocs(collection(db, "ads")).then((ads) => {
      ads.forEach((ad) => {
        //collect duration between start and finish location
        distanceService.getDistanceMatrix(
          {
            origins: [ad.data().start],
            destinations: [ad.data().finish],
            travelMode: "DRIVING",
          },
          (response) => {
            //convert to array
            setAdverts((adverts) => [
              ...adverts,
              {
                ...ad.data(),
                duration: response?.rows[0]?.elements[0]?.duration?.value,
                id: ad.id,
              },
            ])
          }
        )
      })
    })
  }, [db])

  //set cookie to remember ads list
  useEffect(() => {
    setCookie("ads", adverts, { path: "/" })
  }, [adverts, setCookie])

  return (
    <div className="ads">
      {cookies.ads?.map((ad) => {
        const date = new Date(ad.when.seconds * 1000)
        const duration = new Date(ad.duration * 1000)
        const endDate = new Date(date.getTime() + duration.getTime())

        return (
          <Link to={ad.id} key={ad.id} className="ad">
            <div className="infos">
              <span className="date-start">
                {date.getHours()}:
                {date.getMinutes().toString().padStart(2, "0")}
              </span>
              <div className="point point-start"></div>
              <span className="start">{ad.start}</span>
              <span className="duration">
                {duration.getHours()
                  ? duration.getHours() +
                    "h" +
                    duration.getMinutes().toString().padStart(2, "0")
                  : "Trajet"}
              </span>
              <div className="line-container">
                <div className="line" />
              </div>
              <span className="date-finish">
                {duration.getHours()
                  ? endDate.getHours() +
                    ":" +
                    endDate.getMinutes().toString().padStart(2, "0")
                  : "inconnu"}
              </span>
              <div className="point point-end"></div>
              <span className="finish">{ad.finish}</span>
            </div>
            <span className="date">
              {days[date.getDay()]} {date.getDate()} {months[date.getMonth()]}
            </span>
            <span className="name">{ad.user ? ad.user : "Anonyme"}</span>
            <span className="price">{ad.price}</span>
          </Link>
        )
      })}
    </div>
  )
}
