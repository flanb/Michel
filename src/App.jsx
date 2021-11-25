import "./App.scss"
import Covoit from "./Covoit/Covoit"
import Chatbot from "./Chatbot/Chatbot"
import Btn from "./Btn/Btn"

function App() {
  return (
    <>
      <Btn onClick={() => (document.querySelector(".chatbot").style = null)}>
      Une question ?
      </Btn>
      <Chatbot />
      <Covoit />
    </>
  )
}

export default App
