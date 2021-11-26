import "./Covoit.scss"
import { Link, Routes, Route } from "react-router-dom"
import Register from "./Register/Register"
import Login from "./Login/Login"
import Ads from "./Ads/Ads"

export default function Covoit() {
  return (
    <>
      <h1>En voiture Michelle !</h1>
      {/* <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/ads" element={<Ads/>} />
      </Routes> */}
    </>
  )
}
