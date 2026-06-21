import prisma from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import type { UserRemote, LoginRequestBody } from "../../../lib/types/auth";
import type { UserModel } from '../../../generated/prisma/models';

const emptyUser: UserRemote = {
	id: "",
	name: "",
	email: "",
	createdAt: new Date(),
	hasPw: false,
};

const sortFn = (a: string, b: string) => {
	if (a > b) return 10;
	if (a < b) return -10;
	return 0;
};

export const load: PageServerLoad = async () => {
	const users: UserRemote[] = [
		{ ...emptyUser },
		...(await prisma.user.findMany())
			.map(a => ({ id: a.id, name: a.name || "", email: a.email, createdAt: a.createdAt, hasPw: !!a.password }))
			.sort((a, b) => sortFn(a.name, b.name))
	];

	return { users };
};

export const actions: Actions = {
	save: async ({ request }) => {
		const data = await request.formData();
		const userJson = (data.get("user") || "") as string;
		if (!userJson)
			return fail(400, { error: "User is missing." });

		const user = JSON.parse(userJson) as UserRemote;

		user.email = (user.email || "").trim().toLowerCase();
		if (!user.email)
			return fail(400, { error: "User email is missing." });

		// Update
		if (user.id) {
			let existing = await prisma.user.findUnique({ where: { email: user.email } });
			if (existing && existing.id !== user.id) {
				return fail(409, { error: "This email is already registered." });
			}

			await prisma.user.update({
				where: {
					id: user.id,
				},
				data: {
					name: user.name || "",
					email: user.email,
				},
			});

			return;
		}

		// Insert
		const um: UserModel = {
			id: user.id,
			name: user.name,
			email: user.email,
			password: "",
			createdAt: new Date()
		};

		await prisma.user.create({ data: um })
	},

	destroy: async ({ request }) => {
		const data = await request.formData();
		const userId = String(data.get("userId"));

		if (!userId) return fail(400, { error: 'Invalid user id.' });

		await prisma.user.delete({ where: { id: userId } });
	}
};