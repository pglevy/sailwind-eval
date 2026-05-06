import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'wouter'
import {
  HeadingField,
  CardLayout,
  RichTextDisplayField,
  TextItem,
  TagField,
  ButtonWidget,
  ButtonArrayLayout,
  TextField,
  DropdownField,
  SwitchField,
  DialogField,
  TabsField,
} from '@pglevy/sailwind'
import { getApplication, type Application } from '../db/applications'
import { getNotesByApplication, createNote, type Note } from '../db/notes'
import { getDisplayName } from '../db/users'

const TYPE_COLORS: Record<string, string> = {
  'Phone Call': '#DBEAFE',
  'Email': '#EDE9FE',
  'Internal Note': '#F3F4F6',
}

const DIRECTION_LABELS: Record<string, string> = {
  INBOUND: '← Inbound',
  OUTBOUND: '→ Outbound',
  INTERNAL: '⊙ Internal',
}

export default function CommunicationNotes() {
  const params = useParams<{ id: string }>()
  const appId = params.id ? parseInt(params.id) : 1001
  const [, setLocation] = useLocation()

  const [application, setApplication] = useState<Application | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const [activeTab, setActiveTab] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)

  // New note form state
  const [newType, setNewType] = useState('Internal Note')
  const [newSubject, setNewSubject] = useState('')
  const [newBody, setNewBody] = useState('')
  const [newIsInternal, setNewIsInternal] = useState(true)

  useEffect(() => {
    getApplication(appId).then(app => setApplication(app ?? null))
    getNotesByApplication(appId).then(setNotes)
  }, [appId])

  const externalNotes = notes.filter(n => !n.isInternal)
  const internalNotes = notes.filter(n => n.isInternal)
  const phoneNotes = notes.filter(n => n.type === 'Phone Call')
  const emailNotes = notes.filter(n => n.type === 'Email')

  const filteredNotes = activeTab === 'external' ? externalNotes
    : activeTab === 'internal' ? internalNotes
    : activeTab === 'phone' ? phoneNotes
    : activeTab === 'email' ? emailNotes
    : notes

  async function handleAddNote() {
    if (!newSubject || !newBody) return
    const note = await createNote({
      applicationId: appId,
      type: newType,
      subject: newSubject,
      body: newBody,
      author: 'alice.chen',
      createdOn: new Date().toISOString(),
      isInternal: newIsInternal,
      direction: newIsInternal ? 'INTERNAL' : 'OUTBOUND',
    })
    setNotes(prev => [...prev, note])
    setNewSubject('')
    setNewBody('')
    setDialogOpen(false)
  }

  function formatDate(iso: string) {
    if (!iso) return ''
    const d = new Date(iso)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-8 py-8">
        <div className="mb-4">
          <ButtonWidget label="← Back to Work Queue" style="GHOST" onClick={() => setLocation('/work-queue')} />
        </div>

        <HeadingField text="Communication & Notes" size="LARGE" headingTag="H1" fontWeight="BOLD" marginBelow="STANDARD" />

        {application && (
          <CardLayout padding="MORE" showShadow={true} marginBelow="MORE">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                <HeadingField text={`Application #${application.id} — ${application.applicantName}`} size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="EVEN_LESS" />
                <RichTextDisplayField
                  value={[
                    <TextItem key="t" text={`${application.accountType}  |  `} color="SECONDARY" size="STANDARD" />,
                    <TextItem key="e" text={application.applicantEmail} color="SECONDARY" size="STANDARD" />,
                  ]}
                />
              </div>
              <div className="flex gap-3 items-center">
                <TagField
                  tags={[{
                    text: application.status,
                    backgroundColor:
                      application.status === 'Approved' ? '#D1FAE5' :
                      application.status === 'Compliance Review' ? '#FEE2E2' :
                      application.status === 'Documents Needed' ? '#FEF3C7' : '#DBEAFE',
                    textColor: 'STANDARD',
                  }]}
                />
                <ButtonWidget
                  label="View Documents"
                  style="OUTLINE"
                  onClick={() => setLocation(`/documents/${appId}`)}
                />
              </div>
            </div>
          </CardLayout>
        )}

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Interactions', value: notes.length, color: 'ACCENT' },
            { label: 'Phone Calls', value: phoneNotes.length, color: '#3B82F6' },
            { label: 'Emails', value: emailNotes.length, color: '#7C3AED' },
            { label: 'Internal Notes', value: internalNotes.length, color: 'SECONDARY' },
          ].map(s => (
            <CardLayout key={s.label} padding="STANDARD" showBorder={true} showShadow={true}>
              <HeadingField text={String(s.value)} size="LARGE" fontWeight="BOLD" color={s.color as string} align="CENTER" marginBelow="EVEN_LESS" />
              <RichTextDisplayField value={[<TextItem key="l" text={s.label} color="SECONDARY" size="SMALL" />]} align="CENTER" />
            </CardLayout>
          ))}
        </div>

        <CardLayout padding="MORE" showShadow={true}>
          <div className="flex justify-between items-center mb-4">
            <HeadingField text="Interaction Timeline" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="NONE" />
            <DialogField
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              title="Add Note or Log Interaction"
              description="Record a phone call, email, or internal note for this application."
              showCloseButton={true}
              closeOnOutsideClick={true}
              trigger={
                <ButtonWidget label="+ Add Note" style="SOLID" onClick={() => setDialogOpen(true)} />
              }
            >
              <div className="space-y-4 p-2">
                <DropdownField
                  label="Interaction Type"
                  choiceLabels={['Phone Call', 'Email', 'Internal Note']}
                  choiceValues={['Phone Call', 'Email', 'Internal Note']}
                  value={newType}
                  onChange={setNewType}
                />
                <TextField
                  label="Subject"
                  value={newSubject}
                  onChange={setNewSubject}
                  required={true}
                  placeholder="Brief summary..."
                />
                <TextField
                  label="Notes"
                  value={newBody}
                  onChange={setNewBody}
                  required={true}
                  placeholder="Detailed notes..."
                  characterLimit={1000}
                  showCharacterCount={true}
                />
                <SwitchField
                  label="Internal only (not visible to member)"
                  value={newIsInternal}
                  onChange={setNewIsInternal}
                  color="ACCENT"
                />
                <ButtonArrayLayout
                  align="END"
                  buttons={[
                    { label: 'Cancel', style: 'OUTLINE', onClick: () => setDialogOpen(false) },
                    { label: 'Save Note', style: 'SOLID', onClick: handleAddNote, disabled: !newSubject || !newBody },
                  ]}
                />
              </div>
            </DialogField>
          </div>

          <TabsField
            tabs={[
              { value: 'all', label: `All (${notes.length})`, content: null },
              { value: 'external', label: `Member-Facing (${externalNotes.length})`, content: null },
              { value: 'internal', label: `Internal (${internalNotes.length})`, content: null },
              { value: 'phone', label: `Phone (${phoneNotes.length})`, content: null },
              { value: 'email', label: `Email (${emailNotes.length})`, content: null },
            ]}
            value={activeTab}
            onValueChange={setActiveTab}
            marginBelow="STANDARD"
          />

          {filteredNotes.length === 0 && (
            <RichTextDisplayField
              value={[<TextItem key="e" text="No interactions in this category." color="SECONDARY" size="STANDARD" />]}
            />
          )}

          <div className="space-y-4">
            {[...filteredNotes].reverse().map(note => (
              <CardLayout
                key={note.id}
                padding="STANDARD"
                showBorder={true}
                style="TRANSPARENT"
                decorativeBarPosition="START"
                decorativeBarColor={note.isInternal ? '#9CA3AF' : note.type === 'Email' ? '#7C3AED' : '#3B82F6'}
              >
                <div className="flex flex-wrap gap-3 items-start justify-between">
                  <div className="flex-1">
                    <div className="flex gap-2 items-center mb-2 flex-wrap">
                      <TagField
                        tags={[{
                          text: note.type,
                          backgroundColor: TYPE_COLORS[note.type] ?? '#F3F4F6',
                          textColor: 'STANDARD',
                        }]}
                      />
                      <TagField
                        tags={[{
                          text: DIRECTION_LABELS[note.direction] ?? note.direction,
                          backgroundColor: note.isInternal ? '#F3F4F6' : '#EDE9FE',
                          textColor: 'SECONDARY',
                        }]}
                      />
                    </div>
                    <HeadingField text={note.subject} size="SMALL" fontWeight="SEMI_BOLD" marginBelow="EVEN_LESS" />
                    <RichTextDisplayField
                      value={[<TextItem key="b" text={note.body} color="SECONDARY" size="STANDARD" />]}
                      marginBelow="EVEN_LESS"
                    />
                  </div>
                  <div className="text-right">
                    <RichTextDisplayField
                      value={[<TextItem key="a" text={getDisplayName(note.author)} size="SMALL" style="STRONG" />]}
                      marginBelow="EVEN_LESS"
                    />
                    <RichTextDisplayField
                      value={[<TextItem key="d" text={formatDate(note.createdOn)} color="SECONDARY" size="SMALL" />]}
                    />
                  </div>
                </div>
              </CardLayout>
            ))}
          </div>
        </CardLayout>
      </div>
    </div>
  )
}
