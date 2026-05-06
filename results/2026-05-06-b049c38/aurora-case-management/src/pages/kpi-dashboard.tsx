import { useEffect, useState } from 'react'
import {
  HeadingField,
  CardLayout,
  RichTextDisplayField,
  TextItem,
  ProgressBar,
  TagField,
  ReadOnlyGrid,
  GridColumn,
  StampField,
  MessageBanner,
} from '@pglevy/sailwind'
import { getApplications, type Application } from '../db/applications'
import { getDisplayName } from '../db/users'

export default function KpiDashboard() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    getApplications().then(setApplications)
  }, [])

  const total = applications.length
  const approved = applications.filter(a => a.status === 'Approved').length
  const pendingReview = applications.filter(a => a.status === 'Pending Review').length
  const docsNeeded = applications.filter(a => a.status === 'Documents Needed').length
  const complianceReview = applications.filter(a => a.status === 'Compliance Review').length
  const highRisk = applications.filter(a => a.riskScore === 'HIGH').length
  const completionRate = total > 0 ? Math.round((approved / total) * 100) : 0

  const staffMetrics = ['alice.chen', 'bob.martinez', 'carol.white', 'david.kim'].map(username => {
    const assigned = applications.filter(a => a.assignee === username)
    const done = assigned.filter(a => a.status === 'Approved').length
    return {
      name: getDisplayName(username),
      total: assigned.length,
      completed: done,
      rate: assigned.length > 0 ? Math.round((done / assigned.length) * 100) : 0,
    }
  })

  const slaAtRisk = applications.filter(a => {
    const deadline = new Date(a.slaDeadline)
    const today = new Date('2026-05-06')
    const diff = (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    return diff <= 1 && a.status !== 'Approved'
  })

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-8 py-8">
        <HeadingField text="KPI Dashboard" size="LARGE" headingTag="H1" fontWeight="BOLD" marginBelow="STANDARD" />
        <RichTextDisplayField
          value={[<TextItem key="sub" text="Pacific Coast Credit Union — Member Onboarding Operations" color="SECONDARY" size="MEDIUM" />]}
          marginBelow="MORE"
        />

        {slaAtRisk.length > 0 && (
          <MessageBanner
            primaryText={`${slaAtRisk.length} application(s) are at risk of missing SLA deadlines today.`}
            backgroundColor="WARN"
            highlightColor="WARN"
            icon="warning"
            marginBelow="MORE"
          />
        )}

        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
          <CardLayout padding="MORE" showShadow={true} showBorder={true}>
            <HeadingField text={String(total)} size="LARGE_PLUS" fontWeight="BOLD" color="ACCENT" align="CENTER" marginBelow="EVEN_LESS" />
            <RichTextDisplayField
              value={[<TextItem key="l" text="Total Applications" color="SECONDARY" size="STANDARD" />]}
              align="CENTER"
            />
          </CardLayout>
          <CardLayout padding="MORE" showShadow={true} showBorder={true}>
            <HeadingField text={String(approved)} size="LARGE_PLUS" fontWeight="BOLD" color="POSITIVE" align="CENTER" marginBelow="EVEN_LESS" />
            <RichTextDisplayField
              value={[<TextItem key="l" text="Approved" color="SECONDARY" size="STANDARD" />]}
              align="CENTER"
            />
          </CardLayout>
          <CardLayout padding="MORE" showShadow={true} showBorder={true}>
            <HeadingField text={String(pendingReview + docsNeeded)} size="LARGE_PLUS" fontWeight="BOLD" color="#D97706" align="CENTER" marginBelow="EVEN_LESS" />
            <RichTextDisplayField
              value={[<TextItem key="l" text="In Progress" color="SECONDARY" size="STANDARD" />]}
              align="CENTER"
            />
          </CardLayout>
          <CardLayout padding="MORE" showShadow={true} showBorder={true}>
            <HeadingField text={String(highRisk)} size="LARGE_PLUS" fontWeight="BOLD" color="NEGATIVE" align="CENTER" marginBelow="EVEN_LESS" />
            <RichTextDisplayField
              value={[<TextItem key="l" text="High Risk" color="SECONDARY" size="STANDARD" />]}
              align="CENTER"
            />
          </CardLayout>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-2">
          {/* Status Breakdown */}
          <CardLayout padding="MORE" showShadow={true}>
            <HeadingField text="Application Status Breakdown" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
            <div className="space-y-4">
              <div>
                <RichTextDisplayField
                  value={[
                    <TextItem key="l" text="Approved" size="STANDARD" />,
                    <TextItem key="v" text={`  ${approved} of ${total}`} color="SECONDARY" size="STANDARD" />,
                  ]}
                  marginBelow="EVEN_LESS"
                />
                <ProgressBar percentage={total > 0 ? Math.round((approved / total) * 100) : 0} color="POSITIVE" showPercentage={true} />
              </div>
              <div>
                <RichTextDisplayField
                  value={[
                    <TextItem key="l" text="Pending Review" size="STANDARD" />,
                    <TextItem key="v" text={`  ${pendingReview} of ${total}`} color="SECONDARY" size="STANDARD" />,
                  ]}
                  marginBelow="EVEN_LESS"
                />
                <ProgressBar percentage={total > 0 ? Math.round((pendingReview / total) * 100) : 0} color="#3B82F6" showPercentage={true} />
              </div>
              <div>
                <RichTextDisplayField
                  value={[
                    <TextItem key="l" text="Documents Needed" size="STANDARD" />,
                    <TextItem key="v" text={`  ${docsNeeded} of ${total}`} color="SECONDARY" size="STANDARD" />,
                  ]}
                  marginBelow="EVEN_LESS"
                />
                <ProgressBar percentage={total > 0 ? Math.round((docsNeeded / total) * 100) : 0} color="#D97706" showPercentage={true} />
              </div>
              <div>
                <RichTextDisplayField
                  value={[
                    <TextItem key="l" text="Compliance Review" size="STANDARD" />,
                    <TextItem key="v" text={`  ${complianceReview} of ${total}`} color="SECONDARY" size="STANDARD" />,
                  ]}
                  marginBelow="EVEN_LESS"
                />
                <ProgressBar percentage={total > 0 ? Math.round((complianceReview / total) * 100) : 0} color="NEGATIVE" showPercentage={true} />
              </div>
            </div>
          </CardLayout>

          {/* Staff Performance */}
          <CardLayout padding="MORE" showShadow={true}>
            <HeadingField text="Staff Performance" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
            <div className="space-y-4">
              {staffMetrics.map(s => (
                <div key={s.name}>
                  <RichTextDisplayField
                    value={[
                      <TextItem key="n" text={s.name} size="STANDARD" />,
                      <TextItem key="v" text={`  ${s.completed}/${s.total} completed`} color="SECONDARY" size="STANDARD" />,
                    ]}
                    marginBelow="EVEN_LESS"
                  />
                  <ProgressBar percentage={s.rate} color="ACCENT" showPercentage={true} />
                </div>
              ))}
            </div>
          </CardLayout>
        </div>

        {/* Account Type Distribution */}
        <CardLayout padding="MORE" showShadow={true} marginBelow="MORE">
          <HeadingField text="Account Type Distribution" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
          <div className="flex flex-wrap gap-4">
            {['Essential Checking', 'Business Advantage', 'Youth Savings'].map(type => {
              const count = applications.filter(a => a.accountType === type).length
              return (
                <CardLayout key={type} padding="STANDARD" showBorder={true} style="TRANSPARENT">
                  <HeadingField text={String(count)} size="LARGE" fontWeight="BOLD" color="ACCENT" align="CENTER" marginBelow="EVEN_LESS" />
                  <RichTextDisplayField
                    value={[<TextItem key="t" text={type} color="SECONDARY" size="SMALL" />]}
                    align="CENTER"
                  />
                </CardLayout>
              )
            })}
          </div>
        </CardLayout>

        {/* SLA At-Risk Table */}
        <CardLayout padding="MORE" showShadow={true} marginBelow="MORE">
          <HeadingField text="SLA At-Risk Applications" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
          <ReadOnlyGrid
            data={slaAtRisk}
            emptyGridMessage="No applications at risk — great work!"
            shadeAlternateRows={true}
          >
            <GridColumn label="ID" value={(row: Application) => String(row.id)} width="NARROW" />
            <GridColumn label="Applicant" value="applicantName" width="MEDIUM" />
            <GridColumn label="Account Type" value="accountType" width="MEDIUM" />
            <GridColumn label="SLA Deadline" value="slaDeadline" width="NARROW_PLUS" />
            <GridColumn
              label="Status"
              value={(row: Application) => (
                <TagField
                  tags={[{
                    text: row.status,
                    backgroundColor:
                      row.status === 'Compliance Review' ? '#FEE2E2' :
                      row.status === 'Documents Needed' ? '#FEF3C7' : '#DBEAFE',
                    textColor: 'STANDARD',
                  }]}
                />
              )}
              width="MEDIUM"
            />
            <GridColumn
              label="Risk"
              value={(row: Application) => (
                <StampField
                  text={row.riskScore}
                  backgroundColor={row.riskScore === 'HIGH' ? '#FEE2E2' : row.riskScore === 'MEDIUM' ? '#FEF3C7' : '#D1FAE5'}
                  contentColor={row.riskScore === 'HIGH' ? 'NEGATIVE' : row.riskScore === 'MEDIUM' ? '#D97706' : 'POSITIVE'}
                  size="SMALL"
                />
              )}
              width="NARROW"
            />
          </ReadOnlyGrid>
        </CardLayout>

        {/* Overall Completion Rate */}
        <CardLayout padding="MORE" showShadow={true}>
          <HeadingField text="Overall Completion Rate" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
          <RichTextDisplayField
            value={[<TextItem key="t" text="Target: 85% within 24 hours. Current month performance:" color="SECONDARY" size="STANDARD" />]}
            marginBelow="STANDARD"
          />
          <ProgressBar percentage={completionRate} color="POSITIVE" showPercentage={true} />
        </CardLayout>
      </div>
    </div>
  )
}
