import { HeadingField, MessageBanner, RichTextDisplayField, TextItem, CardLayout } from '@pglevy/sailwind'
import { useLocation } from 'wouter'

export default function Home() {
  const [, setLocation] = useLocation()

  const pages: { title: string; path: string; description: string; persona: string }[] = [
    {
      title: 'KPI Dashboard',
      path: '/kpi-dashboard',
      description: 'Real-time application processing metrics, bottleneck identification, and staff performance.',
      persona: 'Member Services Manager',
    },
    {
      title: 'Multi-step Application Wizard',
      path: '/application-wizard',
      description: 'Guided account application with progress tracking, document checklist, and identity verification.',
      persona: 'New Member (Carlos Martinez)',
    },
    {
      title: 'Work Queue',
      path: '/work-queue',
      description: 'Daily application queue with priorities, completion status, SLA tracking, and filters.',
      persona: 'Member Services Rep (Maria Chen)',
    },
    {
      title: 'Document Management',
      path: '/documents/1001',
      description: 'Review uploaded documents, OCR extraction results, and compliance flags for application #1001.',
      persona: 'Member Services Rep',
    },
    {
      title: 'Communication & Notes',
      path: '/notes/1001',
      description: 'Full interaction timeline — phone calls, emails, and internal notes for application #1001.',
      persona: 'Member Services Rep',
    },
  ]

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-8 px-4">
      <HeadingField text="Pacific Coast Credit Union" size="LARGE_PLUS" fontWeight="BOLD" align="CENTER" />
      <HeadingField text="Member Onboarding Case Management" size="MEDIUM_PLUS" fontWeight="REGULAR" align="CENTER" color="SECONDARY" marginBelow="STANDARD" />

      <MessageBanner
        primaryText="Prototype — 5 pages covering the full onboarding workflow from application to approval."
        backgroundColor="INFO"
        highlightColor="INFO"
        icon="info"
      />

      <div className="bg-white rounded-lg shadow-md p-6">
        <HeadingField text="Pages" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
        <div className="space-y-4">
          {pages.map((page, index) => (
            <CardLayout key={index} padding="STANDARD" showBorder={true} style="TRANSPARENT">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <RichTextDisplayField
                    value={[
                      <TextItem
                        key="title"
                        text={page.title}
                        color="ACCENT"
                        size="MEDIUM"
                        style="STRONG"
                        link={() => setLocation(page.path)}
                        linkStyle="STANDALONE"
                      />,
                    ]}
                    marginBelow="EVEN_LESS"
                  />
                  <RichTextDisplayField
                    value={[
                      <TextItem key="desc" text={page.description} color="SECONDARY" size="STANDARD" />,
                    ]}
                    marginBelow="EVEN_LESS"
                  />
                  <RichTextDisplayField
                    value={[
                      <TextItem key="persona" text={`Persona: ${page.persona}`} color="SECONDARY" size="SMALL" style="EMPHASIS" />,
                    ]}
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
