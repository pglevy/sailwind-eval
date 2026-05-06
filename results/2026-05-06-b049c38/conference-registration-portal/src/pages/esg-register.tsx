import { useState } from 'react'
import {
  HeadingField,
  RichTextDisplayField,
  TextItem,
  TextField,
  DropdownField,
  CheckboxField,
  ButtonWidget,
  CardLayout,
  ImageField,
} from '@pglevy/sailwind'

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Argentina',
  'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
  'Bangladesh', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia',
  'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei Darussalam',
  'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada',
  'Chile', 'China', 'Colombia', 'Congo', 'Costa Rica', 'Croatia', 'Cuba',
  'Cyprus', 'Czech Republic', 'Denmark', 'Dominican Republic', 'Ecuador',
  'Egypt', 'El Salvador', 'Estonia', 'Ethiopia', 'Finland', 'France',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Honduras',
  'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
  'Kenya', 'Kuwait', 'Kyrgyzstan', 'Latvia', 'Lebanon', 'Libya',
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malaysia', 'Maldives', 'Mali',
  'Malta', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
  'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand',
  'Nicaragua', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Paraguay',
  'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia',
  'Rwanda', 'Saudi Arabia', 'Senegal', 'Serbia', 'Singapore', 'Slovakia',
  'Slovenia', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan',
  'Sweden', 'Switzerland', 'Syria', 'Taiwan (ROC)', 'Tanzania', 'Thailand',
  'Tunisia', 'Turkey', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela',
  'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
]

const LANGUAGES = [
  'ENGLISH', '简体中文', 'हिन्दी', 'ESPAÑOL', 'FRANÇAIS', 'العربية', 'DEUTSCHE', '日本語',
]

const INTERESTS = [
  'Climate change and carbon emissions',
  'Biodiversity',
  'Energy efficiency',
  'Community relations',
  'Data protection and privacy',
  'Air and water pollution',
  'Deforestation',
  'Water scarcity',
  'Gender and diversity',
  'Labor standards',
]

