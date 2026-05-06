export interface Note {
  id: number
  applicationId: number
  type: string
  subject: string
  body: string
  author: string
  createdOn: string
  isInternal: boolean
  direction: string
}

const notes: Note[] = [
  { id: 1, applicationId: 1001, type: "Phone Call", subject: "Initial inquiry call", body: "Carlos called to ask about required documents for business account. Explained the need for business license, 3 months bank statements, and government ID. He confirmed he can upload everything by end of week.", author: "alice.chen", createdOn: "2026-05-01T09:15:00", isInternal: false, direction: "INBOUND" },
  { id: 2, applicationId: 1001, type: "Email", subject: "Document request sent", body: "Sent automated document checklist email to carlos.m@example.com. Included links to upload portal and list of required items: government ID, business license, proof of address, 3 months bank statements.", author: "alice.chen", createdOn: "2026-05-01T09:30:00", isInternal: false, direction: "OUTBOUND" },
  { id: 3, applicationId: 1001, type: "Internal Note", subject: "Bank statement flagged for review", body: "The Q1 bank statement shows a $45,000 wire transfer on March 3rd. Flagging for compliance review per BSA policy. Robert Kim to review before approval.", author: "alice.chen", createdOn: "2026-05-03T14:20:00", isInternal: true, direction: "INTERNAL" },
  { id: 4, applicationId: 1001, type: "Email", subject: "Additional information needed", body: "Dear Carlos, we need clarification on the wire transfer dated March 3rd for $45,000. Please provide a brief explanation of the transaction purpose. This is required for compliance review.", author: "alice.chen", createdOn: "2026-05-04T10:00:00", isInternal: false, direction: "OUTBOUND" },
  { id: 5, applicationId: 1001, type: "Email", subject: "Re: Additional information needed", body: "Hi, the wire transfer was payment to our main supplier, Pacific Plumbing Supply Co., for Q1 inventory. I can provide the invoice if needed. Thanks, Carlos", author: "alice.chen", createdOn: "2026-05-05T08:45:00", isInternal: false, direction: "INBOUND" },
  { id: 6, applicationId: 1001, type: "Internal Note", subject: "Compliance cleared - supplier payment confirmed", body: "Carlos provided explanation for wire transfer. Supplier invoice matches amount. BSA review complete - no suspicious activity. Cleared for approval.", author: "david.kim", createdOn: "2026-05-05T16:30:00", isInternal: true, direction: "INTERNAL" },
  { id: 7, applicationId: 1002, type: "Phone Call", subject: "Missing proof of address", body: "Called Sarah to follow up on missing proof of address document. She mentioned she recently moved and is waiting for her first utility bill. Agreed to accept a signed lease agreement instead.", author: "bob.martinez", createdOn: "2026-05-03T11:00:00", isInternal: false, direction: "OUTBOUND" },
  { id: 8, applicationId: 1002, type: "Internal Note", subject: "Accepting lease as address proof", body: "Per phone call with Sarah, we will accept a signed lease agreement as proof of address per policy exception for recent movers. Documenting for audit trail.", author: "bob.martinez", createdOn: "2026-05-03T11:15:00", isInternal: true, direction: "INTERNAL" },
  { id: 9, applicationId: 1004, type: "Internal Note", subject: "High risk score - escalating to compliance", body: "Application flagged with HIGH risk score due to suspicious transaction pattern in bank statements. Escalating to Robert Kim for BSA/AML review before any approval.", author: "alice.chen", createdOn: "2026-05-05T13:00:00", isInternal: true, direction: "INTERNAL" },
  { id: 10, applicationId: 1004, type: "Phone Call", subject: "Compliance review initiated", body: "Spoke with Linda Torres to inform her that her application is under compliance review and may take an additional 2-3 business days. She understood and provided her direct contact number.", author: "david.kim", createdOn: "2026-05-06T09:00:00", isInternal: false, direction: "OUTBOUND" },
]

export async function getNotes(): Promise<Note[]> {
  return notes
}

export async function getNotesByApplication(applicationId: number): Promise<Note[]> {
  return notes.filter(n => n.applicationId === applicationId)
}

export async function getNote(id: number): Promise<Note | undefined> {
  return notes.find(n => n.id === id)
}

export async function createNote(data: Omit<Note, 'id'>): Promise<Note> {
  const newNote = { ...data, id: Math.max(0, ...notes.map(n => n.id)) + 1 }
  notes.push(newNote)
  return newNote
}

export async function updateNote(id: number, data: Partial<Note>): Promise<Note | undefined> {
  const idx = notes.findIndex(n => n.id === id)
  if (idx === -1) return undefined
  notes[idx] = { ...notes[idx], ...data }
  return notes[idx]
}
