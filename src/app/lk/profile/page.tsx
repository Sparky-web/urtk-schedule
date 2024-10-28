import Card, { CardTitle } from "~/app/_lib/components/card";
import PageTitle from "~/app/_lib/components/page-title";
import { api } from "~/trpc/server";
import SetSchedule from "../all-schedules/_lib/utils/set-schedule";
import EditData from "./_lib/componetns/edit-data";
import LogOutButton from "./_lib/componetns/log-out-button";
import NoUserBoundary from "./_lib/utils/no-user-boudary";

export const revalidate = 1200

export default async function Profile() {
    const [groups, teachers] = await Promise.all([
        api.groups.get(),
        api.teachers.get()
    ])

    return (
        <SetSchedule groups={groups} teachers={teachers}>
            <div className="grid gap-6">
                <PageTitle>Профиль</PageTitle>
                <NoUserBoundary>
                    <EditData />
                    <div className="mt-auto">
                        <LogOutButton />
                    </div>
                </NoUserBoundary>
            </div>
        </SetSchedule>
    )
}