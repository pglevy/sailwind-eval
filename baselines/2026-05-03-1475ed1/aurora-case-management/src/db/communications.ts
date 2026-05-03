export interface Communication {
  id: number
  applicationId: number
  type: string
  direction: string
  subject: string
  body: string
  author: string
  createdOn: string
  isInternal: boolean
  attachments: string[]
}

const communications: Communication[] = [
  {
    id: 1,
    applicationId: 1001,
    type: 'EMAIL',
    direction: 'OUTBOUND',
    subject: 'Your Pacific Coast CU Application — Documents Needed',
    body: 'Dear Carlos, thank you for applying for a Business Advantage account. To complete your application, please upload your most recent 3 months of bank statements and your current business license. You can upload these securely through your member portal.',
    author: 'alice.chen',
    createdOn: '2026-04-29T09:15:00',
    isInternal: false,
    attachments: [],
  },
  {
    id: 2,
    applicationId: 1001,
    type: 'PHONE',
    direction: 'INBOUND',
    subject: 'Member called re: document upload',
    body: 'Carlos called to confirm which bank statements are needed. Clarified that we need the last 3 months from his primary business account. He will upload by end of day.',
    author: 'alice.chen',
    createdOn: '2026-04-29T14:32:00',
    isInternal: false,
    attachments: [],
  },
  {
    id: 3,
    applicationId: 1001,
    type: 'NOTE',
    direction: 'INTERNAL',
    subject: 'BSA flag on bank statements',
    body: 'Reviewed uploaded bank statements. Multiple cash deposits over $9,000 in the past 90 days. Flagging for Robert Kim (compliance) to review before approval. Not necessarily suspicious — member is a restaurant owner — but requires documentation.',
    author: 'alice.chen',
    createdOn: '2026-05-01T10:45:00',
    isInternal: true,
    attachments: [],
  },
  {
    id: 4,
    applicationId: 1001,
    type: 'NOTE',
    direction: 'INTERNAL',
    subject: 'Compliance review initiated',
    body: 'Reviewed BSA flag. Cash-intensive business (restaurant) — consistent with industry norms. Requesting member to complete a cash transaction questionnaire. Will clear hold once received.',
    author: 'david.kim',
    createdOn: '2026-05-02T08:20:00',
    isInternal: true,
    attachments: [],
  },
  {
    id: 5,
    applicationId: 1001,
    type: 'EMAIL',
    direction: 'OUTBOUND',
    subject: 'Additional Information Required — Cash Transaction Questionnaire',
    body: 'Dear Carlos, as part of our standard compliance review for business accounts, we need you to complete a brief cash transaction questionnaire. This is a routine step for cash-intensive businesses. Please complete the attached form and return it at your earliest convenience.',
    author: 'david.kim',
    createdOn: '2026-05-02T08:30:00',
    isInternal: false,
    attachments: ['Cash Transaction Questionnaire.pdf'],
  },
  {
    id: 6,
    applicationId: 1002,
    type: 'EMAIL',
    direction: 'OUTBOUND',
    subject: 'Missing Document — Proof of Address',
    body: 'Dear Sandra, we noticed your application is missing a proof of address document. Please upload a recent utility bill, bank statement, or government mail showing your current address. Your application cannot proceed until this is received.',
    author: 'alice.chen',
    createdOn: '2026-05-01T11:00:00',
    isInternal: false,
    attachments: [],
  },
  {
    id: 7,
    applicationId: 1003,
    type: 'NOTE',
    direction: 'INTERNAL',
    subject: 'Business name mismatch — escalated',
    body: 'Business license shows "Okafor Trading LLC" but application lists "Okafor & Associates LLC". Escalated to compliance for verification. Member has been notified.',
    author: 'carol.white',
    createdOn: '2026-04-28T15:10:00',
    isInternal: true,
    attachments: [],
  },
  {
    id: 8,
    applicationId: 1003,
    type: 'EMAIL',
    direction: 'OUTBOUND',
    subject: 'Business Name Clarification Needed',
    body: 'Dear James, we noticed a discrepancy between the business name on your application and your business license. Please provide documentation confirming the legal business name, such as a DBA filing or articles of incorporation.',
    author: 'david.kim',
    createdOn: '2026-04-29T09:00:00',
    isInternal: false,
    attachments: [],
  },
]

export async function getCommunications(): Promise<Communication[]> {
  return communications
}

export async function getCommunicationsByApplication(applicationId: number): Promise<Communication[]> {
  return communications
    .filter(c => c.applicationId === applicationId)
    .sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
}

export async function getCommunication(id: number): Promise<Communication | undefined> {
  return communications.find(c => c.id === id)
}

export async function createCommunication(data: Omit<Communication, 'id'>): Promise<Communication> {
  const newComm = { ...data, id: Math.max(0, ...communications.map(c => c.id)) + 1 }
  communications.push(newComm)
  return newComm
}
