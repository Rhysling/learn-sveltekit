import { browser } from '$app/environment';
import type { JsonValue } from "$lib/types/utility";

function loadFromStorage(key: string) {
	if (!browser) return null;
	try {
		const raw = localStorage.getItem(key);
		return (raw ? JSON.parse(raw) : null) satisfies JsonValue;
	} catch {
		return null;
	}
}

function saveToStorage(key: string, item: JsonValue) {
	if (!browser) return;
	if (item === null) {
		localStorage.removeItem(key);
		return;
	}
	localStorage.setItem(key, JSON.stringify(item));
}

export class LocalstorageStore<T extends JsonValue> {
	key = "";
	#value = $state<T | null>(null);

	constructor(key: string) {
		this.key = key;
		this.#value = loadFromStorage(this.key);
	}

	get value() {
		return this.#value
	}

	set value(v) {
		this.#value = v;
		saveToStorage(this.key, v)
	}

	clear() {
		this.value = null;
		saveToStorage(this.key, null);
	}

}
