import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createContext = async () => {
  return {
    prisma,
  };
};
