// Health portal data for the Community Health Partners prototype

export interface Appointment {
  id: number
  title: string
  date: string
  provider: string
  address1: string
  address2: string
  address3: string
  icon: string
}

export interface HealthSummaryItem {
  id: number
  icon: string
  label: string
  secondaryText: string
}

const appointments: Appointment[] = [
  {
    id: 1,
    title: 'Well Woman Exam',
    date: 'Monday, December 22, 2025 at 2:40 PM',
    provider: 'Dr. Sandra Jayson, M.D.',
    address1: '1301 Medical Pl, Suite 200',
    address2: '',
    address3: 'Tysons, VA 22102',
    icon: 'female',
  },
  {
    id: 2,
    title: 'Annual Physical',
    date: 'Monday, January 19, 2026 at 8:15 AM',
    provider: 'Madison Smith, PA-C',
    address1: '904 Healing Way',
    address2: '',
    address3: 'Tysons, VA 22102',
    icon: 'stethoscope',
  },
  {
    id: 3,
    title: 'Total Body Skin Examination',
    date: 'Friday, February 13, 2026 at 3:00 PM',
    provider: 'Dr. Sarah Chen, M.D.',
    address1: '1973 Wellness Blvd',
    address2: '',
    address3: 'Tysons, VA 22102',
    icon: 'hospital-alt',
  },
]

const healthSummaryItems: HealthSummaryItem[] = [
  {
    id: 1,
    icon: 'dna',
    label: 'Conditions/Diagnoses',
    secondaryText: 'Generalized Anxiety Disorder (GAD), Vita...',
  },
  {
    id: 2,
    icon: 'viruses',
    label: 'Allergies',
    secondaryText: 'Penicillin (Hives/Anaphylaxis)',
  },
  {
    id: 3,
    icon: 'prescription',
    label: 'Medications',
    secondaryText: 'Fluoxetine 20 mg; Norethindrone/Ethinyl ...',
  },
  {
    id: 4,
    icon: 'syringe',
    label: 'Immunizations',
    secondaryText: 'COVID-19, HPV (Gardasil 9), Tdap',
  },
  {
    id: 5,
    icon: 'user-md',
    label: 'Procedures and Surgeries',
    secondaryText: 'Wisdom Teeth Extraction, Tonsillectomy',
  },
  {
    id: 6,
    icon: 'glass-cheers',
    label: 'Lifestyle',
    secondaryText: 'Tobacco: Never Smoker; Alcohol: Socially',
  },
  {
    id: 7,
    icon: 'vial',
    label: 'Lab Results',
    secondaryText: 'No results to review',
  },
]

export async function getAppointments(): Promise<Appointment[]> {
  return appointments
}

export async function getHealthSummaryItems(): Promise<HealthSummaryItem[]> {
  return healthSummaryItems
}
