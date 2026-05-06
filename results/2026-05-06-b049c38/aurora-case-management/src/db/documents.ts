export interface Document {
  id: number
  applicationId: number
  documentType: string
  fileName: string
  status: string
  uploadedBy: string
  uploadedOn: string
  ocrExtracted: boolean
  ocrSummary: string
  complianceFlag: string
  fileSize: string
}

const documents: Document[] = [
  { id: 1, applicationId: 1001, documentType: "Government-Issued ID", fileName: "carlos_drivers_license.pdf", status: "Verified", uploadedBy: "carlos.m", uploadedOn: "2026-05-01", ocrExtracted: true, ocrSummary: "Name: Carlos Martinez, DOB: 1982-03-15, Exp: 2028-03-15", complianceFlag: "NONE", fileSize: "1.2 MB" },
  { id: 2, applicationId: 1001, documentType: "Business License", fileName: "martinez_plumbing_license.pdf", status: "Verified", uploadedBy: "carlos.m", uploadedOn: "2026-05-01", ocrExtracted: true, ocrSummary: "License #: CA-BL-2024-88421, Issued: 2024-01-10, Entity: Martinez Plumbing LLC", complianceFlag: "NONE", fileSize: "0.8 MB" },
  { id: 3, applicationId: 1001, documentType: "Proof of Address", fileName: "utility_bill_april.pdf", status: "Pending Review", uploadedBy: "carlos.m", uploadedOn: "2026-05-02", ocrExtracted: true, ocrSummary: "Address: 4521 Oak St, San Jose CA 95112, Date: April 2026", complianceFlag: "NONE", fileSize: "0.5 MB" },
  { id: 4, applicationId: 1001, documentType: "Bank Statement", fileName: "chase_statement_q1.pdf", status: "Flagged", uploadedBy: "carlos.m", uploadedOn: "2026-05-03", ocrExtracted: true, ocrSummary: "Account ending 4421, Avg balance: $12,400, Period: Jan-Mar 2026", complianceFlag: "LARGE_TRANSACTION", fileSize: "2.1 MB" },
  { id: 5, applicationId: 1002, documentType: "Government-Issued ID", fileName: "sarah_passport.pdf", status: "Verified", uploadedBy: "sarah.j", uploadedOn: "2026-05-02", ocrExtracted: true, ocrSummary: "Name: Sarah Johnson, DOB: 1990-07-22, Exp: 2030-07-22", complianceFlag: "NONE", fileSize: "1.5 MB" },
  { id: 6, applicationId: 1002, documentType: "Proof of Address", fileName: "lease_agreement.pdf", status: "Missing", uploadedBy: "", uploadedOn: "", ocrExtracted: false, ocrSummary: "", complianceFlag: "NONE", fileSize: "" },
  { id: 7, applicationId: 1004, documentType: "Government-Issued ID", fileName: "linda_id.pdf", status: "Verified", uploadedBy: "linda.t", uploadedOn: "2026-05-03", ocrExtracted: true, ocrSummary: "Name: Linda Torres, DOB: 1975-11-08, Exp: 2027-11-08", complianceFlag: "NONE", fileSize: "1.1 MB" },
  { id: 8, applicationId: 1004, documentType: "Business License", fileName: "torres_bakery_license.pdf", status: "Pending Review", uploadedBy: "linda.t", uploadedOn: "2026-05-03", ocrExtracted: false, ocrSummary: "", complianceFlag: "NONE", fileSize: "0.9 MB" },
  { id: 9, applicationId: 1004, documentType: "Bank Statement", fileName: "wells_fargo_stmt.pdf", status: "Flagged", uploadedBy: "linda.t", uploadedOn: "2026-05-04", ocrExtracted: true, ocrSummary: "Account ending 7732, Avg balance: $3,200, Period: Feb-Apr 2026", complianceFlag: "SUSPICIOUS_PATTERN", fileSize: "1.8 MB" },
  { id: 10, applicationId: 1007, documentType: "Government-Issued ID", fileName: "robert_license.pdf", status: "Verified", uploadedBy: "robert.w", uploadedOn: "2026-05-04", ocrExtracted: true, ocrSummary: "Name: Robert Wilson, DOB: 1968-05-30, Exp: 2026-05-30", complianceFlag: "EXPIRING_SOON", fileSize: "1.0 MB" },
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
