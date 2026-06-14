import type { ImageMetadata } from "./media";

export interface AuthTokenPayload {
	userId: string;
	email: string;
	name?: string;
}

export interface SessionUser {
	email: string;
	name?: string;
}

export interface RouteData {
	user: SessionUser | null;
}

export type RouteDataImg = {
	user: SessionUser;
	images: ImageMetadata[];
};

export interface LoginRequestBody {
	email: string;
	password: string;
}

export interface RegisterRequestBody extends LoginRequestBody {
	name?: string;
}

export interface AuthResponse {
	message: string;
	error?: string;
}
