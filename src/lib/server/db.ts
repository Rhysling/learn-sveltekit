import { PrismaClient } from "../../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { DATABASE_URL } from '$env/static/private';

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

const adapter = new PrismaBetterSqlite3({
	url: DATABASE_URL,
});

const prisma = global.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
