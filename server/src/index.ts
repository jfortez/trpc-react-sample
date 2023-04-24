import { PrismaClient } from "@prisma/client";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { createContext } from "./context";
import cors from "cors";

const prisma = new PrismaClient();

const appRouter = router({
  userList: publicProcedure.query(async ({ ctx }) => {
    const users = await prisma.user.findMany();
    return users;
  }),
  getPosts: publicProcedure.query(async ({ ctx }) => {
    const posts = await prisma.post.findMany();
    return posts;
  }),
  userById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const user = await prisma.user.findUnique({
      where: {
        id: input,
      },
    });
    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ email: z.string().email(), name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      const { name, email } = input;
      const data = { name, email };
      const user = await prisma.user.create({
        data,
      });
      return user;
    }),
  createPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        authorId: z.number(),
        published: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const { title, content, authorId, published } = input;
      const data = { title, content, authorId, published };
      const post = await prisma.post.create({
        data,
      });
      return post;
    }),
});

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext,
  middleware: cors(),
});

server.listen(3000);
