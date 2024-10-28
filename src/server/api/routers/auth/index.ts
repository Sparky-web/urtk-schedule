import {z} from "~/lib/utils/zod-russian"


import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import createUser from './_lib/register-user';


export const authRouter = createTRPCRouter({
    register: publicProcedure.input(z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8),
    })).mutation(async ({ ctx, input }) => {
        const user = await createUser(input.name, input.email, input.password);
        return user;
    }),
});
