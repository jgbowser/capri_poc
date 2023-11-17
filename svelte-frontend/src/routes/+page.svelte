<script lang="ts">
	import TextContainer from '$lib/components/TextContainer.svelte';
	let question: string | undefined;
	let answer: string | undefined;

	async function askTheAi() {
    //reset the values
		question = undefined;
		answer = undefined;

		//get the value of the input and assign it to the question variable
		question = document.querySelector('input')?.value;
		if (!question) return;

		const response = await fetch('http://localhost:3000/query', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: question
			})
		});
		const resAnswer = await response.json();
		answer = resAnswer.text ?? undefined;
	}
</script>

<main>
  <div class="main-content">
    <div class="convo">
      {#if question}
        <TextContainer content={question} align="left"/>
      {/if}
      {#if answer}
        <TextContainer content={answer} align="right"/>
      {/if}
    </div>
    <div class="controls">
      <input placeholder="What would you like to know?" />
      <button on:click={askTheAi}>Ask</button>
    </div>
  </div>
</main>

<style>
	main {
		padding: 1rem;
		height: 100%;
		width: 100%;
		background-color: #282a36;
		
	}

  .main-content {
    width: 100%;
    height: 100%;
    max-width: 1200px;
    margin: auto;
    display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
  }
	.convo {
		width: 80%;
		height: 75%;
		border: 3px solid #44475a;
		border-radius: 0.5rem;
		overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
	}

	.controls {
		display: flex;
		gap: 0rem;
		width: 80%;
		height: 3rem;
		justify-content: center;
		border-radius: 0.5rem;
		background-color: #44475a;
		overflow: hidden;
	}

	input {
		flex-basis: 85%;
		background: transparent;
		color: #f8f8f2;
		border: none;
		border-right: 3px solid #282a36;
		padding-left: 0.5rem;
	}

	input::placeholder {
		color: #f8f8f2b6;
	}

	button {
		flex-basis: 15%;
		background: transparent;
		color: #f8f8f2;
		border: none;
	}

	button:hover,
	button:active {
		background-color: #bd93f9;
	}
</style>
