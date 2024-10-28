"use client"
import DateTime from "~/lib/utils/datetime"
import { FC, useEffect, useState } from "react"
import { api } from "~/trpc/react"
import Day from "./components/day"
import DayPicker from "./components/day-picker"
import PageTitle from "../page-title"
import EmptyWeek from "./components/empty-week"
import EmptyDay from "./components/empty-day"
import { P } from "~/components/ui/typography"
import { withErrorBoundary } from "../../utils/error-boundary"

export interface ScheduleProps {
    type: 'student' | 'teacher'
    groupId?: string,
    teacherId?: string
}

function Schedule(props: ScheduleProps) {
    const [weekStart, setWeekStart] = useState(DateTime.now().startOf("week").toJSDate())
    const [selectedDayStart, setSelectedDayStart] = useState(DateTime.now().startOf('day').toJSDate())

    const [_, { data }] = api.schedule.get.useSuspenseQuery({
        groupId: props.type === 'student' ? props.groupId : undefined,
        teacherId: props.type === 'teacher' ? props.teacherId : undefined,
        weekStart
    })

    useEffect(() => {
        if (weekStart.toISOString() !== DateTime.now().startOf("week").toJSDate().toISOString()) {
            setSelectedDayStart(DateTime.fromJSDate(weekStart).startOf('day').toJSDate())
        } else {
            setSelectedDayStart(DateTime.now().startOf('day').toJSDate())
        }
    }, [weekStart])

    if (!data) return 'Загрузка...'

    const foundDay = data.data.find(day => day.start.toISOString() === selectedDayStart.toISOString())

    const isEmpty = !data.data.length || !data.data.find(day => day.lessons.length)

    return (
        <div className="grid gap-6">
            <PageTitle>
                Расписание: {data.type === 'student' ? data.group?.title : data.teacher?.name}
            </PageTitle>

            <DayPicker
                days={data.data}
                weekStart={weekStart} onChange={setWeekStart}
                selectedDayStart={selectedDayStart}
                onSelectDay={setSelectedDayStart}
            />

            <div className="grid gap-4 mt-4">
                {isEmpty &&
                    <div className="mt-6">
                        <EmptyWeek onReturn={() => setWeekStart(DateTime.now().startOf('week').toJSDate())} />
                    </div>
                }

                {!isEmpty && !foundDay?.lessons.length &&
                    <div className="mt-6">
                        <EmptyDay />
                    </div>
                }

                {!isEmpty && foundDay &&
                    <Day day={foundDay} type={props.type} />
                }

                {!isEmpty && <P className="font-medium text-sm w-fit py-1 px-3 rounded-xl bg-gray-100 mx-auto mt-3">
                    {DateTime.fromJSDate(selectedDayStart).toLocaleString(DateTime.DATE_HUGE)}
                </P>}
            </div>
        </div>
    )
}

export default withErrorBoundary(Schedule)