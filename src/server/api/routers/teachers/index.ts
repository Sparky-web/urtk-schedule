import { createTRPCRouter, publicProcedure } from "../../trpc";

export default createTRPCRouter({
    get: publicProcedure.query(({ ctx }) => {
        return ctx.db.teacher.findMany({
            select: {
                id: true,
                name: true
            }
        })
    })
})