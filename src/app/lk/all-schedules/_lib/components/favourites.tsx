'use client'
import { Plus, Stars, Users } from "lucide-react";
import { useAppSelector } from "~/app/_lib/client-store";
import Card, { CardTitle } from "~/app/_lib/components/card";
import { Button } from "~/components/ui/button";
import { P } from "~/components/ui/typography";
import FavouriteButton from "./favourite-button";
import AddFavouriteDrawer from "./add-favourite-drawer";

export default function Favourites() {
    const user = useAppSelector(e => e.user?.user)
    // const user = null

    return (
        <Card>
            <CardTitle className="flex content-center items-center gap-2">
                <Stars className="text-violet-600" />
                Избранное
            </CardTitle>
            {!user && <div className="grid gap-3">
                <P className="text-muted-foreground text-sm">
                    Добавляйте расписания своих друзей или преподавателей для быстрого доступа к ним.
                </P>
                <div className="rounded-lg bg-violet-50 p-3 text-sm">
                    Войдите в аккаунт для сохранения
                </div>
                <Button className="w-full mt-2">
                    Войти
                </Button>
            </div>}
            {user && <div className="grid gap-4">
                <div className="flex gap-3 items-center flex-wrap">
                    {!!user.Favourites?.length ?
                        user.Favourites.map((favourite, i) => <FavouriteButton favourite={favourite} key={i} />) 
                        : <P>Пока нет избранных расписаний</P>
                    }
                </div>
                {/* <AddFavouriteDrawer /> */}
            </div>}
        </Card>
    )
}