import type { AppRouter } from "../../server/src";
import { createTRPCReact, type inferReactQueryProcedureOptions } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
