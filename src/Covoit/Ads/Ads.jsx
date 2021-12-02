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
    <>
      {ads.map((ad) => (
        <div key={ad.id} className="ad">
          {/* <h2 title={ad.description}>{ad.title}</h2> */}
          <hr />
        </div>
      ))}
    </>
  )
}
