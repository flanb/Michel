import "./App.scss"
import Covoit from "./Covoit/Covoit"
import Chatbot from "./Chatbot/Chatbot"
import { createContext, useMemo, useState } from "react"
import { Routes, Route, NavLink } from "react-router-dom"
import Home from "./Home/Home"

import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import Login from "./User/Login/Login"
import Register from "./User/Register/Register"
import Add from "./Covoit/Ads/Add/Add"
import User from "./User/User"
import { useCookies } from "react-cookie"

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "michel-9f7da.firebaseapp.com",
  projectId: "michel-9f7da",
  storageBucket: "michel-9f7da.appspot.com",
  messagingSenderId: "843772325687",
  appId: "1:843772325687:web:ded0701cbaae94d93274b2",
  measurementId: "G-Y2GW4L9FBB",
}
const app = initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()
getAnalytics(app)
export const fireContext = createContext()

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
]
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]
const activeStyle = {
  backgroundColor: "#bfaed9",
  color: "#1e1e1d",
}

function App() {
  const [user, setUser] = useState(null)
  const [cookies, setCookie] = useCookies(["user"])
  const value = useMemo(
    () => ({ cookies, setCookie, days, months, auth, db, user }),
    [user, cookies, setCookie]
  )

  onAuthStateChanged(auth, (user) => {
    setUser(user)
  })

  return (
    <fireContext.Provider value={value}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/covoit" element={<Covoit />} />
        <Route path="/covoit/add" element={<Add />} />
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Chatbot />

      <div className="navbar">
        <NavLink
          to="/"
          style={({ isActive }) => {
            if (isActive) {
              return activeStyle
            }
          }}
        >
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H13" />
            <path d="M7 21V11H13V21" />
          </svg>Accueil
        </NavLink>
        <NavLink
          to="/covoit"
          style={({ isActive }) => {
            if (isActive) {
              return activeStyle
            }
          }}
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 10L20 1L11 20L9 12L1 10Z" />
          </svg>Covoit
        </NavLink>
        <NavLink
          to="/user"
          style={({ isActive }) => {
            if (isActive) {
              return activeStyle
            }
          }}
        >
          <svg
            width="18"
            height="20"
            viewBox="0 0 18 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 19V17C17 14.7909 15.2091 13 13 13H5C2.79086 13 1 14.7909 1 17V19" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 9C11.2091 9 13 7.20914 13 5C13 2.79086 11.2091 1 9 1C6.79086 1 5 2.79086 5 5C5 7.20914 6.79086 9 9 9Z"
            />
          </svg>
          Profil
        </NavLink>
      </div>
    </fireContext.Provider>
  )
}

export default App
