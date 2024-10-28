import { type Day } from "~/types/schedule";
import Lesson from "./lesson";
import DateTime from "~/lib/utils/datetime"
import EmptyDay from "./empty-day";
import { P } from "~/components/ui/typography";

interface DayProps {
    day: Day,
    type: 'student' | 'teacher'
}

export default function Day(props: DayProps) {
    const lessons = props.day.lessons
    const isToday = props.day.start.toISOString() === DateTime.now().startOf('day').toJSDate().toISOString()

    let activeLessonId: number | null = null

    for (let i = 0; i < lessons.length; i++) {
        const current = lessons[i]

        if (
            DateTime.fromJSDate(current.start) < DateTime.now()
            && DateTime.fromJSDate(current.end) > DateTime.now()
        ) {
            activeLessonId = current.id
            break
        }

        if (DateTime.fromJSDate(current.start) > DateTime.now()) {
            activeLessonId = current.id
            break
        }
    }

    return (
        <div className="grid gap-4">


            {!!props.day.lessons.length && props.day.lessons.map((lesson, i) => (
                <Lesson key={i} lesson={lesson} isActive={isToday && activeLessonId === lesson.id}
                    type={props.type}
                />
            ))}
        </div>
    )
}