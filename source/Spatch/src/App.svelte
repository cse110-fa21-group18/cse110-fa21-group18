<script>
	export let name;
</script>

<main>
	<div class="base">
		<h1>Hello {name}!</h1>
		<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>									
	</div>


	<ul>
		<li>
			Create everything in a new component
			<ol>
				<li>create new .svelte file</li>
				<li>import that file into App.svelte</li>
				<li>attach dispatchers - work like event emitters - dont worry about this if it doesnt make sense rn I can explain</li>
				<li>create tag named after svelte file</li>
			</ol>
		</li>
		<li>
			can style with bootstrap or material ui, There are svelt versions I have checked. design team will design on which package and handle theming. UI dev just implement data fields and design team can style based on material ui / bootstrap etc
		</li>
		<li>some basics of svelte
			<ul>
				<li>
					3 sections of a svelte file: script, style, html. it has a main tag but html does not have to be written in it I tried.
				</li>
				<li>style is just css code</li>
				<li>script is just reg javascript</li>
				<li>main is html with some differences. onclick become on:click. event binding is on:event syntax. details can be looked up later</li>
			</ul>
		</li>
	</ul>
</main>

<style>
	.base {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>