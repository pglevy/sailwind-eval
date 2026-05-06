// Account data for the InsureCorp My Account prototype

export interface PaymentInfo {
  id: number
  nextPaymentAmount: string
  nextPaymentDue: string
  paymentSource: string
  autopay: boolean
  autopayDescription: string
}

export interface Driver {
  id: number
  name: string
  initial: string
  avatarColor: string
  description: string
  relationship: string
}

export interface CoverageItem {
  type: string
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
    autopay: true,
    autopayDescription: 'Withdraw balance due each month on due date',
  },
]

const drivers: Driver[] = [
  {
    id: 1,
    name: 'Jane',
    initial: 'J',
    avatarColor: '#e12e8b',
    description: '44-year-old female',
    relationship: 'PRIMARY',
  },
  {
    id: 2,
    name: 'Sharif',
    initial: 'S',
    avatarColor: '#118bf1',
    description: '42-year-old male',
    relationship: 'SPOUSE',
  },
  {
    id: 3,
    name: 'Benjamin',
    initial: 'B',
    avatarColor: '#569a38',
    description: '16-year-old male',
    relationship: 'DEPENDENT CHILD',
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
      { type: 'Comprehensive', details: ['$500 Deductible'] },
      { type: 'Collision', details: ['$500 Deductible'] },
      { type: 'Bodily Injury', details: ['$250,000 Limit Per Person', '$500,000 Limit Per Incident'] },
      { type: 'Property Damage', details: ['$100,000 Limit Per Incident'] },
    ],
  },
  {
    id: 2,
    label: 'VEHICLE 2',
    year: 2009,
    make: 'Saab',
    model: '9-5',
    coverages: [
      { type: 'Comprehensive', details: ['$500 Deductible'] },
      { type: 'Collision', details: ['$500 Deductible'] },
      { type: 'Bodily Injury', details: ['$250,000 Limit Per Person', '$500,000 Limit Per Incident'] },
      { type: 'Property Damage', details: ['$100,000 Limit Per Incident'] },
    ],
  },
]

export async function getPaymentInfo(): Promise<PaymentInfo | undefined> {
  return paymentInfo[0]
}

export async function getDrivers(): Promise<Driver[]> {
  return drivers
}

export async function getVehicles(): Promise<Vehicle[]> {
  return vehicles
}
