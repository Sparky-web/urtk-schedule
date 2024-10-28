import { createTRPCRouter, publicProcedure } from "../../trpc";

export default createTRPCRouter({
    get: publicProcedure.query(({ ctx }) => {
        return ctx.db.group.findMany()
    })
})