// Account data for the My Account page

export interface PaymentInfo {
  id: number
  nextPaymentAmount: string
  nextPaymentDue: string
  paymentSource: string
  isAutopay: boolean
  autopayDescription: string
}

export interface Driver {
  id: number
  role: string
  name: string
  description: string
  initial: string
  color: string
}

export interface CoverageItem {
  label: string
  details: string[]
}

export interface Vehicle {
  id: number
  label: string
  year: number
  make: string
  model: string
  coverages: CoverageItem[]
}

const paymentInfo: PaymentInfo[] = [
  {
    id: 1,
    nextPaymentAmount: '$123.45',
    nextPaymentDue: 'Due July 1',
    paymentSource: 'Pine Street Bank xxxx3456',
    isAutopay: true,
    autopayDescription: 'Withdraw balance due each month on due date',
  },
]

const drivers: Driver[] = [
  {
    id: 1,
    role: 'PRIMARY',
    name: 'Jane',
    description: '44-year-old female',
    initial: 'J',
    color: '#e12e8b',
  },
  {
    id: 2,
    role: 'SPOUSE',
    name: 'Sharif',
    description: '42-year-old male',
    initial: 'S',
    color: '#118bf1',
  },
  {
    id: 3,
    role: 'DEPENDENT CHILD',
    name: 'Benjamin',
    description: '16-year-old male',
    initial: 'B',
    color: '#569a38',
  },
]

const vehicles: Vehicle[] = [
  {
    id: 1,
    label: 'VEHICLE 1',
    year: 2021,
    make: 'Polestar',
    model: '2',
    coverages: [
      { label: 'Comprehensive', details: ['$500 Deductible'] },
      { label: 'Collision', details: ['$500 Deductible'] },
      { label: 'Bodily Injury', details: ['$250,000 Limit Per Person', '$500,000 Limit Per Incident'] },
      { label: 'Property Damage', details: ['$100,000 Limit Per Incident'] },
    ],
  },
  {
    id: 2,
    label: 'VEHICLE 2',
    year: 2009,
    make: 'Saab',
    model: '9-5',
    coverages: [
      { label: 'Comprehensive', details: ['$500 Deductible'] },
      { label: 'Collision', details: ['$500 Deductible'] },
      { label: 'Bodily Injury', details: ['$250,000 Limit Per Person', '$500,000 Limit Per Incident'] },
      { label: 'Property Damage', details: ['$100,000 Limit Per Incident'] },
    ],
  },
]

export async function getPaymentInfo(): Promise<PaymentInfo> {
  return paymentInfo[0]
}

export async function getDrivers(): Promise<Driver[]> {
  return drivers
}

export async function getVehicles(): Promise<Vehicle[]> {
  return vehicles
}
