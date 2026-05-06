export interface Application {
  id: number
  applicantName: string
  applicantEmail: string
  accountType: string
  status: string
  priority: string
  assignee: string
  createdBy: string
  createdOn: string
  updatedOn: string
  completionPct: number
  slaDeadline: string
  riskScore: string
  businessName: string
}

const applications: Application[] = [
  { id: 1001, applicantName: 'Carlos Martinez', applicantEmail: 'carlos.m@example.com', accountType: 'Business Advantage', status: 'Pending Review', priority: 'HIGH', assignee: 'alice.chen', createdBy: 'system', createdOn: '2026-05-01', updatedOn: '2026-05-05', completionPct: 85, slaDeadline: '2026-05-07', riskScore: 'LOW', businessName: 'Martinez Plumbing LLC' },
  { id: 1002, applicantName: 'Sarah Johnson', applicantEmail: 'sarah.j@example.com', accountType: 'Essential Checking', status: 'Documents Needed', priority: 'MEDIUM', assignee: 'alice.chen', createdBy: 'system', createdOn: '2026-05-02', updatedOn: '2026-05-05', completionPct: 60, slaDeadline: '2026-05-08', riskScore: 'LOW', businessName: '' },
  { id: 1003, applicantName: 'David Park', applicantEmail: 'david.p@example.com', accountType: 'Youth Savings', status: 'Compliance Review', priority: 'HIGH', assignee: 'bob.martinez', createdBy: 'system', createdOn: '2026-05-02', updatedOn: '2026-05-06', completionPct: 90, slaDeadline: '2026-05-06', riskScore: 'MEDIUM', businessName: '' },
  { id: 1004, applicantName: 'Linda Torres', applicantEmail: 'linda.t@example.com', accountType: 'Business Advantage', status: 'Pending Review', priority: 'HIGH', assignee: 'alice.chen', createdBy: 'system', createdOn: '2026-05-03', updatedOn: '2026-05-05', completionPct: 75, slaDeadline: '2026-05-07', riskScore: 'HIGH', businessName: 'Torres Bakery Inc' },
  { id: 1005, applicantName: 'Michael Brown', applicantEmail: 'michael.b@example.com', accountType: 'Essential Checking', status: 'Approved', priority: 'LOW', assignee: 'carol.white', createdBy: 'system', createdOn: '2026-04-28', updatedOn: '2026-05-04', completionPct: 100, slaDeadline: '2026-05-05', riskScore: 'LOW', businessName: '' },
  { id: 1006, applicantName: 'Jennifer Lee', applicantEmail: 'jennifer.l@example.com', accountType: 'Essential Checking', status: 'Documents Needed', priority: 'MEDIUM', assignee: 'bob.martinez', createdBy: 'system', createdOn: '2026-05-03', updatedOn: '2026-05-05', completionPct: 45, slaDeadline: '2026-05-09', riskScore: 'LOW', businessName: '' },
  { id: 1007, applicantName: 'Robert Wilson', applicantEmail: 'robert.w@example.com', accountType: 'Business Advantage', status: 'Compliance Review', priority: 'HIGH', assignee: 'david.kim', createdBy: 'system', createdOn: '2026-05-04', updatedOn: '2026-05-06', completionPct: 80, slaDeadline: '2026-05-06', riskScore: 'HIGH', businessName: 'Wilson Auto Repair' },
  { id: 1008, applicantName: 'Amanda Garcia', applicantEmail: 'amanda.g@example.com', accountType: 'Youth Savings', status: 'Pending Review', priority: 'LOW', assignee: 'carol.white', createdBy: 'system', createdOn: '2026-05-04', updatedOn: '2026-05-05', completionPct: 95, slaDeadline: '2026-05-10', riskScore: 'LOW', businessName: '' },
  { id: 1009, applicantName: 'Kevin Nguyen', applicantEmail: 'kevin.n@example.com', accountType: 'Essential Checking', status: 'Approved', priority: 'LOW', assignee: 'alice.chen', createdBy: 'system', createdOn: '2026-04-30', updatedOn: '2026-05-03', completionPct: 100, slaDeadline: '2026-05-02', riskScore: 'LOW', businessName: '' },
  { id: 1010, applicantName: 'Patricia Adams', applicantEmail: 'patricia.a@example.com', accountType: 'Business Advantage', status: 'Documents Needed', priority: 'MEDIUM', assignee: 'bob.martinez', createdBy: 'system', createdOn: '2026-05-05', updatedOn: '2026-05-06', completionPct: 30, slaDeadline: '2026-05-11', riskScore: 'MEDIUM', businessName: 'Adams Consulting' },
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
