import Link from "next/link";
import { Button } from "~/components/ui/button";
import { H3, P } from "~/components/ui/typography";


export default function NoUserScreen({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid gap-3 justify-center text-center justify-items-center ">
            {children}

            <div className="grid mt-2 gap-3 justify-center justify-items-center grid-cols-2 max-sm:grid-cols-1 max-sm:w-full">
                <Link href="/auth/signin" className="max-w-full w-[200px] max-sm:w-full">
                    <Button className="max-w-full w-[200px] max-sm:w-full">
                        Войти
                    </Button>
                </Link>
                <Link href="/auth/signup" className="max-w-full w-[200px] max-sm:w-full">
                    <Button className="max-w-full w-[200px] max-sm:w-full" variant={'tenary'}>
                        Создать аккаунт
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export const NoUserScreenTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <H3 className="max-w-[500px]"{...props}>{props.children}</H3>
)

export const NoUserScreenText = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <P className="max-w-[700px] text-muted-foreground" {...props}>{props.children}</P>
)