import "./Ads.scss"

import { collection, getDocs } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { fireContext } from "../../../App"
import { Link } from "react-router-dom"

export default function Ads() {
  const { db, months, days } = useContext(fireContext)
  const [adverts, setAdverts] = useState([])

  useEffect(() => {
    setAdverts([])
    //collect all adverts
    getDocs(collection(db, "ads")).then((ads) => {
      ads.forEach((ad) => {
        //convert to array
        setAdverts((adverts) => [
          ...adverts,
          {
            ...ad.data(),
            id: ad.id,
          },
        ])
      })
    })
  }, [db])

  return (
    <div className="ads">
      {adverts?.map((ad) => {
        const date = new Date(ad.when.seconds * 1000)
        const duration = new Date(ad.duration.seconds * 1000)
        const endDate = new Date(date.getTime() + duration.getTime())

        return (
          <Link to={ad.id} key={ad.id} className="ad">
            <div className="infos">
              <span className="date-start">
                {date.getHours()}h
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
                    "h" +
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
