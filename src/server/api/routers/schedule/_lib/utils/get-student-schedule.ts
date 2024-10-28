import { DateTime } from "luxon"
import { db } from "~/server/db"

const getStudentSchedule = async (groupId: string, weekStart: Date) => {
    const group = await db.group.findUnique({
        where: {
            id: groupId
        }
    })

    if(!group) throw new Error('Не найден группа c id:' + groupId)

    const data = await db.day.findMany({
        orderBy: {
            start: 'asc'
        },
        where: {
            groupId: groupId,
            start: {
                gte: weekStart,
                lt: DateTime.fromJSDate(weekStart).plus({ week: 1 }).toJSDate()
            }
        },
        include: {
            lessons: {
                include: {
                    Teacher: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    Groups: {
                        select: {
                            id: true,
                            title: true
                        }
                    },
                    Classroom: true
                }
            }
        }
    })

    return {
        data,
        type: 'student',
        group: group
    }
}

export default getStudentSchedule