import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'wouter'
import {
  HeadingField,
  CardLayout,
  RichTextDisplayField,
  TextItem,
  TagField,
  ButtonArrayLayout,
  TextField,
  DropdownField,
  MessageBanner,
} from '@pglevy/sailwind'
import { Mail, Phone, FileText, ArrowLeft, Lock } from 'lucide-react'
import { getCommunicationsByApplication, createCommunication, type Communication } from '../db/communications'
import { getApplication, type Application } from '../db/applications'
import { getDisplayName } from '../db/users'

const TYPE_ICONS: Record<string, React.ReactNode> = {
  EMAIL: <Mail size={16} />,
  PHONE: <Phone size={16} />,
  NOTE: <FileText size={16} />,
}

const TYPE_COLORS: Record<string, string> = {
  EMAIL: 'ACCENT',
  PHONE: 'POSITIVE',
  NOTE: 'SECONDARY',
}

const TYPE_LABELS: Record<string, string> = {
  EMAIL: 'Email',
  PHONE: 'Phone Note',
  NOTE: 'Internal Note',
}

type TabId = 'all' | 'email' | 'phone' | 'internal'

function formatDateTime(iso: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' at ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default function Communications() {
  const params = useParams<{ id: string }>()
  const [, setLocation] = useLocation()
  const appId = params.id ? parseInt(params.id) : 1001

  const [application, setApplication] = useState<Application | null>(null)
  const [comms, setComms] = useState<Communication[]>([])
  const [activeTab, setActiveTab] = useState<TabId>('all')
  const [showCompose, setShowCompose] = useState(false)
  const [newType, setNewType] = useState('NOTE')
  const [newSubject, setNewSubject] = useState('')
  const [newBody, setNewBody] = useState('')

  useEffect(() => {
    getApplication(appId).then(a => setApplication(a ?? null))
    getCommunicationsByApplication(appId).then(setComms)
  }, [appId])

  const tabs: { id: TabId; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'internal', label: 'Internal Notes' },
  ]

  const filtered = comms.filter(c => {
    if (activeTab === 'all') return true
    if (activeTab === 'email') return c.type === 'EMAIL'
    if (activeTab === 'phone') return c.type === 'PHONE'
    if (activeTab === 'internal') return c.isInternal
    return true
  })

  const handleAddNote = async () => {
    if (!newBody.trim()) return
    const newComm = await createCommunication({
      applicationId: appId,
      type: newType,
      direction: newType === 'NOTE' ? 'INTERNAL' : 'OUTBOUND',
      subject: newSubject || `${TYPE_LABELS[newType]} — ${new Date().toLocaleDateString()}`,
      body: newBody,
      author: 'alice.chen',
      createdOn: new Date().toISOString(),
      isInternal: newType === 'NOTE',
      attachments: [],
    })
    setComms(prev => [newComm, ...prev])
    setNewSubject('')
    setNewBody('')
    setShowCompose(false)
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <RichTextDisplayField value={[<TextItem key="t" text="Loading..." color="SECONDARY" size="STANDARD" />]} marginBelow="NONE" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-8 py-8">
        {/* Back nav */}
        <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => setLocation('/work-queue')}>
          <ArrowLeft className="text-blue-500" size={16} />
          <RichTextDisplayField value={[<TextItem key="b" text="Back to Work Queue" size="SMALL" color="ACCENT" />]} marginBelow="NONE" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <HeadingField text={`Communications — ${application.memberName}`} size="LARGE" headingTag="H1" marginBelow="EVEN_LESS" />
            <div className="flex gap-3 flex-wrap">
              <RichTextDisplayField value={[<TextItem key="id" text={`Application #${application.id}`} size="STANDARD" color="SECONDARY" />]} marginBelow="NONE" />
              <RichTextDisplayField value={[<TextItem key="e" text={application.memberEmail} size="STANDARD" color="SECONDARY" />]} marginBelow="NONE" />
              <RichTextDisplayField value={[<TextItem key="p" text={application.memberPhone} size="STANDARD" color="SECONDARY" />]} marginBelow="NONE" />
            </div>
          </div>
          <ButtonArrayLayout
            buttons={[
              { label: 'Add Note / Log', style: 'SOLID', color: 'ACCENT', onClick: () => setShowCompose(v => !v) },
            ]}
            align="END"
          />
        </div>

        {/* Compose Panel */}
        {showCompose && (
          <div className="mb-6">
            <CardLayout padding="MORE" showShadow={true}>
              <HeadingField text="Add Communication" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <DropdownField
                  label="Type"
                  value={newType}
                  onChange={(v: string) => setNewType(v)}
                  choiceLabels={['Internal Note', 'Phone Note', 'Email']}
                  choiceValues={['NOTE', 'PHONE', 'EMAIL']}
                />
                <TextField
                  label="Subject"
                  value={newSubject}
                  onChange={(v: string) => setNewSubject(v)}
                  placeholder="Brief subject..."
                />
              </div>
              <TextField
                label="Notes / Message Body"
                value={newBody}
                onChange={(v: string) => setNewBody(v)}
                placeholder="Enter your notes or message here..."
              />
              {newType === 'NOTE' && (
                <div className="mt-3">
                  <MessageBanner
                    primaryText="Internal notes are only visible to staff — not shared with the member."
                    backgroundColor="INFO"
                    highlightColor="INFO"
                    icon="info"
                  />
                </div>
              )}
              <div className="mt-4">
                <ButtonArrayLayout
                  buttons={[
                    { label: 'Cancel', style: 'OUTLINE', color: 'SECONDARY', onClick: () => setShowCompose(false) },
                    { label: 'Save', style: 'SOLID', color: 'ACCENT', disabled: !newBody.trim(), onClick: handleAddNote },
                  ]}
                  align="END"
                />
              </div>
            </CardLayout>
          </div>
        )}

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

        {/* Timeline */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <CardLayout padding="MORE" showShadow={false}>
              <div className="text-center py-4">
                <RichTextDisplayField value={[<TextItem key="t" text="No communications found." color="SECONDARY" size="STANDARD" />]} marginBelow="NONE" />
              </div>
            </CardLayout>
          )}
          {filtered.map(comm => (
            <CardLayout key={comm.id} padding="STANDARD" showShadow={true}>
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${comm.isInternal ? 'bg-gray-100 text-gray-500' : comm.type === 'EMAIL' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                  {TYPE_ICONS[comm.type]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <TagField
                      tags={[{ text: TYPE_LABELS[comm.type] ?? comm.type, backgroundColor: TYPE_COLORS[comm.type] ?? 'SECONDARY' }]}
                      size="SMALL"
                      marginBelow="NONE"
                    />
                    {comm.isInternal && (
                      <div className="flex items-center gap-1">
                        <Lock size={12} className="text-gray-400" />
                        <RichTextDisplayField value={[<TextItem key="i" text="Internal" size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                      </div>
                    )}
                    {comm.direction === 'INBOUND' && (
                      <TagField tags={[{ text: 'Inbound', backgroundColor: 'SECONDARY' }]} size="SMALL" marginBelow="NONE" />
                    )}
                  </div>

                  <RichTextDisplayField
                    value={[<TextItem key="subj" text={comm.subject} size="STANDARD" style="STRONG" />]}
                    marginBelow="EVEN_LESS"
                  />

                  <RichTextDisplayField
                    value={[<TextItem key="body" text={comm.body} size="STANDARD" color="SECONDARY" />]}
                    marginBelow="EVEN_LESS"
                  />

                  {comm.attachments.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {comm.attachments.map((att, i) => (
                        <div key={i} className="flex items-center gap-1 bg-gray-100 rounded px-2 py-1">
                          <FileText size={12} className="text-gray-500" />
                          <RichTextDisplayField value={[<TextItem key="a" text={att} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 mt-2">
                    <RichTextDisplayField value={[<TextItem key="auth" text={getDisplayName(comm.author)} size="SMALL" color="SECONDARY" style="STRONG" />]} marginBelow="NONE" />
                    <RichTextDisplayField value={[<TextItem key="dt" text={formatDateTime(comm.createdOn)} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                  </div>
                </div>
              </div>
            </CardLayout>
          ))}
        </div>
      </div>
    </div>
  )
}
