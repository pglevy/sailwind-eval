import { HeadingField, MessageBanner, RichTextDisplayField, TextItem } from '@pglevy/sailwind'
import { useLocation } from 'wouter'

export default function Home() {
  const [, setLocation] = useLocation()

  const pages: { title: string; path: string; description: string }[] = [
    {
      title: 'Insurance Quote',
      path: '/insurance-quote',
      description: 'Personalized auto insurance quote review page for InsureCorp',
    },
  ]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <HeadingField text="Sailwind Starter" size="LARGE_PLUS" fontWeight="BOLD" align="CENTER" />

      <MessageBanner
        primaryText="Welcome to Sailwind Starter! This template is ready for rapid prototyping with SAIL-style components."
        backgroundColor="INFO"
        highlightColor="INFO"
        icon="info"
      />

      <div className="bg-white rounded-lg shadow-md p-6">
        <HeadingField text="Pages" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
        <div className="space-y-3">
          {pages.map((page, index) => (
            <div key={index}>
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
                  <br key="br" />,
                  <TextItem
                    key="desc"
                    text={page.description}
                    color="SECONDARY"
                    size="STANDARD"
                  />
                ]}
                marginBelow="EVEN_LESS"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
