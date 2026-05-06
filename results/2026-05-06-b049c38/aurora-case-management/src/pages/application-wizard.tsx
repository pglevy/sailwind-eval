import { useState } from 'react'
import {
  HeadingField,
  CardLayout,
  RichTextDisplayField,
  TextItem,
  TextField,
  DropdownField,
  RadioButtonField,
  CheckboxField,
  ButtonWidget,
  ButtonArrayLayout,
  MilestoneField,
  MessageBanner,
  StampField,
} from '@pglevy/sailwind'

const ACCOUNT_TYPES = [
  { label: 'Essential Checking', value: 'essential-checking', description: 'No monthly fee with $500 minimum balance. Free debit card, online banking, and mobile deposits.', fee: '$0/mo with min balance', minBalance: '$500' },
  { label: 'Business Advantage', value: 'business-advantage', description: 'Full-featured business account with cash management tools, payroll integration, and dedicated business support.', fee: '$15/mo', minBalance: '$1,000' },
  { label: 'Youth Savings', value: 'youth-savings', description: 'High-yield savings for members under 25. No fees, competitive APY, and financial literacy resources.', fee: '$0/mo', minBalance: '$25' },
]

const REQUIRED_DOCS: Record<string, string[]> = {
  'essential-checking': ['Government-Issued ID', 'Proof of Address', 'Social Security Number'],
  'business-advantage': ['Government-Issued ID', 'Business License', 'EIN Documentation', 'Proof of Address', '3 Months Bank Statements'],
  'youth-savings': ['Government-Issued ID', 'Proof of Address', 'Parent/Guardian ID (if under 18)'],
}

const STEPS = ['Account Type', 'Personal Info', 'Identity Verification', 'Documents', 'Review & Submit']

