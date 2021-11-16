<script lang="ts">
  import { onMount } from "svelte"
  import OpenAI from "openai-api"

  const openai = new OpenAI(
    "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"
  )
  let message = `Bonjour, je m'appelle Tac, je suis un robot développé par le gouvernement Français pour répondre à vos questions en rapport avec la maladie de la Covid 19. Comment puis-je vous aider ? \n\n`
  onMount(() => {
    document.querySelector("button").addEventListener("click", async () => {
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
    })
  })
</script>

<svelte:head>
  <title>TousAntiCovid</title>
</svelte:head>

<form on:submit={(e) => e.preventDefault()}>
  <input type="text" placeholder="Une question ?" /><button>Envoyer</button>
</form>
<h1>La réponse du boss</h1>
<ul />

<style>
 
</style>
