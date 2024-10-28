'use client'

import Card, { CardTitle } from "~/app/_lib/components/card"
import { H1, H2, H3, P } from "~/components/ui/typography"
import Logo from "~/app/_lib/images/urtk-logo.png"
import Image from "next/image"
import { Label } from "~/components/ui/label"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function LoginCard() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {

            e.preventDefault()
            const res = await signIn('credentials', {
                email: email,
                password,
                redirect: false,
            })

            if(res?.error) {
                console.error(res.error)
                throw new Error(res.error)
            }

            navigation.push('/lk/my-schedule')

        } catch (e) {
            toast.error('Неверный email или пароль')
        }
    }

    return (
        <Card className="w-[500px] max-w-full p-6">
            <form className="grid gap-9" onSubmit={handleSubmit}>
                <div className="flex gap-4 justify-between flex-wrap">
                    <H2>Академикс</H2>
                    <Image src={Logo} alt="logo" width={136} height={26} objectFit="contain" />
                </div>

                <div className="grid gap-4">
                    <div className="grid gap-2 md:text-center">
                        <H1 className="max-md:text-[20px] text-[24px]">Вход на платформу</H1>
                        <P className="leading-6 max-md:text-[14px] max-md:leading-5">
                            Сохранение вашего расписания, избранные расписания и больше
                        </P>
                    </div>
                    <div className="grid gap-3">
                        <div className="grid gap-1 5">
                            <Label>Email</Label>
                            <Input placeholder="Ваш email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="grid gap-1">
                            <Label>Пароль</Label>
                            <Input placeholder="Ваш пароль" value={password} onChange={(e) => setPassword(e.target.value)} type={'password'} />
                        </div>
                        <div className="flex justify-center mt-3">
                            <Button className="w-full " size={'lg'} disabled={!email || !password} type="submit">
                                Войти
                            </Button>
                        </div>
                    </div>
                    <P className="leading-6 md:text-center text-sm mt-3">
                        Если у Вас нет учетной записи - <Link href={'/auth/signup'} className="text-primary">
                            нажмите здесь, чтобы зарегистрироваться
                        </Link>
                    </P>
                </div>
            </form>
        </Card>
    )
}