export default function ApplicationWizard() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  // Form state
  const [accountType, setAccountType] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [idType, setIdType] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [ssn, setSsn] = useState('')
  const [agreedDocs, setAgreedDocs] = useState<string[]>([])
  const [termsAccepted, setTermsAccepted] = useState<string[]>([])

  const selectedAccount = ACCOUNT_TYPES.find(a => a.value === accountType)
  const requiredDocs = accountType ? REQUIRED_DOCS[accountType] : []

  function handleNext() {
    if (step < STEPS.length - 1) setStep(s => s + 1)
  }
  function handleBack() {
    if (step > 0) setStep(s => s - 1)
  }
  function handleSubmit() {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="max-w-lg w-full px-4">
          <CardLayout padding="EVEN_MORE" showShadow={true}>
            <StampField
              icon="check-circle"
              backgroundColor="#D1FAE5"
              contentColor="POSITIVE"
              size="LARGE"
              align="CENTER"
            />
            <HeadingField text="Application Submitted!" size="LARGE" fontWeight="BOLD" align="CENTER" marginBelow="STANDARD" />
            <RichTextDisplayField
              value={[
                <TextItem key="t" text={`Thank you, ${firstName}! Your application for a ${selectedAccount?.label ?? 'account'} has been received. A member services representative will contact you within 24 hours.`} color="SECONDARY" size="MEDIUM" />,
              ]}
              align="CENTER"
              marginBelow="MORE"
            />
            <RichTextDisplayField
              value={[<TextItem key="ref" text="Reference #: APP-2026-1011" style="STRONG" size="MEDIUM" color="ACCENT" />]}
              align="CENTER"
              marginBelow="MORE"
            />
            <ButtonArrayLayout
              align="CENTER"
              buttons={[{ label: 'Start New Application', style: 'OUTLINE', onClick: () => { setSubmitted(false); setStep(0); setAccountType(''); setFirstName(''); setLastName(''); setEmail(''); } }]}
            />
          </CardLayout>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <HeadingField text="New Member Application" size="LARGE" headingTag="H1" fontWeight="BOLD" marginBelow="STANDARD" />
        <RichTextDisplayField
          value={[<TextItem key="s" text="Pacific Coast Credit Union — Apply outside business hours and save your progress." color="SECONDARY" size="MEDIUM" />]}
          marginBelow="MORE"
        />

        <MilestoneField
          steps={STEPS}
          active={step}
          orientation="HORIZONTAL"
          color="ACCENT"
          stepStyle="DOT"
          marginBelow="MORE"
        />

        {/* Step 0: Account Type */}
        {step === 0 && (
          <CardLayout padding="MORE" showShadow={true}>
            <HeadingField text="Choose Your Account Type" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
            <RadioButtonField
              label="Account Type"
              choiceLabels={ACCOUNT_TYPES.map(a => a.label)}
              choiceValues={ACCOUNT_TYPES.map(a => a.value)}
              value={accountType}
              onChange={setAccountType}
              choiceStyle="CARDS"
              choiceLayout="STACKED"
              marginBelow="MORE"
            />
            {selectedAccount && (
              <MessageBanner
                primaryText={selectedAccount.label}
                secondaryText={`${selectedAccount.description} | Monthly fee: ${selectedAccount.fee} | Min balance: ${selectedAccount.minBalance}`}
                backgroundColor="INFO"
                highlightColor="INFO"
                icon="info"
                marginBelow="MORE"
              />
            )}
            {selectedAccount && (
              <div>
                <HeadingField text="Required Documents" size="SMALL" fontWeight="SEMI_BOLD" marginBelow="LESS" />
                <div className="flex flex-wrap gap-2">
                  {requiredDocs.map(doc => (
                    <span key={doc} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">{doc}</span>
                  ))}
                </div>
              </div>
            )}
          </CardLayout>
        )}

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <CardLayout padding="MORE" showShadow={true}>
            <HeadingField text="Personal Information" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="First Name" value={firstName} onChange={setFirstName} required={true} inputPurpose="FIRST_NAME" />
              <TextField label="Last Name" value={lastName} onChange={setLastName} required={true} inputPurpose="LAST_NAME" />
            </div>
            <TextField label="Email Address" value={email} onChange={setEmail} required={true} inputPurpose="EMAIL" marginAbove="STANDARD" />
            <TextField label="Phone Number" value={phone} onChange={setPhone} inputPurpose="PHONE_NUMBER" marginAbove="STANDARD" />
            <TextField label="Date of Birth" value={dob} onChange={setDob} required={true} inputPurpose="DOB" placeholder="YYYY-MM-DD" marginAbove="STANDARD" />
            <TextField label="Street Address" value={address} onChange={setAddress} required={true} inputPurpose="STREET_ADDRESS" marginAbove="STANDARD" />
            <div className="grid grid-cols-3 gap-4 mt-4">
              <TextField label="City" value={city} onChange={setCity} required={true} />
              <DropdownField
                label="State"
                choiceLabels={['California', 'Nevada', 'Oregon', 'Washington']}
                choiceValues={['CA', 'NV', 'OR', 'WA']}
                value={state}
                onChange={setState}
                required={true}
              />
              <TextField label="ZIP Code" value={zip} onChange={setZip} required={true} inputPurpose="POSTAL_CODE" />
            </div>
            {accountType === 'business-advantage' && (
              <TextField label="Business Name" value={businessName} onChange={setBusinessName} required={true} marginAbove="STANDARD" />
            )}
          </CardLayout>
        )}

        {/* Step 2: Identity Verification */}
        {step === 2 && (
          <CardLayout padding="MORE" showShadow={true}>
            <HeadingField text="Identity Verification" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
            <MessageBanner
              primaryText="Your information is encrypted and secure."
              secondaryText="We use 256-bit SSL encryption to protect your personal data."
              backgroundColor="INFO"
              highlightColor="INFO"
              icon="info"
              marginBelow="MORE"
            />
            <DropdownField
              label="ID Type"
              choiceLabels={["Driver's License", 'State ID', 'Passport', 'Military ID']}
              choiceValues={['drivers-license', 'state-id', 'passport', 'military-id']}
              value={idType}
              onChange={setIdType}
              required={true}
              marginBelow="STANDARD"
            />
            <TextField label="ID Number" value={idNumber} onChange={setIdNumber} required={true} marginBelow="STANDARD" />
            <TextField label="Social Security Number (last 4 digits)" value={ssn} onChange={setSsn} required={true} masked={true} characterLimit={4} showCharacterCount={true} />
          </CardLayout>
        )}

        {/* Step 3: Documents */}
        {step === 3 && (
          <CardLayout padding="MORE" showShadow={true}>
            <HeadingField text="Document Upload" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
            <RichTextDisplayField
              value={[<TextItem key="t" text="Please confirm you have the following documents ready to upload. You can complete the upload after submitting your application." color="SECONDARY" size="STANDARD" />]}
              marginBelow="MORE"
            />
            <CheckboxField
              label="Documents I have ready"
              choiceLabels={requiredDocs}
              choiceValues={requiredDocs}
              value={agreedDocs}
              onChange={setAgreedDocs}
              choiceLayout="STACKED"
              marginBelow="MORE"
            />
            <MessageBanner
              primaryText="You can upload documents after submission."
              secondaryText="A secure upload link will be emailed to you. Documents must be uploaded within 5 business days."
              backgroundColor="INFO"
              highlightColor="INFO"
              icon="info"
            />
          </CardLayout>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <CardLayout padding="MORE" showShadow={true}>
            <HeadingField text="Review Your Application" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
            <div className="space-y-4">
              <CardLayout padding="STANDARD" showBorder={true} style="TRANSPARENT">
                <HeadingField text="Account Type" size="SMALL" fontWeight="SEMI_BOLD" marginBelow="EVEN_LESS" />
                <RichTextDisplayField value={[<TextItem key="v" text={selectedAccount?.label ?? '—'} size="MEDIUM" />]} />
              </CardLayout>
              <CardLayout padding="STANDARD" showBorder={true} style="TRANSPARENT">
                <HeadingField text="Personal Information" size="SMALL" fontWeight="SEMI_BOLD" marginBelow="EVEN_LESS" />
                <RichTextDisplayField value={[<TextItem key="v" text={`${firstName} ${lastName} | ${email} | ${phone}`} size="STANDARD" color="SECONDARY" />]} />
                <RichTextDisplayField value={[<TextItem key="a" text={`${address}, ${city}, ${state} ${zip}`} size="STANDARD" color="SECONDARY" />]} />
              </CardLayout>
              <CardLayout padding="STANDARD" showBorder={true} style="TRANSPARENT">
                <HeadingField text="Identity" size="SMALL" fontWeight="SEMI_BOLD" marginBelow="EVEN_LESS" />
                <RichTextDisplayField value={[<TextItem key="v" text={`${idType} — ${idNumber}`} size="STANDARD" color="SECONDARY" />]} />
              </CardLayout>
            </div>
            <CheckboxField
              label=""
              choiceLabels={['I agree to the Terms & Conditions and Privacy Policy of Pacific Coast Credit Union']}
              choiceValues={['agreed']}
              value={termsAccepted}
              onChange={setTermsAccepted}
              marginAbove="MORE"
              marginBelow="STANDARD"
            />
          </CardLayout>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <ButtonWidget
            label="Back"
            style="OUTLINE"
            onClick={handleBack}
            disabled={step === 0}
          />
          {step < STEPS.length - 1 ? (
            <ButtonWidget
              label="Continue"
              style="SOLID"
              onClick={handleNext}
              disabled={step === 0 && !accountType}
            />
          ) : (
            <ButtonWidget
              label="Submit Application"
              style="SOLID"
              color="POSITIVE"
              onClick={handleSubmit}
              disabled={termsAccepted.length === 0}
            />
          )}
        </div>
      </div>
    </div>
  )
}
