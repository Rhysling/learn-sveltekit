import { getContext, setContext } from 'svelte';

const DUMMY_KEY = Symbol('user');

export class DummyStore {
	dummy = $state<string | null>(null);

	constructor(initial: string | null) {
		this.dummy = initial;
	}
}

export function setDummyContext(user: string | null): DummyStore {
	const store = new DummyStore(user);
	setContext(DUMMY_KEY, store);
	return store;
}

export function getDummyContext(): DummyStore {
	return getContext<DummyStore>(DUMMY_KEY);
}
