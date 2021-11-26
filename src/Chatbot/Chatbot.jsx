import "./Chatbot.scss"
import Textbar from "./Textbar/Textbar"
import Tag from "./Tag/Tag"
import Header from "./Header/Header"
import Btn from "../Btn/Btn"

import OpenAI from "openai-api"
const openai = new OpenAI(process.env.REACT_APP_OPENAI_API_KEY)
let msg = `Bonjour, je m’appelle Michel. Tu peux me poser des questions sur les bons plans, prochaines soirées et avantages adhérents. Comment puis-je t'aider ?\n\nQ: Le masque, est-il obligatoire ?\nA: Oui, le masque est obligatoire pour tout les événements prévu\n\nQ: Comment vas-tu ?\nA: Je vais bien, mais je commence à me faire vieux\n\nQ: Quel est la prochaine soirée ?\nA: La prochaine soirée est le bal de Noël qui sera organisé le 16 décembre.\n\nQ: Quel sont les bons plans ?\nA: Tu peux profiter de l'happy hour de 12h à 2h du matin au pub saint aubin sur présentation de ta carte adhérent.`
const date = new Date()

export async function Request() {
  const response = document.createElement("div")
  const content = document.querySelector(".msg-content")
  let inputValue = document.querySelector("input")

  response.innerHTML = inputValue.value
  response.classList.add("me-msg")
  content.appendChild(response)
  inputValue.value = ""

  msg += `\n\nQ: ${response.innerHTML}\nA:`
  console.log(msg)
  const gptResponse = await openai.complete({
    engine: "davinci",
    temperature: 0.9,
    prompt: msg,
    maxTokens: 100,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0.6,
    stop: ["\n", "A:", "Q:"],
  })
  const list = document.createElement("div")
  list.classList.add("bot-msg")
  list.innerHTML = gptResponse.data.choices[0].text
  content.appendChild(list)
  msg += list.innerHTML
  content.scrollTop = content.scrollHeight
}
function Chatbot() {
  return (
    <>
      <button
        className="btn-float"
        onClick={() => (document.querySelector(".chatbot").style = null)}
      >
        Michel
      </button>
      <div className="chatbot" style={{ transform: "translateY(100%)" }}>
        <Header />
        <div className="msg-content">
          <div className="head">
            <span className="date">
              {date.getHours()}:{date.getMinutes().toString().padStart(2, "0")}
            </span>
            <span>Parler avec Michel</span>
            {
              //svg
            }
          </div>
          <div className="bot-msg">
            Salut 👋 Je m’appelle Michel, <br /> Tu peux me poser tout type de
            questions concernant les événements à venir et bons plans BDE
          </div>
          <div className="bot-msg">
            Tu peux cliquer sur les suggestions juste en bas ou alors taper
            directement ta demande
          </div>
          <div className="bot-msg">Comment puis-je t'aider ?</div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            Request()
          }}
        >
          <span className="tags-label">Suggestions de recherche :</span>
          <div className="tags">
            <Tag>Bons plans</Tag>
            <Tag>Prochaine soirée</Tag>
            <Tag>Cette semaine</Tag>
          </div>
          <Textbar />
        </form>
      </div>
    </>
  )
}

export default Chatbot