export default function EsgRegister() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState<string | null>(null)
  const [orgName, setOrgName] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [activeLanguage, setActiveLanguage] = useState('ENGLISH')

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f3ec' }}>
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex gap-12">

          {/* Left sidebar */}
          <div className="w-56 flex-shrink-0">
            {/* Logo area */}
            <div className="mb-6">
              <ImageField
                labelPosition="COLLAPSED"
                images={[{ document: '/logo.png', altText: 'ESG World 2023 Logo' }]}
                size="MEDIUM"
                style="STANDARD"
                isThumbnail={false}
              />
            </div>

            {/* Description */}
            <RichTextDisplayField
              labelPosition="COLLAPSED"
              value={[
                <TextItem key="intro" text="ESG World 2023 is the most important global gathering of advocates and thought leaders on " size="SMALL" />,
                <TextItem key="env" text="Environmental" style="STRONG" size="SMALL" />,
                <TextItem key="comma1" text=", " size="SMALL" />,
                <TextItem key="soc" text="Social" style="STRONG" size="SMALL" />,
                <TextItem key="and" text=", and " size="SMALL" />,
                <TextItem key="gov" text="Governance" style="STRONG" size="SMALL" />,
                <TextItem key="topics" text=" topics." size="SMALL" />,
              ]}
              marginBelow="MORE"
            />

            {/* Language links */}
            <div className="flex flex-col gap-1 mt-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className="text-left text-sm py-0.5"
                  style={{
                    color: '#1a1a1a',
                    fontWeight: activeLanguage === lang ? 700 : 400,
                    textDecoration: activeLanguage === lang ? 'underline' : 'none',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 0',
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Right main content */}
          <div className="flex-1">
            {/* Register Now header */}
            <div className="mb-2">
              <HeadingField
                text="REGISTER NOW"
                size="LARGE_PLUS"
                headingTag="H1"
                fontWeight="BOLD"
                marginBelow="EVEN_LESS"
              />
              <RichTextDisplayField
                labelPosition="COLLAPSED"
                value={[
                  <TextItem key="sub" text="Registration is free of charge for this year's virtual conference" size="SMALL" color="SECONDARY" />,
                ]}
                marginBelow="STANDARD"
              />
              <hr style={{ borderColor: '#d0ccc0', borderTopWidth: 1, marginBottom: '1.5rem' }} />
            </div>

            {/* Your Details section */}
            <HeadingField
              text="YOUR DETAILS"
              size="SMALL"
              headingTag="H2"
              fontWeight="SEMI_BOLD"
              marginBelow="STANDARD"
            />

            {/* First Name / Last Name row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <TextField
                label="First Name"
                labelPosition="ABOVE"
                value={firstName}
                onChange={setFirstName}
                refreshAfter="UNFOCUS"
                inputPurpose="FIRST_NAME"
              />
              <TextField
                label="Last Name"
                labelPosition="ABOVE"
                value={lastName}
                onChange={setLastName}
                refreshAfter="UNFOCUS"
                inputPurpose="LAST_NAME"
              />
            </div>

            {/* Email / Country row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <TextField
                label="Email Address"
                labelPosition="ABOVE"
                value={email}
                onChange={setEmail}
                refreshAfter="UNFOCUS"
                inputPurpose="EMAIL"
              />
              <DropdownField
                label="Country"
                labelPosition="ABOVE"
                placeholder="Select country of residence"
                choiceLabels={COUNTRIES}
                choiceValues={COUNTRIES}
                value={country}
                onChange={setCountry}
                searchDisplay="AUTO"
              />
            </div>

            {/* Org Name / Job Title row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <TextField
                label="Organization Name"
                labelPosition="ABOVE"
                value={orgName}
                onChange={setOrgName}
                refreshAfter="UNFOCUS"
              />
              <TextField
                label="Job Title"
                labelPosition="ABOVE"
                value={jobTitle}
                onChange={setJobTitle}
                refreshAfter="UNFOCUS"
              />
            </div>

            {/* Your Interests card */}
            <CardLayout
              padding="MORE"
              showBorder={false}
              showShadow={false}
              style="#ede9dc"
              marginBelow="MORE"
            >
              <HeadingField
                text="YOUR INTERESTS"
                size="EXTRA_SMALL"
                headingTag="H3"
                fontWeight="SEMI_BOLD"
                marginBelow="STANDARD"
              />
              {/* Two-column checkbox layout */}
              <div className="grid grid-cols-2 gap-x-8">
                <CheckboxField
                  labelPosition="COLLAPSED"
                  choiceLabels={INTERESTS.slice(0, 5)}
                  choiceValues={INTERESTS.slice(0, 5)}
                  value={interests.filter(i => INTERESTS.slice(0, 5).includes(i))}
                  onChange={(vals) => {
                    const others = interests.filter(i => !INTERESTS.slice(0, 5).includes(i))
                    setInterests([...others, ...vals])
                  }}
                  choiceLayout="STACKED"
                  spacing="STANDARD"
                />
                <CheckboxField
                  labelPosition="COLLAPSED"
                  choiceLabels={INTERESTS.slice(5)}
                  choiceValues={INTERESTS.slice(5)}
                  value={interests.filter(i => INTERESTS.slice(5).includes(i))}
                  onChange={(vals) => {
                    const others = interests.filter(i => !INTERESTS.slice(5).includes(i))
                    setInterests([...others, ...vals])
                  }}
                  choiceLayout="STACKED"
                  spacing="STANDARD"
                />
              </div>
            </CardLayout>

            {/* Register button */}
            <div className="flex justify-end">
              <ButtonWidget
                label="REGISTER"
                style="SOLID"
                color="#c9a227"
                icon="arrow-right"
                iconPosition="START"
                size="STANDARD"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
