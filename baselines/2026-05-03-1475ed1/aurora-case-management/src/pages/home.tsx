import { HeadingField, MessageBanner, RichTextDisplayField, TextItem, CardLayout } from '@pglevy/sailwind'
import { useLocation } from 'wouter'

export default function Home() {
  const [, setLocation] = useLocation()

  const pages: { title: string; path: string; description: string; persona: string }[] = [
    {
      title: 'KPI Dashboard',
      path: '/kpi-dashboard',
      description: 'Real-time application processing metrics, bottleneck identification, and staff performance.',
      persona: 'Manager',
    },
    {
      title: 'Application Wizard',
      path: '/application-wizard',
      description: 'Multi-step guided account application with progress tracking for new members.',
      persona: 'New Member',
    },
    {
      title: 'Work Queue',
      path: '/work-queue',
      description: 'Daily work queue with application priorities, completion status, and SLA tracking.',
      persona: 'Member Services Rep',
    },
    {
      title: 'Document Management',
      path: '/document-management/1001',
      description: 'Review uploaded documents, OCR results, and compliance flags for an application.',
      persona: 'Member Services Rep',
    },
    {
      title: 'Communications & Notes',
      path: '/communications/1001',
      description: 'Full communication timeline — emails, phone notes, and internal comments per application.',
      persona: 'Member Services Rep',
    },
  ]

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 py-8">
      <HeadingField text="Pacific Coast Credit Union" size="LARGE_PLUS" fontWeight="BOLD" align="CENTER" />
      <HeadingField text="Member Onboarding — Case Management Prototype" size="MEDIUM" align="CENTER" marginBelow="NONE" />

      <MessageBanner
        primaryText="This prototype covers the full member onboarding workflow: from new member application through staff review, document verification, and compliance screening."
        backgroundColor="INFO"
        highlightColor="INFO"
        icon="info"
      />

      <div className="space-y-3">
        {pages.map((page, index) => (
          <CardLayout key={index} padding="STANDARD" showShadow={true}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <RichTextDisplayField
                  value={[
                    <TextItem
                      key="title"
                      text={page.title}
                      color="ACCENT"
                      size="MEDIUM"
                      link={() => setLocation(page.path)}
                      linkStyle="STANDALONE"
                    />,
                  ]}
                  marginBelow="EVEN_LESS"
                />
                <RichTextDisplayField
                  value={[
                    <TextItem
                      key="desc"
                      text={page.description}
                      color="SECONDARY"
                      size="STANDARD"
                    />
                  ]}
                  marginBelow="NONE"
                />
              </div>
              <div className="shrink-0">
                <div className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded">
                  {page.persona}
                </div>
              </div>
            </div>
          </CardLayout>
        ))}
      </div>
    </div>
  )
}
