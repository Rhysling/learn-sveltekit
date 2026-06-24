import { createContext } from 'svelte';

type EditMode = {
	isActive: boolean;
	toggle: () => void;
};

export const [getEditMode, setEditMode] = createContext<EditMode>();