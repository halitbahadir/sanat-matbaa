import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaInstance: PrismaClient | null = null;

function createPrismaClient() {
  try {
    // DATABASE_URL kontrolü - sadece server-side'da kontrol et
    if (typeof window === 'undefined' && !process.env.DATABASE_URL) {
      console.warn("⚠ DATABASE_URL environment variable is not set");
      return null;
    }
    
    // Client-side'da Prisma kullanma
    if (typeof window !== 'undefined') {
      return null;
    }

    const client = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });

    // Connection test (async, non-blocking)
    client.$connect().catch((error) => {
      console.error("⚠ Prisma connection warning:", error.message);
      if (error.code === 'P1001') {
        console.error("⚠ Database server unreachable. Check DATABASE_URL and Supabase connection settings.");
      }
    });

    return client;
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
      category: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async () => { throw new Error("Database not configured"); },
        count: async () => 0,
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
      category: {
        findUnique: async () => null,
        findMany: async () => [],
        create: async () => { throw new Error("Database not configured"); },
        count: async () => 0,
      },
    } as any;
  }
})();
