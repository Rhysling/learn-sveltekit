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

export const tempStore = new Temperature();