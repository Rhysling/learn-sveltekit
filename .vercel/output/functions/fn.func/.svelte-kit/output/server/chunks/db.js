import { PrismaClient } from "@prisma/client";
//#region src/lib/server/db.ts
var prisma = global.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
//#endregion
export { prisma as t };
