"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAppSelector } from "~/app/_lib/client-store";
import Card, { CardTitle } from "~/app/_lib/components/card";
import { Combobox } from "~/app/_lib/components/combobox";
import Schedule from "~/app/_lib/components/schedule";
import { withErrorBoundary } from "~/app/_lib/utils/error-boundary";
import { Button } from "~/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "~/components/ui/drawer";
import { Label } from "~/components/ui/label";

function SelectSchedule() {
    const { groups, teachers } = useAppSelector(state => state.schedule)

    // const groups = [
    //     {value: "1", label: "Ис-313"},
    //     {value: "2", label: "Группа 2"},
    //     {value: "3", label: "Группа 3"},
    // ]

    if (!groups || !teachers) throw new Error('Не найдены группы и преподаватели')

    const types = [
        { value: "student", label: "Студент" },
        { value: "teacher", label: "Преподаватель" },
    ]

    const [scheduleType, setScheduleType] = React.useState<string | null>('student')
    const [groupId, setGroupId] = React.useState<string | null>(null)
    const [teacherId, setTeacherId] = React.useState<string | null>(null)

    useEffect(() => {
        setGroupId(null)
        setTeacherId(null)
    }, [scheduleType])

    return <Card>
        <CardTitle>Просмотр расписания</CardTitle>
        <div className="grid gap-4">
            <div className="grid gap-1.5">
                <Label>Тип расписания</Label>
                <Combobox
                    data={types}
                    value={scheduleType}
                    onChange={setScheduleType}
                />
            </div>

            {scheduleType === 'student' && <div className="grid gap-1.5">
                <Label>Группа</Label>
                <Combobox
                    data={groups.map(group => ({ value: group.id, label: group.title }))}
                    value={groupId}
                    onChange={setGroupId}
                />
            </div>}

            {scheduleType === 'teacher' && <div className="grid gap-1.5">
                <Label>Преподаватель</Label>
                <Combobox
                    data={teachers.map(teacher => ({ value: teacher.id, label: teacher.name }))}
                    value={teacherId}
                    onChange={setTeacherId}
                />
            </div>}

            {(groupId || teacherId) &&
                <Link href={`/lk/all-schedules/${scheduleType}/${groupId || teacherId}`}>
                    <Button className="w-full">
                        Открыть расписание
                    </Button>
                </Link>
            }
        </div>
    </Card>
}

export default withErrorBoundary(SelectSchedule);

