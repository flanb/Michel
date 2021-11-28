import "./App.scss"
import Covoit from "./Covoit/Covoit"
import Chatbot from "./Chatbot/Chatbot"
import { createContext, useEffect, useMemo, useState } from "react"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./Home/Home"

import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import Login from "./Login/Login"
import Register from "./Register/Register"

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
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ db }), [])
  const auth = getAuth()

  onAuthStateChanged(auth, (user) => {
    setUser(user)
  })

  const logInput =
    user === null ? (
      <>
        <Link to="/login">Se connecter</Link>
        <Link to="/register">S'inscrire</Link>
      </>
    ) : (
      <button
        onClick={(e) => {
          e.preventDefault()
          signOut(auth)
        }}
      >
        Se déconnecter
      </button>
    )

  return (
    <dbContext.Provider value={value}>
      {logInput}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/covoit" element={<Covoit />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Chatbot />
    </dbContext.Provider>
  )
}

export default App
