import { useEffect, useState } from 'react'
import {
  HeadingField,
  CardLayout,
  RichTextDisplayField,
  TextItem,
  TagField,
  ProgressBar,
  ButtonArrayLayout,
  DropdownField,
  TextField,
  MessageBanner,
} from '@pglevy/sailwind'
import { Clock, AlertCircle, CheckCircle, Filter } from 'lucide-react'
import { getApplications, type Application } from '../db/applications'
import { getDisplayName } from '../db/users'
import { useLocation } from 'wouter'

const STATUS_COLORS: Record<string, string> = {
  IN_REVIEW: 'ACCENT',
  PENDING_DOCS: 'SECONDARY',
  COMPLIANCE_HOLD: 'NEGATIVE',
  APPROVED: 'POSITIVE',
  REJECTED: 'NEGATIVE',
}

const STATUS_LABELS: Record<string, string> = {
  IN_REVIEW: 'In Review',
  PENDING_DOCS: 'Pending Docs',
  COMPLIANCE_HOLD: 'Compliance Hold',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
}

type TabId = 'my' | 'all' | 'compliance'

export default function WorkQueue() {
  const [applications, setApplications] = useState<Application[]>([])
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [filterAssignee, setFilterAssignee] = useState('ALL')
  const [activeTab, setActiveTab] = useState<TabId>('my')
  const [, setLocation] = useLocation()

  useEffect(() => {
    getApplications().then(setApplications)
  }, [])

  const filtered = applications.filter(a => {
    const matchSearch = !search || a.memberName.toLowerCase().includes(search.toLowerCase()) || String(a.id).includes(search)
    const matchStatus = filterStatus === 'ALL' || a.status === filterStatus
    const matchAssignee = filterAssignee === 'ALL' || a.assignee === filterAssignee
    const matchTab =
      activeTab === 'all' ? true :
      activeTab === 'compliance' ? a.status === 'COMPLIANCE_HOLD' :
      a.assignee === 'alice.chen'
    return matchSearch && matchStatus && matchAssignee && matchTab
  })

  const pendingCount = applications.filter(a => a.status !== 'APPROVED' && a.status !== 'REJECTED').length
  const highPriorityCount = applications.filter(a => a.priority === 'HIGH' && a.status !== 'APPROVED').length
  const slaAtRisk = applications.filter(a => {
    const deadline = new Date(a.slaDeadline)
    const now = new Date('2026-05-03')
    const diff = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    return diff <= 1 && a.status !== 'APPROVED'
  }).length

  const isSlaNear = (deadline: string) => {
    const d = new Date(deadline)
    const now = new Date('2026-05-03')
    return (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 1
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: 'my', label: 'My Queue' },
    { id: 'all', label: 'All Applications' },
    { id: 'compliance', label: 'Compliance Holds' },
  ]

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-8 py-8">
        <HeadingField text="Work Queue" size="LARGE" headingTag="H1" marginBelow="EVEN_LESS" />
        <RichTextDisplayField
          value={[<TextItem key="s" text="Member Services — Application Processing" color="SECONDARY" size="STANDARD" />]}
          marginBelow="MORE"
        />

        {/* Summary Banners */}
        {highPriorityCount > 0 && (
          <div className="mb-4">
            <MessageBanner
              primaryText={`${highPriorityCount} high-priority application${highPriorityCount > 1 ? 's' : ''} require immediate attention.`}
              backgroundColor="WARNING"
              highlightColor="WARNING"
              icon="warning"
            />
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <CardLayout padding="STANDARD" showShadow={true}>
            <div className="flex items-center gap-3">
              <Clock className="text-blue-500" size={20} />
              <div>
                <HeadingField text={String(pendingCount)} size="MEDIUM" fontWeight="BOLD" marginBelow="NONE" />
                <RichTextDisplayField value={[<TextItem key="l" text="Pending" size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
              </div>
            </div>
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true}>
            <div className="flex items-center gap-3">
              <AlertCircle className="text-red-500" size={20} />
              <div>
                <HeadingField text={String(highPriorityCount)} size="MEDIUM" fontWeight="BOLD" marginBelow="NONE" />
                <RichTextDisplayField value={[<TextItem key="l" text="High Priority" size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
              </div>
            </div>
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true}>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-orange-500" size={20} />
              <div>
                <HeadingField text={String(slaAtRisk)} size="MEDIUM" fontWeight="BOLD" marginBelow="NONE" />
                <RichTextDisplayField value={[<TextItem key="l" text="SLA At Risk" size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
              </div>
            </div>
          </CardLayout>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-4">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === t.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <CardLayout padding="STANDARD" showShadow={false}>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <TextField
                label="Search"
                value={search}
                onChange={(v: string) => setSearch(v)}
                placeholder="Search by name or application ID..."
              />
            </div>
            <div className="w-48">
              <DropdownField
                label="Status"
                value={filterStatus}
                onChange={(v: string) => setFilterStatus(v)}
                choiceLabels={['All Statuses', 'In Review', 'Pending Docs', 'Compliance Hold', 'Approved']}
                choiceValues={['ALL', 'IN_REVIEW', 'PENDING_DOCS', 'COMPLIANCE_HOLD', 'APPROVED']}
              />
            </div>
            <div className="w-48">
              <DropdownField
                label="Assignee"
                value={filterAssignee}
                onChange={(v: string) => setFilterAssignee(v)}
                choiceLabels={['All Assignees', 'Alice Chen', 'Bob Martinez', 'Carol White', 'David Kim']}
                choiceValues={['ALL', 'alice.chen', 'bob.martinez', 'carol.white', 'david.kim']}
              />
            </div>
          </div>
        </CardLayout>

        {/* Application Cards */}
        <div className="mt-4 space-y-3">
          {filtered.length === 0 && (
            <CardLayout padding="MORE" showShadow={false}>
              <div className="text-center py-4">
                <Filter className="text-gray-300 mx-auto mb-2" size={32} />
                <RichTextDisplayField value={[<TextItem key="t" text="No applications match your filters." color="SECONDARY" size="STANDARD" />]} marginBelow="NONE" />
              </div>
            </CardLayout>
          )}
          {filtered.map(app => (
            <CardLayout key={app.id} padding="STANDARD" showShadow={true}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <RichTextDisplayField
                      value={[<TextItem key="n" text={app.memberName} size="MEDIUM" style="STRONG" />]}
                      marginBelow="NONE"
                    />
                    <TagField
                      tags={[{ text: STATUS_LABELS[app.status] ?? app.status, backgroundColor: STATUS_COLORS[app.status] ?? 'SECONDARY' }]}
                      size="SMALL"
                      marginBelow="NONE"
                    />
                    {app.priority === 'HIGH' && (
                      <TagField tags={[{ text: 'High Priority', backgroundColor: 'NEGATIVE' }]} size="SMALL" marginBelow="NONE" />
                    )}
                    {isSlaNear(app.slaDeadline) && (
                      <TagField tags={[{ text: 'SLA At Risk', backgroundColor: 'NEGATIVE' }]} size="SMALL" marginBelow="NONE" />
                    )}
                  </div>
                  <div className="flex gap-4 flex-wrap">
                    <RichTextDisplayField value={[<TextItem key="id" text={`#${app.id}`} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                    <RichTextDisplayField value={[<TextItem key="t" text={app.accountType} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                    <RichTextDisplayField value={[<TextItem key="st" text={app.stage} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                    <RichTextDisplayField value={[<TextItem key="a" text={`Assigned: ${getDisplayName(app.assignee)}`} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                    <RichTextDisplayField value={[<TextItem key="d" text={`SLA: ${app.slaDeadline}`} size="SMALL" color={isSlaNear(app.slaDeadline) ? 'NEGATIVE' : 'SECONDARY'} />]} marginBelow="NONE" />
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 max-w-xs">
                      <ProgressBar percentage={app.completionPct} color={app.completionPct === 100 ? 'POSITIVE' : 'ACCENT'} marginBelow="NONE" />
                    </div>
                    <RichTextDisplayField value={[<TextItem key="p" text={`${app.completionPct}% complete`} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                  </div>
                </div>
                <div className="shrink-0 flex flex-col gap-2">
                  <ButtonArrayLayout
                    buttons={[
                      {
                        label: 'Review Docs',
                        style: 'SOLID',
                        color: 'ACCENT',
                        onClick: () => setLocation(`/document-management/${app.id}`),
                      },
                    ]}
                    align="END"
                  />
                  <ButtonArrayLayout
                    buttons={[
                      {
                        label: 'Communications',
                        style: 'OUTLINE',
                        color: 'SECONDARY',
                        onClick: () => setLocation(`/communications/${app.id}`),
                      },
                    ]}
                    align="END"
                  />
                </div>
              </div>
            </CardLayout>
          ))}
        </div>
      </div>
    </div>
  )
}
