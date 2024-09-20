import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { db } from '~/server/db';

async function loginUser(email: string, password: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Неверный пароль');
  }


  // Создайте JWT токен
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h', // срок действия токена
  });

  return token;
}