import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'wouter'
import {
  HeadingField,
  CardLayout,
  RichTextDisplayField,
  TextItem,
  ReadOnlyGrid,
  GridColumn,
  TagField,
  ButtonWidget,
  ButtonArrayLayout,
  MessageBanner,
  TabsField,
  Icon,
} from '@pglevy/sailwind'
import { getApplication, type Application } from '../db/applications'
import { getDocumentsByApplication, type Document } from '../db/documents'

const STATUS_COLORS: Record<string, string> = {
  Verified: '#D1FAE5',
  'Pending Review': '#DBEAFE',
  Flagged: '#FEE2E2',
  Missing: '#F3F4F6',
}

const FLAG_LABELS: Record<string, string> = {
  NONE: 'Clear',
  LARGE_TRANSACTION: 'Large Transaction',
  SUSPICIOUS_PATTERN: 'Suspicious Pattern',
  EXPIRING_SOON: 'Expiring Soon',
}

export default function DocumentManagement() {
  const params = useParams<{ id: string }>()
  const appId = params.id ? parseInt(params.id) : 1001
  const [, setLocation] = useLocation()

  const [application, setApplication] = useState<Application | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    getApplication(appId).then(app => setApplication(app ?? null))
    getDocumentsByApplication(appId).then(setDocuments)
  }, [appId])

  const flaggedDocs = documents.filter(d => d.complianceFlag !== 'NONE')
  const missingDocs = documents.filter(d => d.status === 'Missing')
  const verifiedDocs = documents.filter(d => d.status === 'Verified')

  const filteredDocs = activeTab === 'flagged' ? flaggedDocs
    : activeTab === 'missing' ? missingDocs
    : activeTab === 'verified' ? verifiedDocs
    : documents

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-8 py-8">
        {/* Back nav */}
        <div className="mb-4">
          <ButtonWidget label="← Back to Work Queue" style="GHOST" onClick={() => setLocation('/work-queue')} />
        </div>

        <HeadingField text="Document Management" size="LARGE" headingTag="H1" fontWeight="BOLD" marginBelow="STANDARD" />

        {application && (
          <CardLayout padding="MORE" showShadow={true} marginBelow="MORE">
            <div className="flex flex-wrap gap-6 items-start">
              <div className="flex-1">
                <HeadingField text={`Application #${application.id} — ${application.applicantName}`} size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="EVEN_LESS" />
                <RichTextDisplayField
                  value={[
                    <TextItem key="t" text={`${application.accountType}  |  `} color="SECONDARY" size="STANDARD" />,
                    <TextItem key="e" text={application.applicantEmail} color="SECONDARY" size="STANDARD" />,
                  ]}
                  marginBelow="STANDARD"
                />
                <div className="flex gap-2 flex-wrap items-center">
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
                  <TagField
                    tags={[{
                      text: `Risk: ${application.riskScore}`,
                      backgroundColor: application.riskScore === 'HIGH' ? '#FEE2E2' : application.riskScore === 'MEDIUM' ? '#FEF3C7' : '#D1FAE5',
                      textColor: application.riskScore === 'HIGH' ? 'NEGATIVE' : application.riskScore === 'MEDIUM' ? '#D97706' : 'POSITIVE',
                    }]}
                  />
                </div>
              </div>
              <ButtonArrayLayout
                align="END"
                buttons={[
                  { label: 'Request Documents', style: 'OUTLINE', icon: 'mail' },
                  { label: 'Approve Application', style: 'SOLID', color: 'POSITIVE', icon: 'check' },
                ]}
              />
            </div>
          </CardLayout>
        )}

        {flaggedDocs.length > 0 && (
          <MessageBanner
            primaryText={`${flaggedDocs.length} document(s) have compliance flags requiring review.`}
            backgroundColor="ERROR"
            highlightColor="NEGATIVE"
            icon="error"
            marginBelow="MORE"
          />
        )}

        {missingDocs.length > 0 && (
          <MessageBanner
            primaryText={`${missingDocs.length} required document(s) have not been uploaded yet.`}
            backgroundColor="WARN"
            highlightColor="WARN"
            icon="warning"
            marginBelow="MORE"
          />
        )}

        {/* Summary stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total', value: documents.length, color: 'ACCENT' },
            { label: 'Verified', value: verifiedDocs.length, color: 'POSITIVE' },
            { label: 'Flagged', value: flaggedDocs.length, color: 'NEGATIVE' },
            { label: 'Missing', value: missingDocs.length, color: 'SECONDARY' },
          ].map(s => (
            <CardLayout key={s.label} padding="STANDARD" showBorder={true} showShadow={true}>
              <HeadingField text={String(s.value)} size="LARGE" fontWeight="BOLD" color={s.color as string} align="CENTER" marginBelow="EVEN_LESS" />
              <RichTextDisplayField value={[<TextItem key="l" text={s.label} color="SECONDARY" size="SMALL" />]} align="CENTER" />
            </CardLayout>
          ))}
        </div>

        <CardLayout padding="MORE" showShadow={true}>
          <TabsField
            tabs={[
              { value: 'all', label: `All (${documents.length})`, content: null },
              { value: 'verified', label: `Verified (${verifiedDocs.length})`, content: null },
              { value: 'flagged', label: `Flagged (${flaggedDocs.length})`, content: null },
              { value: 'missing', label: `Missing (${missingDocs.length})`, content: null },
            ]}
            value={activeTab}
            onValueChange={setActiveTab}
            marginBelow="STANDARD"
          />

          <ReadOnlyGrid
            data={filteredDocs}
            emptyGridMessage="No documents in this category."
            shadeAlternateRows={true}
          >
            <GridColumn label="Document Type" value="documentType" width="MEDIUM_PLUS" />
            <GridColumn label="File Name" value="fileName" width="WIDE" />
            <GridColumn
              label="Status"
              value={(row: Document) => (
                <TagField
                  tags={[{
                    text: row.status,
                    backgroundColor: STATUS_COLORS[row.status] ?? '#F3F4F6',
                    textColor: 'STANDARD',
                  }]}
                />
              )}
              width="MEDIUM"
            />
            <GridColumn
              label="Compliance"
              value={(row: Document) => (
                row.complianceFlag === 'NONE'
                  ? <Icon icon="check-circle" color="POSITIVE" size="STANDARD" />
                  : <TagField
                      tags={[{
                        text: FLAG_LABELS[row.complianceFlag] ?? row.complianceFlag,
                        backgroundColor: '#FEE2E2',
                        textColor: 'NEGATIVE',
                      }]}
                    />
              )}
              width="MEDIUM_PLUS"
            />
            <GridColumn label="Uploaded" value="uploadedOn" width="NARROW_PLUS" />
            <GridColumn label="Size" value="fileSize" width="NARROW" />
            <GridColumn
              label="OCR"
              value={(row: Document) => (
                row.ocrExtracted
                  ? <Icon icon="check-circle" color="POSITIVE" size="STANDARD" caption={row.ocrSummary} />
                  : <Icon icon="circle" color="SECONDARY" size="STANDARD" />
              )}
              width="ICON_PLUS"
              align="CENTER"
            />
            <GridColumn
              label="Actions"
              value={(row: Document) => (
                <ButtonWidget
                  label="Review"
                  style="OUTLINE"
                  size="SMALL"
                  disabled={row.status === 'Missing'}
                />
              )}
              width="NARROW"
            />
          </ReadOnlyGrid>
        </CardLayout>

        {/* OCR Details for flagged docs */}
        {flaggedDocs.length > 0 && (
          <CardLayout padding="MORE" showShadow={true} marginAbove="MORE">
            <HeadingField text="Compliance Flag Details" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
            <div className="space-y-4">
              {flaggedDocs.map(doc => (
                <CardLayout key={doc.id} padding="STANDARD" showBorder={true} style="TRANSPARENT" decorativeBarPosition="START" decorativeBarColor="NEGATIVE">
                  <HeadingField text={doc.documentType} size="SMALL" fontWeight="SEMI_BOLD" marginBelow="EVEN_LESS" />
                  <RichTextDisplayField
                    value={[
                      <TextItem key="flag" text={`Flag: ${FLAG_LABELS[doc.complianceFlag]}`} color="NEGATIVE" style="STRONG" size="STANDARD" />,
                    ]}
                    marginBelow="EVEN_LESS"
                  />
                  {doc.ocrSummary && (
                    <RichTextDisplayField
                      value={[<TextItem key="ocr" text={`OCR: ${doc.ocrSummary}`} color="SECONDARY" size="STANDARD" />]}
                    />
                  )}
                </CardLayout>
              ))}
            </div>
          </CardLayout>
        )}
      </div>
    </div>
  )
}
