// "use client"

import PageTitle from "~/app/_lib/components/page-title";
import { H1 } from "~/components/ui/typography";
import Favourites from "./_lib/components/favourites";
import SelectSchedule from "./_lib/components/select-schedule";
import { api } from "~/trpc/server";
import SetSchedule from "./_lib/utils/set-schedule";

export const revalidate = 1200;

export default async function AllSchedules() {
    const [groups, teachers] = await Promise.all([
        api.groups.get(),
        api.teachers.get()
    ])

    return (
        <div className="grid gap-6">
            <SetSchedule teachers={teachers} groups={groups}>
                <PageTitle>Все расписания</PageTitle>

                <div className="grid gap-4">
                    <SelectSchedule />
                    <Favourites />
                </div>
            </SetSchedule>
        </div>
    )
}