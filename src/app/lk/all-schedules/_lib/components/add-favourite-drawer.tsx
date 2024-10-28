import { Plus } from "lucide-react"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "~/app/_lib/client-store"
import { addFavourite } from "~/app/_lib/client-store/_lib/slices/user"
import { Button } from "~/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer"
import { api } from "~/trpc/react"
import SelectSchedule from "./select-schedule"

export default function AddFavouriteDrawer() {

    const { mutateAsync } = api.user.addFavourite.useMutation()

    const user = useAppSelector(e => e.user?.user)
    const dispatch = useAppDispatch()

    if (!user) return null


    const [selected, setSelected] = useState(null)

    // const add = async () => {
    //     const data = await mutateAsync({
    //         type: props.type,
    //         groupId: props.groupId,
    //         teacherId: props.teacherId
    //     })

    //     dispatch(addFavourite(data))
    // }

    return <Drawer>
        <DrawerTrigger asChild >
            <Button size="sm" className="w-fit">
                <Plus className="w-4 h-4" />
                добавить
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle>Добавить расписание в избранное</DrawerTitle>
            </DrawerHeader>

            <SelectSchedule />
            
            <DrawerFooter>
                <Button>Добавить</Button>
                <DrawerClose>
                    <Button variant="outline" className="w-full">Закрыть</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
}