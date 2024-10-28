"use client"
import { Group } from "@prisma/client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/app/_lib/client-store";
import { setGroups, setTeachers } from "~/app/_lib/client-store/_lib/slices/schedule";
import { Teacher } from "~/types/schedule";

interface SetScheduleProps {
    groups: Group[],
    teachers: Teacher[],
    children: React.ReactNode
}

export default function SetSchedule(props: SetScheduleProps) {
    const { groups, teachers } = props

    const dispatch = useAppDispatch()
    const { groups: groupsState, teachers: teachersState } = useAppSelector(state => state.schedule)

    useEffect(() => {
        if (groups && teachers) {
            dispatch(setGroups(groups))
            dispatch(setTeachers(teachers))
        }
    }, [groups, teachers])

    return (
        <>
            {groupsState && teachersState && props.children}
        </>
    )
}