import "./Ads.scss"

import { collection, getDocs } from "firebase/firestore"
import { useContext, useEffect, useState } from "react"
import { fireContext } from "../../App"

export default function Ads() {
  const { db } = useContext(fireContext)
  const [ads, setAds] = useState([])

  useEffect(() => {
    setAds([])
    getDocs(collection(db, "ads")).then((ads) => {
      ads.forEach((ad) => {
        setAds((ads) => [...ads, ad.data()])
      })
    })
  }, [db])

  return (
    <div className="ads">
      {ads.map((ad, index) => (
        <div key={index} className="ad">
          <div className="infos">
            <span className="date-start">
              {new Date(ad.when.seconds).getHours()}
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
            {new Date(ad.when.seconds).getTime()} {ad.when.seconds}
          </span>
          <span className="user">Michel</span>
          <span className="price">{ad.price}</span>
        </div>
      ))}
    </div>
  )
}
