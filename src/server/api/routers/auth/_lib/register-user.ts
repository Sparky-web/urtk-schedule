import bcrypt from 'bcrypt';
import { db } from '~/server/db';



export default async function registerUser( name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Сохраните пользователя в БД
    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return user;
}
