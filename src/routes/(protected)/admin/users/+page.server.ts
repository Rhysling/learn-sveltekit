import prisma from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import { hashPassword } from '$lib/server/auth';
import { stringSortFn } from "$lib/utils";
import type { Actions, PageServerLoad } from './$types';
import type { UserRemote, LoginRequestBody } from "../../../../lib/types/auth";
import type { UserModel } from '../../../../generated/prisma/models';

const emptyUser: UserRemote = {
	id: "",
	name: "",
	email: "",
	createdAt: new Date(),
	lastLoginAt: new Date(),
	isAdmin: false,
	isDisabled: false,
	hasPw: false,
};

export const load: PageServerLoad = async () => {
	const users: UserRemote[] = [
		{ ...emptyUser },
		...(await prisma.user.findMany())
			.map(a => ({
				id: a.id,
				name: a.name || "",
				email: a.email,
				createdAt: a.createdAt,
				lastLoginAt: a.lastLoginAt,
				isAdmin: a.isAdmin,
				isDisabled: a.isDisabled,
				hasPw: !!a.password
			}))
			.sort((a, b) => stringSortFn(a.name, b.name))
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
					isAdmin: user.isAdmin,
					isDisabled: user.isDisabled,
				},
			});

			return;
		}

		// Insert
		const um: Omit<UserModel, "id"> = {
			name: user.name,
			email: user.email,
			password: "",
			createdAt: new Date(),
			lastLoginAt: new Date(),
			isAdmin: false,
			isDisabled: false
		};

		await prisma.user.create({ data: um })
	},

	destroy: async ({ request }) => {
		const data = await request.formData();
		const userId = String(data.get("userId"));

		if (!userId) return fail(400, { error: 'Invalid user id.' });

		await prisma.user.delete({ where: { id: userId } });
	},

	savePw: async ({ request }) => {
		const data = await request.formData();
		const json = (data.get("loginRequestBody") || "") as string;
		if (!json)
			return fail(400, { error: "savePw data is missing." });

		const lrb = JSON.parse(json) as LoginRequestBody;
		lrb.email = (lrb.email || "").trim().toLowerCase();
		lrb.password = (lrb.password || "").trim();

		if (!lrb.email)
			return fail(400, { error: "User email is missing." });

		if (!lrb.password)
			return fail(400, { error: "User password is missing." });

		const user = await prisma.user.findUnique({ where: { email: lrb.email } });
		if (!user)
			return fail(400, { error: `User not found with email '${lrb.email}'.` });

		await prisma.user.update({
			where: {
				id: user.id,
			},
			data: {
				password: await hashPassword(lrb.password)
			},
		});
	}

};