import DateTime from "~/lib/utils/datetime"
import formatNounWithNumber from "~/lib/utils/format-noun-with-number";

interface ActiveIndicatiorProps {
    start: Date
    end: Date
}

function formatDiff(targetDateTime) {
    const now = DateTime.now();
    const diff = targetDateTime.diff(now);

    // Получение значений для различных единиц
    const minutes = diff.as('minutes');
    const hours = diff.as('hours');
    const days = diff.as('days');

    // Форматирование вывода в зависимости от разницы
    if (minutes < 0) {
        return 'в прошлом';
    } else if (minutes < 60) {
        return `через ${Math.round(minutes)} ${formatNounWithNumber(Math.round(minutes), ['минута', 'минуты', 'минут'])}`;
    } else if (hours < 24) {
        return `через ${Math.round(hours)} ${formatNounWithNumber(Math.round(hours), ['час', 'часа', 'часов'])}`;
    } else {
        return `через ${Math.round(days)} ${formatNounWithNumber(Math.round(days), ['день', 'дня', 'дней'])}`;
    }
}

export default function ActiveIndicatior({ start, end }: ActiveIndicatiorProps) {
    let type: 'start' | 'end' = 'start'
    if (DateTime.fromJSDate(start) < DateTime.now()) type = 'end'

    return (
        <div className="bg-primary mx-[-20px] rounded-b-xl py-2 text-white text-sm font-medium px-5 flex gap-4 items-center">

            {type === 'start' && <>
                начинается {formatDiff(DateTime.fromJSDate(start))}
            </>}

            {type === 'end' && <>
                заканчивается {formatDiff(DateTime.fromJSDate(end))}
            </>}

            <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/50 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white/70"></span>
            </span>
            {/* Pulsating indicator with circle inside */}
            {/* <div className="relative "></div> */}

        </div>
    )
}
