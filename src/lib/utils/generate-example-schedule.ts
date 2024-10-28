
import { DateTime } from "luxon";
import { db as prisma } from "../../server/db"
import { Lesson } from "@prisma/client";
// Расписание пар
const scheduleTimes = [
  { startHour: 8, startMinute: 30, endHour: 10, endMinute: 0 },
  { startHour: 10, startMinute: 10, endHour: 11, endMinute: 40 },
  { startHour: 12, startMinute: 10, endHour: 13, endMinute: 40 },
  { startHour: 14, startMinute: 10, endHour: 15, endMinute: 40 },
  { startHour: 16, startMinute: 0, endHour: 17, endMinute: 30 },
  { startHour: 17, startMinute: 40, endHour: 19, endMinute: 10 },
  { startHour: 19, startMinute: 20, endHour: 20, endMinute: 50 }
];

// Уроки для каждого дня недели
// Доступные названия предметов
const subjects = ['Математика', 'Физика', 'Информатика', 'История', 'Биология'];
// Учителя
const teacherNames = ['Иванов И.И.', 'Петров П.П.', 'Сидоров С.С.', 'Кузнецова О.А.', 'Николаев В.В.'];
// Аудитории
const classroomNames = ['101', '102', '103', '104', '105'];

const translitNameToEnglish = (name: string) => {
  // Преобразование имени на английский язык
  const matchTable = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'c',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
    ' ': '-'
  }
  return name.replace(/[а-яё]/gi, function (match) {
    return matchTable[match.toLowerCase()] || '';
  }).replace(/ /g, '-')
    .replace(/[^a-zA-Z\s-]/g, '')
}

// Генерация данных для текущей недели
async function createScheduleForGroup() {
  const groupId = 'is-313'; // Замените на реальный groupId
  const startOfWeek = DateTime.now().startOf('week'); // Начало недели (понедельник)

  // Функция для получения или создания учителя
  const getOrCreateTeacher = async (name: string) => {
    let teacher = await prisma.teacher.findFirst({
      where: { id: translitNameToEnglish(name) }
    });

    if (!teacher) {
      teacher = await prisma.teacher.create({
        data: {
          name,
          id: translitNameToEnglish(name),
        }
      });
    }

    return teacher;
  };

  // Функция для получения или создания аудитории
  const getOrCreateClassroom = async (name: string) => {
    let classroom = await prisma.classroom.findFirst({
      where: { name }
    });

    if (!classroom) {
      classroom = await prisma.classroom.create({
        data: { name }
      });
    }

    return classroom;
  };

  // Создаем учителей и сохраняем их идентификаторы
  const teachers = await Promise.all(
    teacherNames.map(async (name) => {
      return await getOrCreateTeacher(name);
    })
  );

  // Создаем аудитории и сохраняем их идентификаторы
  const classrooms = await Promise.all(
    classroomNames.map(async (name) => {
      return await getOrCreateClassroom(name);
    })
  );

  // Создаем расписание на каждый день недели (кроме воскресенья)
  for (let dayOffset = 0; dayOffset < 6; dayOffset++) {
    const currentDay = startOfWeek.plus({ days: dayOffset });

    // Создаем день
    const day = await prisma.day.create({
      data: {
        start: currentDay.toJSDate(),
        Group: { connect: { id: groupId } }
      }
    });

    // Генерация занятий для текущего дня
    for (let i = 0; i < 3 + Math.floor(Math.random() * 2); i++) {
      const subject = subjects[Math.floor(Math.random() * subjects.length)];
      const teacher = teachers[Math.floor(Math.random() * teachers.length)];
      const classroom = classrooms[Math.floor(Math.random() * classrooms.length)];
      const timeSlot = scheduleTimes[i % scheduleTimes.length];

      const start = currentDay.set({
        hour: timeSlot.startHour,
        minute: timeSlot.startMinute
      });
      const end = currentDay.set({
        hour: timeSlot.endHour,
        minute: timeSlot.endMinute
      });

      // Создаем занятие
      const lesson = await prisma.lesson.create({
        data: {
          title: subject,
          start: start.toJSDate(),
          end: end.toJSDate(),
          index: i + 1,
          Groups: { connect: { id: groupId } },
          Teacher: { connect: { id: teacher.id } },
          Classroom: { connect: { id: classroom.id } },
          Days: { connect: { id: day.id } }
        }
      });

      await connectToTeacherDay(lesson, teacher.id)
    }
  }
}

const connectToTeacherDay = async (lesson: Lesson, teacherId: string) => {
  let day = await prisma.day.findFirst({
    where: { start: DateTime.fromJSDate(lesson.start).startOf('day').toJSDate(), Teacher: { id: teacherId } }
  })

  if (!day) {
    day = await prisma.day.create({
      data: {
        start: DateTime.fromJSDate(lesson.start).startOf('day').toJSDate(),
        Teacher: { connect: { id: teacherId } }
      }
    })
  }

  await prisma.day.update({
    where: { id: day.id },
    data: {
      lessons: {
        connect: {
          id: lesson.id
        }
      }
    }
  })
}


// Запуск функции генерации расписания для группы 'is-413'
export default createScheduleForGroup