import "./Chatbot.scss"
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
      <h1>La réponse de Tac</h1>
      <ul />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          Request()
        }}
      >
        <input type="text" placeholder="Ex : Organiser mariage" />
        <button>
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.894 0.846646L1.16608 5.08929C0.907422 5.17187 0.724691 5.40308 0.704107 5.67383C0.68503 5.94488 0.832366 6.20039 1.07652 6.31965L6.55895 9.0208L9.28367 14.4797C9.37634 14.6674 9.55183 14.8007 9.75755 14.8396C9.96328 14.8786 10.1753 14.8186 10.3302 14.6777C10.4035 14.6034 10.4584 14.513 10.4905 14.4137L14.7331 1.68575C14.8099 1.44766 14.7469 1.18662 14.57 1.00973C14.3931 0.832841 14.1321 0.769868 13.894 0.846646ZM9.72209 12.4573L7.83647 8.68606L12.5505 3.97202L9.72209 12.4573ZM3.12242 5.85763L6.89366 7.74325L11.6313 3.00563L3.12242 5.85763Z"
              fill="white"
            />
          </svg>
        </button>
      </form>
    </>
  )
}

export default Chatbot
