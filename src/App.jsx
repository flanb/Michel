import "./App.scss"
import Chatbot from "./Chatbot/Chatbot"
import Btn from "./Btn/Btn"

function App() {
  return (
    <>
      <Btn onClick={() => (document.querySelector(".chatbot").style = null)}>
      Une question ?
      </Btn>
      <Chatbot />
    </>
  )
}

export default App
