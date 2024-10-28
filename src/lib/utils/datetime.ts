import { Settings, DateTime } from 'luxon';

// Установка временной зоны Екатеринбурга по умолчанию
Settings.defaultZone = 'Asia/Yekaterinburg';

DateTime.now = () => DateTime.fromObject({
    year: 2024,
    month: 10,
    day: 23,
    hour: 13,
    minute: 0,
    second: 0,
})

export default DateTime