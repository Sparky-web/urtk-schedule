export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="container py-6">
            {children}
        </div>
    )
}