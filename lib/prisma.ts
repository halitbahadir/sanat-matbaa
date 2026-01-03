import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient | null = null;

function createPrismaClient() {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  } catch (error) {
    console.error("Failed to create Prisma Client:", error);
    return null;
  }
}

export const prisma = (() => {
  if (prismaInstance) {
    return prismaInstance;
  }

  try {
    prismaInstance = globalForPrisma.prisma ?? createPrismaClient();
    
    if (!prismaInstance) {
      // Return a mock client that doesn't throw
      return {
        user: {
          findUnique: async () => null,
          findMany: async () => [],
          create: async () => { throw new Error("Database not configured"); },
          count: async () => 0,
        },
        product: {
          findUnique: async () => null,
          findMany: async () => [],
          create: async () => { throw new Error("Database not configured"); },
          count: async () => 0,
        },
        order: {
          findUnique: async () => null,
          findMany: async () => [],
          create: async () => { throw new Error("Database not configured"); },
          count: async () => 0,
          aggregate: async () => ({ _sum: { total: 0 } }),
        },
      } as any;
    }

    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = prismaInstance;
    }

    return prismaInstance;
  } catch (error) {
    console.error("Failed to initialize Prisma Client:", error);
    // Return mock client
    return {
      user: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async () => { throw new Error("Database not configured"); },
        count: async () => 0,
      },
      product: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async () => { throw new Error("Database not configured"); },
        count: async () => 0,
      },
      order: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async () => { throw new Error("Database not configured"); },
        count: async () => 0,
        aggregate: async () => ({ _sum: { total: 0 } }),
      },
    } as any;
  }
})();
