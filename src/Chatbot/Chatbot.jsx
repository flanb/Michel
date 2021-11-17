import "./Chatbot.scss"
import Textbar from "./Textbar/Textbar"
import Tag from "./Tag/Tag"
import Header from "./Header/Header"

import OpenAI from "openai-api"
const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY)
let message = `Bonjour 👋 Je m’appelle Tac, l’assistant virtuel de l’appli TousAntiCovid. Vous pouvez me demander toutes les informations liées aux restrictions sanitaires du gouvernement Français ou des informations sur la maladie Sars-Cov-2 (Covid-19). Vous pouvez cliquer sur les suggestions juste en bas ou alors taper directement votre demande. Comment puis-je vous aider ?\n\n`
function Chatbot() {
  async function Request() {
    const response = document.createElement("li")
    response.innerHTML = document.querySelector("input").value
    response.classList.add("me")
    document.querySelector("ul").appendChild(response)
    document.querySelector("input").value = ""

    message += `\n\nQ: ${response.innerHTML}\nA:`
    console.log(message)
    const gptResponse = await openai.complete({
      engine: "davinci",
      prompt: message,
      temperature: 0.9,
      maxTokens: 100,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0.6,
      stop: ["\n", "A:", "Q:"],
    })
    const list = document.createElement("li")
    list.innerHTML = gptResponse.data.choices[0].text
    document.querySelector("ul").appendChild(list)
    message += list.innerHTML
  }
  return (
    <>
      <Header />
      <ul />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          Request()
        }}
      >
        <span className="tags-label">Suggestions de recherche :</span>
        <div className="tags">
          <Tag>Cinéma</Tag>
          <Tag>Restaurant</Tag>
          <Tag>Mariage</Tag>
          <Tag>Théâtre</Tag>
        </div>
        <Textbar />
      </form>
    </>
  )
}

export default Chatbot
