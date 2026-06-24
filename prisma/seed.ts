import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { hashSync } from 'bcryptjs';

const adapter = new PrismaBetterSqlite3({
	url: process.env.DATABASE_URL ?? 'file:./dev.db',
});
const prisma = new PrismaClient({ adapter });

async function main() {
	// Create users
	const able = await prisma.user.upsert({
		where: { email: 'able@example.com' },
		update: {},
		create: {
			email: 'able@example.com',
			name: 'Able Example',
			password: hashSync('password123', 10),
			isAdmin: true,
		},
	});

	const baker = await prisma.user.upsert({
		where: { email: 'baker@example.com' },
		update: {},
		create: {
			email: 'baker@example.com',
			name: 'Baker Example',
			password: hashSync('password123', 10),
		},
	});

	// Create notes with authors
	await prisma.note.createMany({
		data: [
			{ body: 'First note from Able', authorId: able.id },
			{ body: 'Second note from Able', authorId: able.id },
			{ body: 'Baker\'s first note', authorId: baker.id },
		],
	});

	console.log('Seeded: 2 users, 3 notes');
}

main()
	.catch((e) => { console.error(e); process.exit(1); })
	.finally(() => prisma.$disconnect());
