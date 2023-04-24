import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { publicProcedure, router } from "./trpc";
import { createContext } from "./context";
import cors from "cors";

const appRouter = router({
  userList: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  getPosts: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  userById: publicProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: input,
      },
    });
    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ email: z.string().email(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { name, email } = input;
      const data = { name, email };
      const user = await ctx.prisma.user.create({
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
    .mutation(async ({ input, ctx }) => {
      const { title, content, authorId, published } = input;
      const data = { title, content, authorId, published };
      const post = await ctx.prisma.post.create({
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
