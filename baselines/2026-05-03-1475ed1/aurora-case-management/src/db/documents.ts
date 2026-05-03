export interface Document {
  id: number
  applicationId: number
  name: string
  type: string
  status: string
  uploadedBy: string
  uploadedOn: string
  fileSize: string
  ocrExtracted: boolean
  complianceFlag: string
  notes: string
}

const documents: Document[] = [
  {
    id: 1,
    applicationId: 1001,
    name: 'Government-Issued ID',
    type: 'IDENTITY',
    status: 'VERIFIED',
    uploadedBy: 'carlos.martinez',
    uploadedOn: '2026-04-28',
    fileSize: '2.4 MB',
    ocrExtracted: true,
    complianceFlag: 'NONE',
    notes: 'CA Driver License, expires 2029',
  },
  {
    id: 2,
    applicationId: 1001,
    name: 'Proof of Address',
    type: 'ADDRESS',
    status: 'VERIFIED',
    uploadedBy: 'carlos.martinez',
    uploadedOn: '2026-04-28',
    fileSize: '1.1 MB',
    ocrExtracted: true,
    complianceFlag: 'NONE',
    notes: 'Utility bill dated March 2026',
  },
  {
    id: 3,
    applicationId: 1001,
    name: 'Business License',
    type: 'BUSINESS',
    status: 'PENDING_REVIEW',
    uploadedBy: 'carlos.martinez',
    uploadedOn: '2026-04-29',
    fileSize: '3.2 MB',
    ocrExtracted: false,
    complianceFlag: 'NONE',
    notes: 'City of San Francisco business license',
  },
  {
    id: 4,
    applicationId: 1001,
    name: 'Bank Statements (3 months)',
    type: 'FINANCIAL',
    status: 'PENDING_REVIEW',
    uploadedBy: 'carlos.martinez',
    uploadedOn: '2026-04-30',
    fileSize: '5.8 MB',
    ocrExtracted: true,
    complianceFlag: 'REVIEW_REQUIRED',
    notes: 'Large cash deposits flagged for BSA review',
  },
  {
    id: 5,
    applicationId: 1002,
    name: 'Government-Issued ID',
    type: 'IDENTITY',
    status: 'VERIFIED',
    uploadedBy: 'sandra.lee',
    uploadedOn: '2026-04-29',
    fileSize: '1.8 MB',
    ocrExtracted: true,
    complianceFlag: 'NONE',
    notes: 'CA Driver License',
  },
  {
    id: 6,
    applicationId: 1002,
    name: 'Proof of Address',
    type: 'ADDRESS',
    status: 'MISSING',
    uploadedBy: '',
    uploadedOn: '',
    fileSize: '',
    ocrExtracted: false,
    complianceFlag: 'NONE',
    notes: 'Requested via email on 2026-05-01',
  },
  {
    id: 7,
    applicationId: 1003,
    name: 'Government-Issued ID',
    type: 'IDENTITY',
    status: 'VERIFIED',
    uploadedBy: 'james.okafor',
    uploadedOn: '2026-04-27',
    fileSize: '2.1 MB',
    ocrExtracted: true,
    complianceFlag: 'NONE',
    notes: 'Passport',
  },
  {
    id: 8,
    applicationId: 1003,
    name: 'Business License',
    type: 'BUSINESS',
    status: 'VERIFIED',
    uploadedBy: 'james.okafor',
    uploadedOn: '2026-04-27',
    fileSize: '2.9 MB',
    ocrExtracted: true,
    complianceFlag: 'COMPLIANCE_HOLD',
    notes: 'Business name mismatch — escalated to compliance',
  },
]

export async function getDocuments(): Promise<Document[]> {
  return documents
}

export async function getDocumentsByApplication(applicationId: number): Promise<Document[]> {
  return documents.filter(d => d.applicationId === applicationId)
}

export async function getDocument(id: number): Promise<Document | undefined> {
  return documents.find(d => d.id === id)
}

export async function createDocument(data: Omit<Document, 'id'>): Promise<Document> {
  const newDoc = { ...data, id: Math.max(0, ...documents.map(d => d.id)) + 1 }
  documents.push(newDoc)
  return newDoc
}

export async function updateDocument(id: number, data: Partial<Document>): Promise<Document | undefined> {
  const idx = documents.findIndex(d => d.id === id)
  if (idx === -1) return undefined
  documents[idx] = { ...documents[idx], ...data }
  return documents[idx]
}
