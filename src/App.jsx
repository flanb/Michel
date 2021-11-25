import "./App.scss"
import Covoit from "./Covoit/Covoit"
import Chatbot from "./Chatbot/Chatbot"
import Btn from "./Btn/Btn"

function App() {
  return (
    <>
      <button onClick={() => (document.querySelector(".chatbot").style = null)}>
        Une question ?
      </button>
      {/* <Btn>Une question ?</Btn> */}
      <Chatbot />
      <Covoit />
    </>
  )
}

export default App
