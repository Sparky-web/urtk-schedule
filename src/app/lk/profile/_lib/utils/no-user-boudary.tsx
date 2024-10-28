'use client'

import { useAppSelector } from "~/app/_lib/client-store"
import NoUserScreen, { NoUserScreenText, NoUserScreenTitle } from "~/app/_lib/components/no-user-screen"

export default function NoUserBoundary({ children }: { children: React.ReactNode }) {
    const user = useAppSelector(e => e.user?.user)

    if (!user) {
        return (
            <div className="mt-8">
                <NoUserScreen>
                    <NoUserScreenTitle>Для продолжения необходимо войти в аккаунт</NoUserScreenTitle>
                    <NoUserScreenText>
                        На этом экране можно сохранить ваше расписание, для автоматического отображения на главной странце. Без аккаунта данные не сохраняются.
                    </NoUserScreenText>
                </NoUserScreen>
            </div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}