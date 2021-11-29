import "./Ads.scss"

import { collection, getDocs } from "firebase/firestore"
import { useContext, useState } from "react"
import { fireContext } from "../../App"

export default function Ads() {
  const { db, user } = useContext(fireContext)
  const [ads, setAds] = useState([])

  function handleClick() {
    getDocs(collection(db, "ads")).then((ads) => {
      ads.forEach((ad) => {
        setAds((ads) => [...ads, ad.data()])
      })
    })
  }
  console.log(ads)
  return (
    <>
      <button onClick={handleClick}>Get ads</button>
      {ads.map((ad) => (
        <div key={ad.id} className="ad">
          <h2 onClick={() => console.log(ad.description)}>{ad.title}</h2>
        </div>
      ))}
    </>
  )
}
