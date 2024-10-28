import { ChevronLeft, ChevronRight } from "lucide-react"
import DateTime from "~/lib/utils/datetime"
import { useState } from "react"
import { Day } from "~/types/schedule"
import DayLoadProgress from "./day-load-progress"

interface DayPickerProps {
  weekStart: Date
  selectedDayStart: Date
  days: Day[]
  onSelectDay: (date: Date) => void
  onChange: (date: Date) => void
}

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']


export default function DayPicker(props: DayPickerProps) {
  const { selectedDayStart, onSelectDay, weekStart, onChange } = props

  return (
    <div className="flex justify-between items-center gap-3">
      <button onClick={() => onChange(
        DateTime.fromJSDate(weekStart).minus({ week: 1 }).toJSDate()
      )} className="text-gray-500 hover:text-gray-700">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <div className="flex gap-2 justify-between w-full max-w-[600px]">
        {daysOfWeek.map((day, index) => {
          const date = DateTime.fromJSDate(weekStart).plus({ days: index }).toJSDate()
          const isSelected = date.toISOString() === selectedDayStart.toISOString()
          const foundDay = props.days.find(e => e.start.toISOString() === date.toISOString())

          return (
            <button
              key={day}
              className={`w-full flex flex-col items-center p-1 rounded-lg transition-colors ${isSelected ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => onSelectDay(date)}
            >
              <span className="text-xs">{day}</span>
              <span className="text-base font-semibold mb-2">{date.getDate()}</span>
              <DayLoadProgress day={foundDay} />
            </button>
          )
        })}
      </div>
      <button onClick={() => onChange(
        DateTime.fromJSDate(weekStart).plus({ week: 1 }).toJSDate()
      )} className="text-gray-500 hover:text-gray-700">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}