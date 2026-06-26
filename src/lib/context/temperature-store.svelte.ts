import { LocalstorageStore } from "../context/localstorage-store.svelte";

type TempVal = {
	c: number;
	f: number;
};

class Temperature {
	#lst: LocalstorageStore<TempVal> | undefined;
	#celsius = $state(0);
	#fahrenheit = $state(32);

	constructor(localStore?: LocalstorageStore<TempVal>) {
		if (localStore) {
			this.#lst = localStore;
			this.#celsius = this.#lst.value ? this.#lst.value.c : 0;
			this.#fahrenheit = this.#lst.value ? this.#lst.value.f : 32;
		}

	}

	get celsius() {
		return this.#celsius;
	}
	set celsius(v) {
		this.#celsius = v;
		this.#fahrenheit = v * (9 / 5) + 32;
		if (this.#lst) this.#lst.value = { c: this.#celsius, f: this.#fahrenheit };
	}

	get fahrenheit() {
		return this.#fahrenheit;
	}
	set fahrenheit(v) {
		this.#fahrenheit = v;
		this.#celsius = ((v - 32) * 5) / 9;
		if (this.#lst) this.#lst.value = { c: this.#celsius, f: this.#fahrenheit };
	}
}

export const tempStore = new Temperature();
export const tempStoreLs = new Temperature(new LocalstorageStore("tsKey", { c: 0, f: 32 }));