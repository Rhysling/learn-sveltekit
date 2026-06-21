import type { ImageMetadata } from "./media";
import type { UserModel } from "../../generated/prisma/models/User";

type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export interface AuthTokenPayload {
	userId: string;
	email: string;
	name?: string;
}

export interface RouteData {
	user: AuthTokenPayload | null;
	currentPath?: string;
	redirectTo?: string;
}

export type RouteDataImg = {
	user: AuthTokenPayload;
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

export type UserRemote = Prettify<Omit<UserModel, "password"> & { hasPw: boolean }>;