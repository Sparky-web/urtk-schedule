import { Button } from "~/components/ui/button"
import { H2, H3, P } from "~/components/ui/typography"

interface EmptyWeekProps {
    onReturn?: () => void
}
export default function EmptyWeek({ onReturn }: EmptyWeekProps) {
    return (
        <div className="grid gap-3 justify-center text-center justify-items-center">
            <H3>На этой неделе занятия не найдены</H3>
            <P className="text-sm">Занятия отсутствуют или расписание еще не составлено</P>
            {onReturn &&
                <Button onClick={onReturn} className="mt-2 max-w-fit" variant={'tenary'}>
                    к текущей неделе
                </Button>
            }
        </div>
    )
}
