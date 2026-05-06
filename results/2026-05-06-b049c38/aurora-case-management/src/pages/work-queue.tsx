import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import {
  HeadingField,
  CardLayout,
  RichTextDisplayField,
  TextItem,
  ReadOnlyGrid,
  GridColumn,
  TagField,
  ProgressBar,
  DropdownField,
  ButtonWidget,
  StampField,
  MessageBanner,
} from '@pglevy/sailwind'
import { getApplications, type Application } from '../db/applications'
import { getDisplayName } from '../db/users'

const STATUS_COLORS: Record<string, string> = {
  'Pending Review': '#DBEAFE',
  'Documents Needed': '#FEF3C7',
  'Compliance Review': '#FEE2E2',
  'Approved': '#D1FAE5',
}

const PRIORITY_COLORS: Record<string, string> = {
  HIGH: '#FEE2E2',
  MEDIUM: '#FEF3C7',
  LOW: '#F3F4F6',
}

export default function WorkQueue() {
  const [applications, setApplications] = useState<Application[]>([])
  const [statusFilter, setStatusFilter] = useState('')
  const [assigneeFilter, setAssigneeFilter] = useState('')
  const [, setLocation] = useLocation()

  useEffect(() => {
    getApplications().then(setApplications)
  }, [])

  const filtered = applications.filter(a => {
    if (statusFilter && a.status !== statusFilter) return false
    if (assigneeFilter && a.assignee !== assigneeFilter) return false
    return true
  })

  const myQueue = filtered.filter(a => a.assignee === 'alice.chen' && a.status !== 'Approved')
  const slaToday = applications.filter(a => a.slaDeadline === '2026-05-06' && a.status !== 'Approved').length

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-8 py-8">
        <HeadingField text="Work Queue" size="LARGE" headingTag="H1" fontWeight="BOLD" marginBelow="STANDARD" />
        <RichTextDisplayField
          value={[<TextItem key="s" text="Member Services — Daily Application Queue" color="SECONDARY" size="MEDIUM" />]}
          marginBelow="MORE"
        />

        {slaToday > 0 && (
          <MessageBanner
            primaryText={`${slaToday} application(s) have SLA deadlines today.`}
            backgroundColor="WARN"
            highlightColor="WARN"
            icon="warning"
            marginBelow="MORE"
          />
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
          {[
            { label: 'My Queue', value: myQueue.length, color: 'ACCENT' },
            { label: 'Pending Review', value: applications.filter(a => a.status === 'Pending Review').length, color: '#3B82F6' },
            { label: 'Docs Needed', value: applications.filter(a => a.status === 'Documents Needed').length, color: '#D97706' },
            { label: 'Compliance', value: applications.filter(a => a.status === 'Compliance Review').length, color: 'NEGATIVE' },
          ].map(card => (
            <CardLayout key={card.label} padding="MORE" showShadow={true} showBorder={true}>
              <HeadingField text={String(card.value)} size="LARGE_PLUS" fontWeight="BOLD" color={card.color as string} align="CENTER" marginBelow="EVEN_LESS" />
              <RichTextDisplayField value={[<TextItem key="l" text={card.label} color="SECONDARY" size="STANDARD" />]} align="CENTER" />
            </CardLayout>
          ))}
        </div>

        {/* Filters */}
        <CardLayout padding="STANDARD" showShadow={true} marginBelow="STANDARD">
          <div className="flex gap-4 items-end flex-wrap">
            <div className="flex-1 min-w-48">
              <DropdownField
                label="Filter by Status"
                choiceLabels={['All Statuses', 'Pending Review', 'Documents Needed', 'Compliance Review', 'Approved']}
                choiceValues={['', 'Pending Review', 'Documents Needed', 'Compliance Review', 'Approved']}
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="All Statuses"
              />
            </div>
            <div className="flex-1 min-w-48">
              <DropdownField
                label="Filter by Assignee"
                choiceLabels={['All Reps', 'Alice Chen', 'Bob Martinez', 'Carol White', 'David Kim']}
                choiceValues={['', 'alice.chen', 'bob.martinez', 'carol.white', 'david.kim']}
                value={assigneeFilter}
                onChange={setAssigneeFilter}
                placeholder="All Reps"
              />
            </div>
            <ButtonWidget
              label="Clear Filters"
              style="GHOST"
              onClick={() => { setStatusFilter(''); setAssigneeFilter('') }}
            />
          </div>
        </CardLayout>

        {/* Queue Grid */}
        <CardLayout padding="MORE" showShadow={true}>
          <HeadingField text={`Applications (${filtered.length})`} size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
          <ReadOnlyGrid
            data={filtered}
            emptyGridMessage="No applications match the current filters."
            shadeAlternateRows={true}
            spacing="STANDARD"
          >
            <GridColumn
              label="Priority"
              value={(row: Application) => (
                <StampField
                  text={row.priority}
                  backgroundColor={PRIORITY_COLORS[row.priority] ?? '#F3F4F6'}
                  contentColor={row.priority === 'HIGH' ? 'NEGATIVE' : row.priority === 'MEDIUM' ? '#D97706' : 'SECONDARY'}
                  size="SMALL"
                />
              )}
              width="NARROW"
            />
            <GridColumn label="App #" value={(row: Application) => String(row.id)} width="NARROW" />
            <GridColumn label="Applicant" value="applicantName" width="MEDIUM" />
            <GridColumn label="Account Type" value="accountType" width="MEDIUM" />
            <GridColumn
              label="Status"
              value={(row: Application) => (
                <TagField
                  tags={[{
                    text: row.status,
                    backgroundColor: STATUS_COLORS[row.status] ?? '#F3F4F6',
                    textColor: 'STANDARD',
                  }]}
                />
              )}
              width="MEDIUM_PLUS"
            />
            <GridColumn
              label="Completion"
              value={(row: Application) => (
                <div className="w-full">
                  <ProgressBar percentage={row.completionPct} color="ACCENT" showPercentage={true} />
                </div>
              )}
              width="MEDIUM"
            />
            <GridColumn label="Assignee" value={(row: Application) => getDisplayName(row.assignee)} width="MEDIUM" />
            <GridColumn label="SLA Deadline" value="slaDeadline" width="NARROW_PLUS" />
            <GridColumn
              label="Action"
              value={(row: Application) => (
                <ButtonWidget
                  label="Open"
                  style="OUTLINE"
                  size="SMALL"
                  onClick={() => setLocation(`/documents/${row.id}`)}
                />
              )}
              width="NARROW"
            />
          </ReadOnlyGrid>
        </CardLayout>
      </div>
    </div>
  )
}
