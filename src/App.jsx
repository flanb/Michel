import "./App.scss"
import Chatbot from "./Chatbot/Chatbot"

function App() {
  return (
    <>
      <button onClick={() => (document.querySelector(".chatbot").style = null)}>
        Une question ?
      </button>
      <Chatbot />
    </>
  )
}

export default App
