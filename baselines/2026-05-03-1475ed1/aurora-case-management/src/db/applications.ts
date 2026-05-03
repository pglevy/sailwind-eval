export interface Application {
  id: number
  memberName: string
  memberEmail: string
  memberPhone: string
  accountType: string
  status: string
  priority: string
  assignee: string
  createdBy: string
  createdOn: string
  updatedOn: string
  completionPct: number
  riskScore: string
  slaDeadline: string
  stage: string
  processingDays: number
}

const applications: Application[] = [
  {
    id: 1001,
    memberName: 'Carlos Martinez',
    memberEmail: 'carlos.martinez@example.com',
    memberPhone: '(415) 555-0192',
    accountType: 'Business Advantage',
    status: 'IN_REVIEW',
    priority: 'HIGH',
    assignee: 'alice.chen',
    createdBy: 'system',
    createdOn: '2026-04-28',
    updatedOn: '2026-05-02',
    completionPct: 85,
    riskScore: 'LOW',
    slaDeadline: '2026-05-04',
    stage: 'Document Review',
    processingDays: 2,
  },
  {
    id: 1002,
    memberName: 'Sandra Lee',
    memberEmail: 'sandra.lee@example.com',
    memberPhone: '(510) 555-0347',
    accountType: 'Essential Checking',
    status: 'PENDING_DOCS',
    priority: 'STANDARD',
    assignee: 'alice.chen',
    createdBy: 'system',
    createdOn: '2026-04-29',
    updatedOn: '2026-05-01',
    completionPct: 60,
    riskScore: 'LOW',
    slaDeadline: '2026-05-05',
    stage: 'Identity Verification',
    processingDays: 3,
  },
  {
    id: 1003,
    memberName: 'James Okafor',
    memberEmail: 'james.okafor@example.com',
    memberPhone: '(650) 555-0821',
    accountType: 'Business Advantage',
    status: 'COMPLIANCE_HOLD',
    priority: 'HIGH',
    assignee: 'david.kim',
    createdBy: 'system',
    createdOn: '2026-04-27',
    updatedOn: '2026-05-02',
    completionPct: 70,
    riskScore: 'MEDIUM',
    slaDeadline: '2026-05-03',
    stage: 'Compliance Screening',
    processingDays: 4,
  },
  {
    id: 1004,
    memberName: 'Priya Nair',
    memberEmail: 'priya.nair@example.com',
    memberPhone: '(408) 555-0563',
    accountType: 'Youth Savings',
    status: 'APPROVED',
    priority: 'STANDARD',
    assignee: 'bob.martinez',
    createdBy: 'system',
    createdOn: '2026-04-26',
    updatedOn: '2026-05-01',
    completionPct: 100,
    riskScore: 'LOW',
    slaDeadline: '2026-05-02',
    stage: 'Completed',
    processingDays: 1,
  },
  {
    id: 1005,
    memberName: 'Tom Nguyen',
    memberEmail: 'tom.nguyen@example.com',
    memberPhone: '(707) 555-0284',
    accountType: 'Essential Checking',
    status: 'IN_REVIEW',
    priority: 'STANDARD',
    assignee: 'alice.chen',
    createdBy: 'system',
    createdOn: '2026-04-30',
    updatedOn: '2026-05-02',
    completionPct: 45,
    riskScore: 'LOW',
    slaDeadline: '2026-05-06',
    stage: 'Document Review',
    processingDays: 2,
  },
  {
    id: 1006,
    memberName: 'Elena Vasquez',
    memberEmail: 'elena.vasquez@example.com',
    memberPhone: '(916) 555-0739',
    accountType: 'Business Advantage',
    status: 'PENDING_DOCS',
    priority: 'HIGH',
    assignee: 'carol.white',
    createdBy: 'system',
    createdOn: '2026-05-01',
    updatedOn: '2026-05-02',
    completionPct: 30,
    riskScore: 'LOW',
    slaDeadline: '2026-05-07',
    stage: 'Application Submitted',
    processingDays: 1,
  },
  {
    id: 1007,
    memberName: 'Marcus Johnson',
    memberEmail: 'marcus.johnson@example.com',
    memberPhone: '(213) 555-0415',
    accountType: 'Essential Checking',
    status: 'APPROVED',
    priority: 'STANDARD',
    assignee: 'bob.martinez',
    createdBy: 'system',
    createdOn: '2026-04-25',
    updatedOn: '2026-04-30',
    completionPct: 100,
    riskScore: 'LOW',
    slaDeadline: '2026-05-01',
    stage: 'Completed',
    processingDays: 1,
  },
  {
    id: 1008,
    memberName: 'Fatima Al-Hassan',
    memberEmail: 'fatima.alhassan@example.com',
    memberPhone: '(619) 555-0672',
    accountType: 'Business Advantage',
    status: 'COMPLIANCE_HOLD',
    priority: 'HIGH',
    assignee: 'david.kim',
    createdBy: 'system',
    createdOn: '2026-04-28',
    updatedOn: '2026-05-02',
    completionPct: 65,
    riskScore: 'HIGH',
    slaDeadline: '2026-05-04',
    stage: 'Compliance Screening',
    processingDays: 4,
  },
]

export async function getApplications(): Promise<Application[]> {
  return applications
}

export async function getApplication(id: number): Promise<Application | undefined> {
  return applications.find(a => a.id === id)
}

export async function createApplication(data: Omit<Application, 'id'>): Promise<Application> {
  const newApp = { ...data, id: Math.max(0, ...applications.map(a => a.id)) + 1 }
  applications.push(newApp)
  return newApp
}

export async function updateApplication(id: number, data: Partial<Application>): Promise<Application | undefined> {
  const idx = applications.findIndex(a => a.id === id)
  if (idx === -1) return undefined
  applications[idx] = { ...applications[idx], ...data }
  return applications[idx]
}
