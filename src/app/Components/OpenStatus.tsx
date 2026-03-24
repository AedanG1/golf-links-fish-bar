'use client'

const hours: Record<number, { open: string; close: string } | null> = {
  0: { open: '16:30', close: '19:30' }, // Sunday
  1: { open: '16:30', close: '19:30' }, // Monday
  2: { open: '16:30', close: '19:30' }, // Tuesday
  3: { open: '16:30', close: '19:30' }, // Wednesday
  4: { open: '16:30', close: '20:00' }, // Thursday
  5: { open: '11:30', close: '20:00' }, // Friday
  6: { open: '11:30', close: '20:00' }, // Saturday
}

function getNowInTimezone(timezone: string) {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: timezone,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'short',
  }).formatToParts(now)

  const weekday = parts.find(p => p.type === 'weekday')?.value
  const hour = Number(parts.find(p => p.type === 'hour')?.value)
  const minute = Number(parts.find(p => p.type === 'minute')?.value)

  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6
  }

  return {
    day: dayMap[weekday ?? 'Mon'],
    currentMinutes: hour * 60 + minute,
  }
}

function getStatus(): { isOpen: boolean; hoursUntilOpen: number; minutesUntilOpen: number } {
  const { day, currentMinutes } = getNowInTimezone('Australia/Brisbane')

  const todayHours = hours[day]

  if (todayHours) {
    const [openHour, openMin] = todayHours.open.split(':').map(Number)
    const [closeHour, closeMin] = todayHours.close.split(':').map(Number)
    const openMinutes = openHour * 60 + openMin
    const closeMinutes = closeHour * 60 + closeMin

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      return { isOpen: true, hoursUntilOpen: 0, minutesUntilOpen: 0 }
    }

    if (currentMinutes < openMinutes) {
      const diff = openMinutes - currentMinutes
      return {
        isOpen: false,
        hoursUntilOpen: Math.floor(diff / 60),
        minutesUntilOpen: diff % 60,
      }
    }
  }

  // After closing or closed today — find next opening
  let daysAhead = 1
  while (daysAhead <= 7) {
    const nextDay = (day + daysAhead) % 7
    const nextHours = hours[nextDay]
    if (nextHours) {
      const [openHour, openMin] = nextHours.open.split(':').map(Number)
      const openMinutes = openHour * 60 + openMin
      const minutesUntilMidnight = 24 * 60 - currentMinutes
      const diff = minutesUntilMidnight + (daysAhead - 1) * 24 * 60 + openMinutes
      return {
        isOpen: false,
        hoursUntilOpen: Math.floor(diff / 60),
        minutesUntilOpen: diff % 60,
      }
    }
    daysAhead++
  }

  return { isOpen: false, hoursUntilOpen: 0, minutesUntilOpen: 0 }
}

export default function OpenStatus() {
  const { isOpen, hoursUntilOpen, minutesUntilOpen } = getStatus()

  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-400'}`} />
      {isOpen ? (
        <span className="text-sm font-medium text-green-600">Open</span>
      ) : (
        <span className="font-medium text-slate-500">
          Open in: {hoursUntilOpen}hr {minutesUntilOpen}min
        </span>
      )}
    </div>
  )
}