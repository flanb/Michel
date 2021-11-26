import "./App.scss"
import Covoit from "./Covoit/Covoit"
import Chatbot from "./Chatbot/Chatbot"
import { createContext, useMemo } from "react"
import Btn from "./Btn/Btn"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./Home/Home"

import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAb3g-I-blWQV__bsrNCtlIUnvIIERm6Jc",
  authDomain: "michel-9f7da.firebaseapp.com",
  projectId: "michel-9f7da",
  storageBucket: "michel-9f7da.appspot.com",
  messagingSenderId: "843772325687",
  appId: "1:843772325687:web:ded0701cbaae94d93274b2",
  measurementId: "G-Y2GW4L9FBB",
}
const app = initializeApp(firebaseConfig)
const db = getFirestore()
// const analytics =
getAnalytics(app)
export const dbContext = createContext(db)

function App() {
  const value = useMemo(() => ({ db }), [])
  return (
    <dbContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/covoit" element={<Covoit />} />
      </Routes>

      <Btn onClick={() => (document.querySelector(".chatbot").style = null)}>
        Parler avec Michel
      </Btn>
      <Chatbot />
    </dbContext.Provider>
  )
}

export default App
