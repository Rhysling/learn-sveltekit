<script lang="ts">
	import { tempStore } from "$lib/context/temperature-store.svelte";
	let total = 100;
	let spent = $state(0);

	const left = {
		get value() {
			return total - spent;
		},
		set value(v: number) {
			spent = total - v;
		},
	};

	let celsius = $state({
		_value: 0,
		get value() {
			return this._value;
		},
		set value(v) {
			this._value = v;
			farenheit._value = v * (9 / 5) + 32;
		},
	});
	let farenheit = $state({
		_value: 32,
		get value() {
			return this._value;
		},
		set value(v) {
			this._value = v;
			celsius._value = ((v - 32) * 5) / 9;
		},
	});

	class Temperature {
		#celsius = $state(0);
		#farenheit = $state(32);

		get celsius() {
			return this.#celsius;
		}
		set celsius(v) {
			this.#celsius = v;
			this.#farenheit = v * (9 / 5) + 32;
		}

		get farenheit() {
			return this.#farenheit;
		}
		set farenheit(v) {
			this.#farenheit = v;
			this.#celsius = ((v - 32) * 5) / 9;
		}
	}

	const temp = new Temperature();
</script>

<div class="content">
	<div class="group">
		<div class="group-title">Using Object</div>
		<label>
			<input type="range" bind:value={spent} max={total} />
			<div>Spent: {spent} / {total}</div>
		</label>

		<label>
			<input type="range" bind:value={left.value} max={total} />
			<div>Left: {left.value} / {total}</div>
		</label>
	</div>

	<div class="group">
		<div class="group-title">Using Object (weird)</div>
		<div>c: <input type="number" bind:value={celsius.value} /></div>
		<div>f: <input type="number" bind:value={farenheit.value} /></div>
	</div>

	<div class="group">
		<div class="group-title">Using Class</div>
		<div>c: <input type="number" bind:value={temp.celsius} /></div>
		<div>f: <input type="number" bind:value={temp.farenheit} /></div>
	</div>

	<div class="group">
		<div class="group-title">Using tempStore</div>
		<div>c: <input type="number" bind:value={tempStore.celsius} /></div>
		<div>f: <input type="number" bind:value={tempStore.farenheit} /></div>
	</div>
</div>

<style lang="scss">
	@use "../../../lib/styles/custom-variables" as c;

	.content {
		margin: 2rem auto;
		padding: 1rem;
		max-width: min(800px, 80vw);
		border: 2px solid var(--main-lighter);
		border-radius: var(--radius);
		// color: var(--main-lighter);
		// font-weight: bold;
		// font-size: 2rem;

		label {
			display: block;
		}

		.group {
			margin: 1rem;
			padding: 1rem;
			border: 2px solid var(--main-darker);
			border-radius: calc(var(--radius) / 2);
		}

		.group-title {
			font-weight: bold;
		}

		@media only screen and (width <= c.$bp-small) {
			font-size: 0.85rem;
		}
	}
</style>
