import { cn } from "~/lib/utils"

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode
}


export default function PageTitle({ children, ...props }: PageTitleProps) {
    return (
        <h1 {...props} className={cn("text-xl font-semibold", props.className)}>
            {children}
        </h1>
    )
}