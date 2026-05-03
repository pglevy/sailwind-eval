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
            <div className="flex items-center gap-3 mb-6">
              {/* Tree SVG icon */}
              <svg width="48" height="56" viewBox="0 0 48 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 2C24 2 8 14 8 26C8 32 12 36 18 37V52H22V37.8C22.6 37.9 23.3 38 24 38C24.7 38 25.4 37.9 26 37.8V52H30V37C36 36 40 32 40 26C40 14 24 2 24 2Z" fill="#c9a227"/>
                <path d="M24 8C24 8 12 18 12 27C12 31 15 34 19 35.5V52H23V35.8C23.3 35.9 23.7 36 24 36C24.3 36 24.7 35.9 25 35.8V52H29V35.5C33 34 36 31 36 27C36 18 24 8 24 8Z" fill="#b8891e"/>
                <path d="M24 14C24 14 16 22 16 28C16 31 18.5 33.5 22 34.5V52H26V34.5C29.5 33.5 32 31 32 28C32 22 24 14 24 14Z" fill="#a07018"/>
              </svg>
              <div>
                <div className="font-bold text-xl leading-tight" style={{ color: '#1a1a1a' }}>
                  <span style={{ color: '#c9a227' }}>ESG</span>WORLD
                </div>
                <div className="font-bold text-xl leading-tight" style={{ color: '#1a1a1a' }}>2023</div>
              </div>
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
