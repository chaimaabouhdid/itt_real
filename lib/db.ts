import {PrismaClient} from "@prisma/client";

// Declare a global variable "prisma" with type PrismaClient or undefined
declare global {
    var prisma: PrismaClient | undefined;
};
// Initialize db variable with global prisma or create a new PrismaClient instance
export const db = globalThis.prisma || new PrismaClient();

// If not in production environment, assign db to global prisma
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
