import { User, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Favourite } from "~/types/schedule"

interface FavouriteButtonProps {
    favourite: Favourite
}



export default function FavouriteButton({ favourite }: FavouriteButtonProps) {


    if (favourite.type === 'student') {

        return <Link href={`/lk/all-schedules/${favourite.type}/${favourite.groupId}`}>
            <Button variant={'tenary'} className="rounded-xl py-1 px-4 ">
                <Users className="w-4 h-4" />
                {favourite.Group?.title}
            </Button>
        </Link>
    }
    else {
        return <Link href={`/lk/all-schedules/${favourite.type}/${favourite.teacherId}`}>
            <Button variant={'tenary'} className="rounded-xl py-1 px-4 ">
                <User className="w-4 h-4" />
                {favourite.Teacher?.name}
            </Button>
        </Link>
    }
}
