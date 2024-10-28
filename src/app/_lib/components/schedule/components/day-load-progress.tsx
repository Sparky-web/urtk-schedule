import { Progress } from "~/components/ui/progress"
import { cn } from "~/lib/utils"
import { type Day } from "~/types/schedule"

interface DayLoadProgressProps {
    day?: Day
}

const MAX_LESSONS = 6

const getColor = (percentLoad: number) => {
    if (percentLoad < 30) return 'bg-green-500'
    if (percentLoad < 50) return 'bg-yellow-500'
    if (percentLoad <= 75) return 'bg-orange-500'
    if (percentLoad > 75) return 'bg-red-500'
    // return 'bg-gray-500'
}

export default function DayLoadProgress({ day }: DayLoadProgressProps) {
    const startLessonIndex = day?.lessons[0]?.index
    const endLessonIndex = day?.lessons?.slice(-1)[0]?.index

    // console.log(endLessonIndex, startLessonIndex)
    const startPercent = (startLessonIndex - 1) / MAX_LESSONS * 100
    const width = (endLessonIndex - 1) / MAX_LESSONS * 100 - startPercent

    return (
        <div className="w-full h-2.5 bg-gray-200 rounded-lg relative overflow-hidden">
            <div
                style={{ width: `calc(${width}% + 8px`, left: `${startPercent - 1}%`, top: 0 }}
                className={cn("h-full rounded-lg absolute", getColor(width))}
            ></div>
        </div>
    )
}
