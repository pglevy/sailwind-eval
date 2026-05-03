import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'wouter'
import {
  HeadingField,
  CardLayout,
  RichTextDisplayField,
  TextItem,
  TagField,
  ButtonArrayLayout,
  MessageBanner,
  ProgressBar,
  CollapsibleSection,
} from '@pglevy/sailwind'
import { FileText, CheckCircle, AlertCircle, Clock, Upload, ArrowLeft } from 'lucide-react'
import { getDocumentsByApplication, type Document } from '../db/documents'
import { getApplication, type Application } from '../db/applications'

const DOC_STATUS_COLORS: Record<string, string> = {
  VERIFIED: 'POSITIVE',
  PENDING_REVIEW: 'ACCENT',
  MISSING: 'NEGATIVE',
  REJECTED: 'NEGATIVE',
}

const DOC_STATUS_LABELS: Record<string, string> = {
  VERIFIED: 'Verified',
  PENDING_REVIEW: 'Pending Review',
  MISSING: 'Missing',
  REJECTED: 'Rejected',
}

const DOC_TYPE_LABELS: Record<string, string> = {
  IDENTITY: 'Identity',
  ADDRESS: 'Proof of Address',
  BUSINESS: 'Business',
  FINANCIAL: 'Financial',
}

const COMPLIANCE_FLAG_COLORS: Record<string, string> = {
  NONE: 'POSITIVE',
  REVIEW_REQUIRED: 'SECONDARY',
  COMPLIANCE_HOLD: 'NEGATIVE',
}

