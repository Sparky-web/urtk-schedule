"use client"
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

export default function LogOutButton() {
    return (
        <Button className="w-full" variant={'tenary'} onClick={() => signOut()}>
            <LogOut className="w-4 h-4" />
            Выйти из аккаунта
        </Button>
    )
}