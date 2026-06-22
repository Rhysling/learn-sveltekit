import { PrismaClient } from "../../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { env } from '$env/dynamic/private';

declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

const adapter = new PrismaBetterSqlite3({
	url: env.DATABASE_URL!,
});

const prisma = global.prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