export default function DocumentManagement() {
  const params = useParams<{ id: string }>()
  const [, setLocation] = useLocation()
  const appId = params.id ? parseInt(params.id) : 1001

  const [application, setApplication] = useState<Application | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])

  useEffect(() => {
    getApplication(appId).then(a => setApplication(a ?? null))
    getDocumentsByApplication(appId).then(setDocuments)
  }, [appId])

  const verified = documents.filter(d => d.status === 'VERIFIED').length
  const pending = documents.filter(d => d.status === 'PENDING_REVIEW').length
  const missing = documents.filter(d => d.status === 'MISSING').length
  const flagged = documents.filter(d => d.complianceFlag !== 'NONE').length
  const completionPct = documents.length > 0 ? Math.round((verified / documents.length) * 100) : 0

  const docsByType = documents.reduce<Record<string, Document[]>>((acc, doc) => {
    const key = doc.type
    if (!acc[key]) acc[key] = []
    acc[key].push(doc)
    return acc
  }, {})

  const statusIcon = (status: string) => {
    if (status === 'VERIFIED') return <CheckCircle className="text-green-500 shrink-0" size={18} />
    if (status === 'MISSING') return <AlertCircle className="text-red-500 shrink-0" size={18} />
    return <Clock className="text-blue-500 shrink-0" size={18} />
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
            <HeadingField text={`Document Review — ${application.memberName}`} size="LARGE" headingTag="H1" marginBelow="EVEN_LESS" />
            <div className="flex gap-3 flex-wrap">
              <RichTextDisplayField value={[<TextItem key="id" text={`Application #${application.id}`} size="STANDARD" color="SECONDARY" />]} marginBelow="NONE" />
              <RichTextDisplayField value={[<TextItem key="t" text={application.accountType} size="STANDARD" color="SECONDARY" />]} marginBelow="NONE" />
              <TagField
                tags={[{ text: application.status.replace('_', ' '), backgroundColor: application.status === 'APPROVED' ? 'POSITIVE' : application.status === 'COMPLIANCE_HOLD' ? 'NEGATIVE' : 'ACCENT' }]}
                size="SMALL"
                marginBelow="NONE"
              />
            </div>
          </div>
          <ButtonArrayLayout
            buttons={[
              { label: 'Request Documents', style: 'OUTLINE', color: 'SECONDARY' },
              { label: 'Approve Application', style: 'SOLID', color: 'POSITIVE', disabled: missing > 0 || flagged > 0 },
            ]}
            align="END"
          />
        </div>

        {/* Compliance flag banner */}
        {flagged > 0 && (
          <div className="mb-4">
            <MessageBanner
              primaryText={`${flagged} document${flagged > 1 ? 's' : ''} flagged for compliance review. Application cannot be approved until resolved.`}
              backgroundColor="ERROR"
              highlightColor="ERROR"
              icon="error"
            />
          </div>
        )}

        {missing > 0 && (
          <div className="mb-4">
            <MessageBanner
              primaryText={`${missing} required document${missing > 1 ? 's are' : ' is'} missing. Member has been notified.`}
              backgroundColor="WARNING"
              highlightColor="WARNING"
              icon="warning"
            />
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <CardLayout padding="STANDARD" showShadow={true}>
            <HeadingField text={String(documents.length)} size="LARGE" fontWeight="BOLD" marginBelow="EVEN_LESS" />
            <RichTextDisplayField value={[<TextItem key="l" text="Total Documents" size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true}>
            <HeadingField text={String(verified)} size="LARGE" fontWeight="BOLD" marginBelow="EVEN_LESS" />
            <RichTextDisplayField value={[<TextItem key="l" text="Verified" size="SMALL" color="POSITIVE" />]} marginBelow="NONE" />
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true}>
            <HeadingField text={String(pending)} size="LARGE" fontWeight="BOLD" marginBelow="EVEN_LESS" />
            <RichTextDisplayField value={[<TextItem key="l" text="Pending Review" size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
          </CardLayout>
          <CardLayout padding="STANDARD" showShadow={true}>
            <HeadingField text={String(missing)} size="LARGE" fontWeight="BOLD" marginBelow="EVEN_LESS" />
            <RichTextDisplayField value={[<TextItem key="l" text="Missing" size="SMALL" color="NEGATIVE" />]} marginBelow="NONE" />
          </CardLayout>
        </div>

        {/* Completion Progress */}
        <CardLayout padding="STANDARD" showShadow={false}>
          <div className="flex items-center justify-between mb-2">
            <RichTextDisplayField value={[<TextItem key="t" text="Document Completeness" size="STANDARD" style="STRONG" />]} marginBelow="NONE" />
            <RichTextDisplayField value={[<TextItem key="p" text={`${completionPct}%`} size="STANDARD" color={completionPct === 100 ? 'POSITIVE' : 'ACCENT'} />]} marginBelow="NONE" />
          </div>
          <ProgressBar percentage={completionPct} color={completionPct === 100 ? 'POSITIVE' : 'ACCENT'} marginBelow="NONE" />
        </CardLayout>

        {/* Documents by Type */}
        <div className="mt-6 space-y-4">
          {Object.entries(docsByType).map(([type, docs]) => (
            <CollapsibleSection
              key={type}
              title={`${DOC_TYPE_LABELS[type] ?? type} (${docs.length})`}
              defaultOpen={true}
            >
              <div className="space-y-3 pt-2">
                {docs.map(doc => (
                  <CardLayout key={doc.id} padding="STANDARD" showShadow={false}>
                    <div className="flex items-start gap-3">
                      {statusIcon(doc.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <RichTextDisplayField value={[<TextItem key="n" text={doc.name} size="STANDARD" style="STRONG" />]} marginBelow="NONE" />
                          <TagField
                            tags={[{ text: DOC_STATUS_LABELS[doc.status] ?? doc.status, backgroundColor: DOC_STATUS_COLORS[doc.status] ?? 'SECONDARY' }]}
                            size="SMALL"
                            marginBelow="NONE"
                          />
                          {doc.complianceFlag !== 'NONE' && (
                            <TagField
                              tags={[{ text: doc.complianceFlag.replace('_', ' '), backgroundColor: COMPLIANCE_FLAG_COLORS[doc.complianceFlag] ?? 'SECONDARY' }]}
                              size="SMALL"
                              marginBelow="NONE"
                            />
                          )}
                          {doc.ocrExtracted && (
                            <TagField tags={[{ text: 'OCR Extracted', backgroundColor: 'ACCENT' }]} size="SMALL" marginBelow="NONE" />
                          )}
                        </div>
                        {doc.notes && (
                          <RichTextDisplayField value={[<TextItem key="note" text={doc.notes} size="SMALL" color="SECONDARY" />]} marginBelow="EVEN_LESS" />
                        )}
                        {doc.uploadedOn && (
                          <div className="flex gap-4">
                            <RichTextDisplayField value={[<TextItem key="u" text={`Uploaded ${doc.uploadedOn}`} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                            <RichTextDisplayField value={[<TextItem key="s" text={doc.fileSize} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                          </div>
                        )}
                      </div>
                      <div className="shrink-0">
                        {doc.status === 'MISSING' ? (
                          <ButtonArrayLayout
                            buttons={[{ label: 'Request', style: 'OUTLINE', color: 'SECONDARY' }]}
                            align="END"
                          />
                        ) : (
                          <ButtonArrayLayout
                            buttons={[
                              { label: 'View', style: 'OUTLINE', color: 'SECONDARY' },
                              ...(doc.status === 'PENDING_REVIEW' ? [{ label: 'Verify', style: 'SOLID' as const, color: 'POSITIVE' as const }] : []),
                            ]}
                            align="END"
                          />
                        )}
                      </div>
                    </div>
                  </CardLayout>
                ))}
              </div>
            </CollapsibleSection>
          ))}
        </div>

        {/* Upload New Document */}
        <div className="mt-6">
          <CardLayout padding="MORE" showShadow={false}>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="text-gray-400 mx-auto mb-3" size={32} />
              <RichTextDisplayField value={[<TextItem key="t" text="Upload Additional Document" size="STANDARD" style="STRONG" />]} marginBelow="EVEN_LESS" />
              <RichTextDisplayField value={[<TextItem key="s" text="PDF, JPG, PNG — max 10MB" size="SMALL" color="SECONDARY" />]} marginBelow="STANDARD" />
              <div className="flex justify-center">
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                  <FileText className="text-gray-500" size={16} />
                  <span className="text-sm text-gray-600">Choose File</span>
                </div>
              </div>
            </div>
          </CardLayout>
        </div>
      </div>
    </div>
  )
}
