import { prisma } from "./db";

export const createContext = async () => {
  return {
    prisma,
  };
};
