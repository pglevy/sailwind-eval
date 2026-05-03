export interface Appointment {
  id: number
  title: string
  date: string
  provider: string
  address1: string
  address2: string
  icon: string
}

const appointments: Appointment[] = [
  {
    id: 1,
    title: 'Well Woman Exam',
    date: 'Monday, December 22, 2025 at 2:40 PM',
    provider: 'Dr. Sandra Jayson, M.D.',
    address1: '1301 Medical Pl, Suite 200',
    address2: 'Tysons, VA 22102',
    icon: 'female',
  },
  {
    id: 2,
    title: 'Annual Physical',
    date: 'Monday, January 19, 2026 at 8:15 AM',
    provider: 'Madison Smith, PA-C',
    address1: '904 Healing Way',
    address2: 'Tysons, VA 22102',
    icon: 'stethoscope',
  },
  {
    id: 3,
    title: 'Total Body Skin Examination',
    date: 'Friday, February 13, 2026 at 3:00 PM',
    provider: 'Dr. Sarah Chen, M.D.',
    address1: '1973 Wellness Blvd',
    address2: 'Tysons, VA 22102',
    icon: 'hospital-alt',
  },
]

export async function getAppointments(): Promise<Appointment[]> {
  return appointments
}

export async function getAppointment(id: number): Promise<Appointment | undefined> {
  return appointments.find(a => a.id === id)
}

export async function createAppointment(data: Omit<Appointment, 'id'>): Promise<Appointment> {
  const newAppointment = { ...data, id: Math.max(0, ...appointments.map(a => a.id)) + 1 }
  appointments.push(newAppointment)
  return newAppointment
}

export async function updateAppointment(id: number, data: Partial<Appointment>): Promise<Appointment | undefined> {
  const idx = appointments.findIndex(a => a.id === id)
  if (idx === -1) return undefined
  appointments[idx] = { ...appointments[idx], ...data }
  return appointments[idx]
}
