// import Card from "../card";

import { AlertCircle } from "lucide-react";
import { H4, P } from "~/components/ui/typography";

export default function InitializationErrorCard({ message }: { message: string }) {
    return (
        <div className="grid gap-2 rounded-lg bg-red-100 p-4">
            <H4 className="text-base flex gap-2">
                <AlertCircle className="w-5 h-5 mt-1" />
                Ошибка инициализации компонента
            </H4>
            <P className="text-sm">{message}</P>
        </div>
    )
}