"use client"
import { useAppSelector } from '~/app/_lib/client-store'
import Schedule from '~/app/_lib/components/schedule'

import NoUserScreen, { NoUserScreenText, NoUserScreenTitle } from "../../_lib/components/no-user-screen"

export default function ScheduleScreen() {
  const user = useAppSelector(e => e.user?.user)

  return (
    <div className="grid  ">
      {user &&
        <Schedule groupId={user.groupId} type={user.role === 1 ? 'student' : 'teacher'} teacherId={user.teacherId} />
      }

      {!user &&
        <div className="mt-6">

          <NoUserScreen>
            <NoUserScreenTitle>Для продолжения необходимо войти в аккаунт</NoUserScreenTitle>
            <NoUserScreenText>
              На этом экране отображается ваше расписание занятий в колледже. Без аккаунта данные не сохраняются.
            </NoUserScreenText>
          </NoUserScreen>
        </div>
      }
    </div>
  )
}