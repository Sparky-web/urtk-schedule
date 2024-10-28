import { Group } from "@prisma/client"
import { Teacher } from "~/types/schedule"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import AddToFavourite from "~/app/lk/all-schedules/[type]/[id]/_lib/componetns/add-to-favourite"


interface ScheduleState {
    groups: Group[] | null,
    teachers: Teacher[] | null,
}

export const scheduleSlice = createSlice({
    name: "schedule",
    initialState: {
        groups: null,
        teachers: null,
    } as ScheduleState,
    reducers: {
        setGroups: (state, payload: PayloadAction<Group[]>) => {
            state.groups = payload.payload
        },
        setTeachers: (state, payload: PayloadAction<Teacher[]>) => {
            state.teachers = payload.payload
        },
    }
})

export const {setGroups, setTeachers} = scheduleSlice.actions

export default scheduleSlice.reducer