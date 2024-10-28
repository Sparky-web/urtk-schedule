import { usePathname } from "next/navigation";
import { MenuItem } from ".";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { H2 } from "~/components/ui/typography";

interface MenuProps {
    data: MenuItem[]
}


export default function DesktopMenu({ data }: MenuProps) {
    const pathname = usePathname()

    return (
        <div className="hidden lg:grid gap-6 bg-white shadow-xl px-5 content-start relative z-10 pt-8 ">
            <H2>Академикс</H2>
            <div className="grid gap-2">
                {data.map(item => {
                    const isActive = pathname.includes(item.path)
                    return (
                        <Link key={item.title} href={item.path} className={cn(
                            "transition-colors flex gap-3 content-center items-center h-12 rounded-xl p-4 hover:bg-slate-100",
                            isActive && 'bg-primary/10 text-primary hover:bg-primary/15'
                        )}>
                            <item.icon className="w-5 h-5 " />
                            <div className={cn(
                                "text-sm font-medium text-center ",
                                isActive && 'text-primary'
                            )}>{item.title}</div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}