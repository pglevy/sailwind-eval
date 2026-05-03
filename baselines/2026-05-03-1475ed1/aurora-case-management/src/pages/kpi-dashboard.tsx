import { useEffect, useState } from 'react'
import {
  HeadingField,
  CardLayout,
  RichTextDisplayField,
  TextItem,
  TagField,
  ProgressBar,
  ReadOnlyGrid,
  GridColumn,
} from '@pglevy/sailwind'
import { TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react'
import { getDailyVolumes, getStageMetrics, getStaffMetrics, type DailyVolume, type StageMetric, type StaffMetric } from '../db/metrics'
import { getApplications, type Application } from '../db/applications'
import { getDisplayName } from '../db/users'

export default function KpiDashboard() {
  const [volumes, setVolumes] = useState<DailyVolume[]>([])
  const [stages, setStages] = useState<StageMetric[]>([])
  const [staff, setStaff] = useState<StaffMetric[]>([])
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    getDailyVolumes().then(setVolumes)
    getStageMetrics().then(setStages)
    getStaffMetrics().then(setStaff)
    getApplications().then(setApplications)
  }, [])

  const totalSubmitted = volumes.reduce((s, v) => s + v.submitted, 0)
  const totalApproved = volumes.reduce((s, v) => s + v.approved, 0)
  const totalPending = applications.filter(a => a.status !== 'APPROVED' && a.status !== 'REJECTED').length
  const complianceHolds = applications.filter(a => a.status === 'COMPLIANCE_HOLD').length
  const approvalRate = totalSubmitted > 0 ? Math.round((totalApproved / totalSubmitted) * 100) : 0
  const avgProcessingDays = applications.length > 0
    ? (applications.reduce((s, a) => s + a.processingDays, 0) / applications.length).toFixed(1)
    : '0'

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-8 py-8">
        <HeadingField
          text="KPI Dashboard"
          size="LARGE"
          headingTag="H1"
          marginBelow="EVEN_LESS"
        />
        <RichTextDisplayField
          value={[<TextItem key="sub" text="Pacific Coast Credit Union — Member Onboarding" color="SECONDARY" size="STANDARD" />]}
          marginBelow="MORE"
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
          <CardLayout padding="STANDARD" showShadow={true}>
            <div className="flex items-start justify-between mb-2">
              <TrendingUp className="text-blue-500" size={20} />
              <TagField tags={[{ text: 'This Week', backgroundColor: 'ACCENT' }]} size="SMALL" marginBelow="NONE" />
            </div>
            <HeadingField text={String(totalSubmitted)} size="LARGE" fontWeight="BOLD" marginBelow="EVEN_LESS" />
            <RichTextDisplayField value={[<TextItem key="l" text="Applications Submitted" color="SECONDARY" size="SMALL" />]} marginBelow="NONE" />
          </CardLayout>

          <CardLayout padding="STANDARD" showShadow={true}>
            <div className="flex items-start justify-between mb-2">
              <CheckCircle className="text-green-500" size={20} />
              <TagField tags={[{ text: `${approvalRate}%`, backgroundColor: 'POSITIVE' }]} size="SMALL" marginBelow="NONE" />
            </div>
            <HeadingField text={String(totalApproved)} size="LARGE" fontWeight="BOLD" marginBelow="EVEN_LESS" />
            <RichTextDisplayField value={[<TextItem key="l" text="Approved" color="SECONDARY" size="SMALL" />]} marginBelow="NONE" />
          </CardLayout>

          <CardLayout padding="STANDARD" showShadow={true}>
            <div className="flex items-start justify-between mb-2">
              <Clock className="text-orange-500" size={20} />
              <TagField tags={[{ text: 'Active', backgroundColor: 'SECONDARY' }]} size="SMALL" marginBelow="NONE" />
            </div>
            <HeadingField text={String(totalPending)} size="LARGE" fontWeight="BOLD" marginBelow="EVEN_LESS" />
            <RichTextDisplayField value={[<TextItem key="l" text="In Progress" color="SECONDARY" size="SMALL" />]} marginBelow="NONE" />
          </CardLayout>

          <CardLayout padding="STANDARD" showShadow={true}>
            <div className="flex items-start justify-between mb-2">
              <AlertCircle className="text-red-500" size={20} />
              <TagField tags={[{ text: 'Needs Action', backgroundColor: 'NEGATIVE' }]} size="SMALL" marginBelow="NONE" />
            </div>
            <HeadingField text={String(complianceHolds)} size="LARGE" fontWeight="BOLD" marginBelow="EVEN_LESS" />
            <RichTextDisplayField value={[<TextItem key="l" text="Compliance Holds" color="SECONDARY" size="SMALL" />]} marginBelow="NONE" />
          </CardLayout>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          {/* Processing Time by Stage */}
          <CardLayout padding="MORE" showShadow={true}>
            <HeadingField text="Processing Time by Stage" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
            <div className="space-y-4">
              {stages.map(stage => (
                <div key={stage.id}>
                  <div className="flex justify-between mb-1">
                    <RichTextDisplayField
                      value={[<TextItem key="n" text={stage.stage} size="SMALL" />]}
                      marginBelow="NONE"
                    />
                    <RichTextDisplayField
                      value={[<TextItem key="d" text={`${stage.avgDays}d avg`} size="SMALL" color="SECONDARY" />]}
                      marginBelow="NONE"
                    />
                  </div>
                  <ProgressBar
                    percentage={Math.min(Math.round((stage.avgDays / 3) * 100), 100)}
                    color={stage.slaBreaches > 0 ? 'NEGATIVE' : 'POSITIVE'}
                    marginBelow="NONE"
                  />
                  {stage.slaBreaches > 0 && (
                    <RichTextDisplayField
                      value={[<TextItem key="b" text={`${stage.slaBreaches} SLA breach${stage.slaBreaches > 1 ? 'es' : ''}`} size="SMALL" color="NEGATIVE" />]}
                      marginBelow="NONE"
                    />
                  )}
                </div>
              ))}
            </div>
          </CardLayout>

          {/* Daily Volume */}
          <CardLayout padding="MORE" showShadow={true}>
            <div className="flex items-center justify-between mb-4">
              <HeadingField text="Daily Volume (7 Days)" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="NONE" />
              <div className="flex items-center gap-1">
                <TrendingDown className="text-green-500" size={16} />
                <RichTextDisplayField value={[<TextItem key="t" text={`Avg ${avgProcessingDays}d processing`} size="SMALL" color="POSITIVE" />]} marginBelow="NONE" />
              </div>
            </div>
            <ReadOnlyGrid
              data={volumes.map(v => ({
                date: v.date.slice(5),
                submitted: String(v.submitted),
                approved: String(v.approved),
                pending: String(v.pending),
              }))}
              marginBelow="NONE"
            >
              <GridColumn label="Date" value="date" width="NARROW" />
              <GridColumn label="Submitted" value="submitted" width="NARROW" />
              <GridColumn label="Approved" value="approved" width="NARROW" />
              <GridColumn label="Pending" value="pending" width="NARROW" />
            </ReadOnlyGrid>
          </CardLayout>
        </div>

        {/* Staff Performance */}
        <CardLayout padding="MORE" showShadow={true}>
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-blue-500" size={20} />
            <HeadingField text="Staff Performance" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="NONE" />
          </div>
          <ReadOnlyGrid
            data={staff.map(s => ({
              name: getDisplayName(s.username),
              processed: String(s.processed),
              avgHours: `${s.avgProcessingHours}h`,
              sla: `${s.slaCompliance}%`,
            }))}
            marginBelow="NONE"
          >
            <GridColumn label="Staff Member" value="name" width="MEDIUM" />
            <GridColumn label="Processed" value="processed" width="NARROW" />
            <GridColumn label="Avg Time" value="avgHours" width="NARROW" />
            <GridColumn label="SLA Compliance" value="sla" width="NARROW" />
          </ReadOnlyGrid>
        </CardLayout>

        {/* Recent Applications */}
        <div className="mt-6">
          <CardLayout padding="MORE" showShadow={true}>
            <HeadingField text="Recent Applications" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
            <ReadOnlyGrid
              data={applications.slice(0, 6).map(a => ({
                id: String(a.id),
                member: a.memberName,
                type: a.accountType,
                stage: a.stage,
                status: a.status.replace('_', ' '),
                assignee: getDisplayName(a.assignee),
              }))}
              marginBelow="NONE"
            >
              <GridColumn label="ID" value="id" width="ICON_PLUS" />
              <GridColumn label="Member" value="member" width="MEDIUM" />
              <GridColumn label="Account Type" value="type" width="MEDIUM" />
              <GridColumn label="Stage" value="stage" width="MEDIUM" />
              <GridColumn label="Status" value="status" width="NARROW_PLUS" />
              <GridColumn label="Assignee" value="assignee" width="NARROW_PLUS" />
            </ReadOnlyGrid>
          </CardLayout>
        </div>
      </div>
    </div>
  )
}
