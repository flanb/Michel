import "./App.scss"
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
    </>
  )
}

export default App
