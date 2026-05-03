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
} from '@pglevy/sailwind'

const COUNTRIES = [
  "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa",
  "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda",
  "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
  "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
  "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso",
  "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Chile",
  "China", "Colombia", "Costa Rica", "Croatia", "Cuba", "Cyprus",
  "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Estonia", "Ethiopia", "Finland", "France", "Germany",
  "Ghana", "Greece", "Guatemala", "Honduras", "Hong Kong", "Hungary",
  "Iceland", "India", "Indonesia", "Iran, Islamic Republic of", "Iraq",
  "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
  "Kenya", "Korea, Republic of", "Kuwait", "Latvia", "Lebanon", "Lithuania",
  "Luxembourg", "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand",
  "Nigeria", "Norway", "Pakistan", "Panama", "Peru", "Philippines", "Poland",
  "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Senegal",
  "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "Spain",
  "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Taiwan (ROC)", "Thailand",
  "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe",
]

const LANGUAGES = [
  "ENGLISH", "简体中文", "हिन्दी", "ESPAÑOL", "FRANÇAIS", "العربية", "DEUTSCHE", "日本語",
]

const INTERESTS = [
  "Climate change and carbon emissions",
  "Biodiversity",
  "Energy efficiency",
  "Community relations",
  "Data protection and privacy",
  "Air and water pollution",
  "Deforestation",
  "Water scarcity",
  "Gender and diversity",
  "Labor standards",
]

export default function EsgRegister() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState<string | null>(null)
  const [org, setOrg] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [language, setLanguage] = useState(0)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f6f0' }}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-8">

          {/* Left sidebar */}
          <div className="w-56 flex-shrink-0">
            {/* Logo */}
            <div className="mb-6">
              <img src="/logo.png" alt="ESG World 2023 Logo" className="w-40" />
            </div>

            {/* Description */}
            <RichTextDisplayField
              labelPosition="COLLAPSED"
              value={[
                <TextItem key="intro" text="ESG World 2023 is the most important global gathering of advocates and thought leaders on " size="SMALL" />,
                <TextItem key="env" text="Environmental" size="SMALL" style="STRONG" />,
                <TextItem key="comma1" text=", " size="SMALL" />,
                <TextItem key="soc" text="Social" size="SMALL" style="STRONG" />,
                <TextItem key="and" text=", and " size="SMALL" />,
                <TextItem key="gov" text="Governance" size="SMALL" style="STRONG" />,
                <TextItem key="topics" text=" topics." size="SMALL" />,
              ]}
              marginBelow="MORE"
            />

            {/* Language links */}
            <div className="flex flex-col gap-1">
              {LANGUAGES.map((lang, i) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(i)}
                  className={`text-left text-sm py-0.5 ${i === language ? 'font-bold underline' : ''}`}
                  style={{ color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Register Now header */}
            <div className="mb-6">
              <HeadingField
                text="REGISTER NOW"
                size="LARGE"
                headingTag="H1"
                marginBelow="EVEN_LESS"
              />
              <RichTextDisplayField
                labelPosition="COLLAPSED"
                value={[
                  <TextItem key="sub" text="Registration is free of charge for this year's virtual conference" size="STANDARD" color="SECONDARY" />,
                ]}
                marginBelow="STANDARD"
              />
              <hr style={{ borderColor: '#d0ccc0', borderTopWidth: 1 }} />
            </div>

            {/* Your Details section */}
            <div className="mb-6">
              <HeadingField
                text="YOUR DETAILS"
                size="SMALL"
                headingTag="H2"
                marginBelow="STANDARD"
              />

              {/* First Name / Last Name */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <TextField
                  label="First Name"
                  labelPosition="ABOVE"
                  value={firstName}
                  onChange={setFirstName}
                  validations={[]}
                  marginBelow="NONE"
                />
                <TextField
                  label="Last Name"
                  labelPosition="ABOVE"
                  value={lastName}
                  onChange={setLastName}
                  validations={[]}
                  marginBelow="NONE"
                />
              </div>

              {/* Email / Country */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <TextField
                  label="Email Address"
                  labelPosition="ABOVE"
                  value={email}
                  onChange={setEmail}
                  validations={[]}
                  marginBelow="NONE"
                />
                <DropdownField
                  label="Country"
                  labelPosition="ABOVE"
                  placeholder="Select country of residence"
                  choiceLabels={COUNTRIES}
                  choiceValues={COUNTRIES}
                  value={country}
                  onChange={setCountry}
                  marginBelow="NONE"
                />
              </div>

              {/* Organization / Job Title */}
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Organization Name"
                  labelPosition="ABOVE"
                  value={org}
                  onChange={setOrg}
                  validations={[]}
                  marginBelow="NONE"
                />
                <TextField
                  label="Job Title"
                  labelPosition="ABOVE"
                  value={jobTitle}
                  onChange={setJobTitle}
                  validations={[]}
                  marginBelow="NONE"
                />
              </div>
            </div>

            {/* Your Interests section */}
            <CardLayout padding="STANDARD" showShadow={false} style="NONE">
              <HeadingField
                text="YOUR INTERESTS"
                size="SMALL"
                headingTag="H2"
                marginBelow="STANDARD"
              />
              <div className="grid grid-cols-2 gap-x-8">
                <CheckboxField
                  label=""
                  labelPosition="COLLAPSED"
                  choiceLabels={INTERESTS.slice(0, 5)}
                  choiceValues={INTERESTS.slice(0, 5)}
                  value={interests.filter(i => INTERESTS.slice(0, 5).includes(i))}
                  onChange={(vals) => {
                    const others = interests.filter(i => !INTERESTS.slice(0, 5).includes(i))
                    setInterests([...others, ...vals])
                  }}
                  choiceLayout="STACKED"
                  marginBelow="NONE"
                />
                <CheckboxField
                  label=""
                  labelPosition="COLLAPSED"
                  choiceLabels={INTERESTS.slice(5)}
                  choiceValues={INTERESTS.slice(5)}
                  value={interests.filter(i => INTERESTS.slice(5).includes(i))}
                  onChange={(vals) => {
                    const others = interests.filter(i => !INTERESTS.slice(5).includes(i))
                    setInterests([...others, ...vals])
                  }}
                  choiceLayout="STACKED"
                  marginBelow="NONE"
                />
              </div>
            </CardLayout>

            {/* Register button */}
            <div className="flex justify-end mt-6">
              <ButtonWidget
                label="REGISTER"
                style="SOLID"
                color="#c9a227"
                icon="ArrowRight"
                iconPosition="END"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
