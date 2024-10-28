import { Prisma } from "@prisma/client"
import { Clock, User, Users } from "lucide-react"
import DateTime from "~/lib/utils/datetime"
import { Badge } from "~/components/ui/badge"
import { type Lesson } from "~/types/schedule"
import ActiveIndicatior from "./active-indicatior"
import { cn } from "~/lib/utils"
import { MapPin } from "lucide-react"

interface LessonProps {
    lesson: Lesson
    isActive: boolean
    type: 'student' | 'teacher'
}

export default function Lesson({ lesson, isActive, type }: LessonProps) {
    return (
        <div className={
            cn("bg-white rounded-xl px-5 pt-4 shadow-sm grid gap-3",
                !isActive && 'pb-4'
            )}>
            <div className="grid gap-1 font-medium ">
                <div className="flex gap-3 items-center">
                    <span className="text-sm text-muted-foreground">{lesson.index || ''} пара</span>
                    <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                        {DateTime.fromJSDate(lesson.start).toLocaleString(DateTime.TIME_24_SIMPLE)}
                        &nbsp;-&nbsp;
                        {DateTime.fromJSDate(lesson.end).toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
                </div>
                <h2 className="text-lg font-semibold">{lesson.title}</h2>
            </div>
            <div className="flex gap-2 items-baseline">
                <div className="text-sm text-muted-foreground">
                    Аудитория:
                </div>
                <Badge size={'sm'}>
                    {lesson.Classroom?.name}
                </Badge>

            </div>
            {/* {lesson} */}

            <div className="flex gap-2">
                {type === 'student' && <div className="flex gap-2 content-center items-center text-muted-foreground text-sm">
                    <User className="w-4 h-4" />
                    {lesson.Teacher?.name}
                </div>}
                {type === 'teacher' &&
                    lesson.Groups?.map(group => <div className="flex gap-2 content-center items-center text-muted-foreground text-sm">
                        <Users className="w-4 h-4" />
                        {group.title}
                    </div>)
                }
            </div>
            {isActive && <ActiveIndicatior start={lesson.start} end={lesson.end} />}
        </div>
    )
}