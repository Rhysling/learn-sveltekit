import type { AuthTokenPayload } from '$lib/types/auth';

declare global {
	namespace App {
		interface Locals {
			user: AuthTokenPayload | null;
		}
	}
}

export { };