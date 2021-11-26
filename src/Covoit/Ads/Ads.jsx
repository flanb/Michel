import "./Ads.scss"

import { collection, getDocs } from "firebase/firestore"
import { useContext } from "react"
import { dbContext } from "../../App"

export default function Ads() {
  const { db } = useContext(dbContext)
  async function getAds() {
    try {
      const querySnapshot = await getDocs(collection(db, "ads"))
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button onClick={() => getAds()}>Get ads</button>
    </>
  )
}
