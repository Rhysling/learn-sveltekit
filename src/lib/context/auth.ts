import { createContext } from 'svelte';
import type { AuthTokenPayload } from '$lib/types/auth';

export const [getAuth, setAuth] = createContext<AuthTokenPayload>();