'use client'
import { CalendarDays, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, ReactElement, ReactNode } from "react";
import { cn } from "~/lib/utils";
import MobileMenu from "./mobile";
import DesktopMenu from "./desktop";

const menu: MenuItem[] = [
    {
        title: 'Главная',
        path: '/lk/my-schedule',
        icon: Home
    },
    {
        title: 'Все расписания',
        path: '/lk/all-schedules',
        icon: CalendarDays
    },
    {
        title: 'Профиль',
        path: '/lk/profile',
        icon: User
    },
]

export interface MenuItem {
    title: string
    path: string
    icon: FC<any>
}

export default function Menu() {
    const pathname = usePathname()

    return (
        <>
            <MobileMenu data={menu} />
            <DesktopMenu data={menu} />
        </>
    )
}