<script lang="ts">
  import OpenAI from "openai-api"

  const openai = new OpenAI(
    import.meta.env.VITE_OPENAI_API_KEY
      ? import.meta.env.VITE_OPENAI_API_KEY
      : process.env.VITE_OPENAI_API_KEY
  )
  let message = `Bonjour, je m'appelle Tac, je suis un robot développé par le gouvernement Français pour répondre à vos questions en rapport avec la maladie de la Covid 19. Comment puis-je vous aider ? \n\n`

  async function Request() {
    const response = document.createElement("li")
    response.innerHTML = document.querySelector("input").value
    response.classList.add("me")
    document.querySelector("ul").appendChild(response)
    document.querySelector("input").value = ""

    message += `\n\nQ: ${response.innerHTML}\nA:`
    console.log(message)
    const gptResponse = await openai.complete({
      engine: "ada",
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
</script>

<form
  on:submit={(e) => {
    e.preventDefault()
    Request()
  }}
>
  <input type="text" placeholder="Une question ?" /><button>Envoyer</button>
</form>
<h1>La réponse de Tac</h1>
<ul />

<style></style>
