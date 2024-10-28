'use client'

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "~/app/_lib/client-store"
import { setUser } from "~/app/_lib/client-store/_lib/slices/user"
import { User } from "~/types/user"
import LoaderFullscreen from "~/app/_lib/components/loader/fullscreen"

export default function SetUserProvider({ children, userData }: { children: React.ReactNode, userData: User | null }) {
    const dispatch = useAppDispatch()
    const user = useAppSelector(e => e.user.user)

    useEffect(() => {
        if (userData) {
          dispatch(setUser({ ...userData }))
        }
    }, [userData])

    return (
        <>
            {/* {!user && <LoaderFullscreen  />} */}
            {children}
        </>
    )
}