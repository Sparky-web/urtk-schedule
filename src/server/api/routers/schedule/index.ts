import createScheduleForGroup from "~/lib/utils/generate-example-schedule";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import {z} from "~/lib/utils/zod-russian"

import DateTime from "~/lib/utils/datetime"
import { TRPCClientError } from "@trpc/client";
import getStudentSchedule from "./_lib/utils/get-student-schedule";
import getTeacherSchedule from "./_lib/utils/get-teacher-schedule";


export default createTRPCRouter({
    // get: protectedProcedure.query(({ ctx }) => {
    //     return ctx.user;
    // })
    generate: protectedProcedure.input(
        z.object({
            groupId: z.string()
        })
    ).mutation(async ({ ctx, input }) => {
        const group = await ctx.db.group.findFirst({
            where: {
                id: input.groupId
            }
        })
        if (!group) throw new Error('Не найден')

        await createScheduleForGroup()

        return true
    }),
    get: publicProcedure.input(z.object(
        {
            groupId: z.string().optional(),
            teacherId: z.string().optional(),
            weekStart: z.date()
        }
    )).query(async ({ input, ctx }) => {
        if (input.groupId) {
            return await getStudentSchedule(input.groupId, input.weekStart)
        }
        else if (input.teacherId) {
            return await getTeacherSchedule(input.teacherId, input.weekStart)
        }
        else {
            throw new TRPCClientError('Не указан ни groupId, ни teacherId')
        }
    }),
})