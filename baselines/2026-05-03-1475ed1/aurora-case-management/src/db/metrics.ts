export interface DailyVolume {
  id: number
  date: string
  submitted: number
  approved: number
  rejected: number
  pending: number
}

export interface StageMetric {
  id: number
  stage: string
  avgDays: number
  count: number
  slaBreaches: number
}

export interface StaffMetric {
  id: number
  username: string
  processed: number
  avgProcessingHours: number
  slaCompliance: number
}

const dailyVolumes: DailyVolume[] = [
  { id: 1, date: '2026-04-27', submitted: 8, approved: 5, rejected: 1, pending: 2 },
  { id: 2, date: '2026-04-28', submitted: 11, approved: 7, rejected: 0, pending: 4 },
  { id: 3, date: '2026-04-29', submitted: 9, approved: 6, rejected: 1, pending: 2 },
  { id: 4, date: '2026-04-30', submitted: 7, approved: 4, rejected: 0, pending: 3 },
  { id: 5, date: '2026-05-01', submitted: 12, approved: 8, rejected: 2, pending: 2 },
  { id: 6, date: '2026-05-02', submitted: 10, approved: 6, rejected: 1, pending: 3 },
]

const stageMetrics: StageMetric[] = [
  { id: 1, stage: 'Application Submitted', avgDays: 0.2, count: 6, slaBreaches: 0 },
  { id: 2, stage: 'Identity Verification', avgDays: 0.8, count: 14, slaBreaches: 1 },
  { id: 3, stage: 'Document Review', avgDays: 1.4, count: 22, slaBreaches: 3 },
  { id: 4, stage: 'Compliance Screening', avgDays: 2.1, count: 8, slaBreaches: 2 },
  { id: 5, stage: 'Final Approval', avgDays: 0.5, count: 18, slaBreaches: 0 },
]

const staffMetrics: StaffMetric[] = [
  { id: 1, username: 'alice.chen', processed: 42, avgProcessingHours: 3.2, slaCompliance: 97 },
  { id: 2, username: 'bob.martinez', processed: 38, avgProcessingHours: 3.8, slaCompliance: 94 },
  { id: 3, username: 'carol.white', processed: 35, avgProcessingHours: 4.1, slaCompliance: 91 },
  { id: 4, username: 'david.kim', processed: 28, avgProcessingHours: 5.6, slaCompliance: 89 },
]

export async function getDailyVolumes(): Promise<DailyVolume[]> {
  return dailyVolumes
}

export async function getStageMetrics(): Promise<StageMetric[]> {
  return stageMetrics
}

export async function getStaffMetrics(): Promise<StaffMetric[]> {
  return staffMetrics
}
