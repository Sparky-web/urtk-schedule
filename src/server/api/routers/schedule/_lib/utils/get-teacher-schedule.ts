import { DateTime } from "luxon"
import { db } from "~/server/db"

const getTeacherSchedule = async (teacherId: string, weekStart: Date) => {
    const teacher = await db.teacher.findUnique({
        where: {
            id: teacherId
        }
    })

    if(!teacher) throw new Error('Не найден преподаватель c id:' + teacherId)

    const data = await db.day.findMany({
        orderBy: {
            start: 'asc'
        },
        where: {
            teacherId,
            start: {
                gte: weekStart,
                lt: DateTime.fromJSDate(weekStart).plus({ week: 1 }).toJSDate()
            }
        },
        include: {
            lessons: {
                include: {
                    Groups: {
                        select: {
                            id: true,
                            title: true
                        }
                    },
                    Teacher: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    Classroom: true
                }
            }
        }
    })

    return {
        data,
        type: 'teacher',
        teacher: teacher
    }
}

export default getTeacherSchedule