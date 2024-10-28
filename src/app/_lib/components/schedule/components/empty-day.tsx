import { Button } from "~/components/ui/button"
import { H2, H3, P } from "~/components/ui/typography"

export default function EmptyDay() {
    return (
        <div className="grid gap-3 justify-center text-center justify-items-center">
            <H3>В этот день занятия не найдены</H3>
        </div>
    )
}
