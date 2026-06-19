import { browser } from '$app/environment';

const STORAGE_KEY = 'dummy-store';

function loadFromStorage(): string[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function saveToStorage(items: string[]) {
	if (!browser) return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

class DummyStore {
	dummy = $state<string[]>(loadFromStorage());

	add(item: string) {
		this.dummy = [...this.dummy, item];
		saveToStorage(this.dummy);
	}

	clear() {
		this.dummy = [];
		saveToStorage(this.dummy);
	}

	removeLast() {
		if (this.dummy.length > 0) {
			this.dummy = this.dummy.slice(0, -1);
			saveToStorage(this.dummy);
		}
	}
}

export const dummyStore = new DummyStore();
