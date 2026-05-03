import { useState } from 'react'
import {
  HeadingField,
  CardLayout,
  RichTextDisplayField,
  TextItem,
  TextField,
  DropdownField,
  CheckboxField,
  ButtonArrayLayout,
  ProgressBar,
  MessageBanner,
  TagField,
  StampField,
} from '@pglevy/sailwind'
import { CheckCircle, Circle, Upload, FileText } from 'lucide-react'

const ACCOUNT_TYPES = [
  { id: 'essential_checking', label: 'Essential Checking', description: 'No monthly fee, free debit card, mobile banking', fee: '$0/month' },
  { id: 'business_advantage', label: 'Business Advantage', description: 'Business checking with cash management tools, merchant services', fee: '$15/month' },
  { id: 'youth_savings', label: 'Youth Savings', description: 'High-yield savings for members under 25, no minimum balance', fee: '$0/month' },
]

const STEPS = [
  { id: 1, label: 'Account Type' },
  { id: 2, label: 'Personal Info' },
  { id: 3, label: 'Identity Verification' },
  { id: 4, label: 'Documents' },
  { id: 5, label: 'Review & Submit' },
]

const REQUIRED_DOCS: Record<string, string[]> = {
  essential_checking: ['Government-Issued ID', 'Proof of Address'],
  business_advantage: ['Government-Issued ID', 'Proof of Address', 'Business License', 'Bank Statements (3 months)'],
  youth_savings: ['Government-Issued ID', 'Proof of Address', 'Guardian Consent Form'],
}

interface FormData {
  accountType: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dob: string
  ssn: string
  address: string
  city: string
  state: string
  zip: string
  idType: string
  idNumber: string
  idExpiry: string
  agreedToTerms: string[]
  agreedToPrivacy: string[]
}

export default function ApplicationWizard() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    accountType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    ssn: '',
    address: '',
    city: '',
    state: 'CA',
    zip: '',
    idType: 'drivers_license',
    idNumber: '',
    idExpiry: '',
    agreedToTerms: [],
    agreedToPrivacy: [],
  })

  const progress = Math.round(((step - 1) / (STEPS.length - 1)) * 100)
  const requiredDocs = REQUIRED_DOCS[form.accountType] ?? []
  const selectedAccount = ACCOUNT_TYPES.find(a => a.id === form.accountType)

  const updateStr = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const updateArr = (field: keyof FormData, value: string[]) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const canProceed = () => {
    if (step === 1) return !!form.accountType
    if (step === 2) return !!(form.firstName && form.lastName && form.email && form.phone && form.dob && form.address && form.city && form.zip)
    if (step === 3) return !!(form.idType && form.idNumber && form.idExpiry)
    if (step === 4) return true
    if (step === 5) return form.agreedToTerms.length > 0 && form.agreedToPrivacy.length > 0
    return true
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center">
        <div className="max-w-lg w-full px-4">
          <CardLayout padding="EVEN_MORE" showShadow={true}>
            <div className="text-center">
              <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
              <HeadingField text="Application Submitted!" size="LARGE" fontWeight="BOLD" marginBelow="STANDARD" />
              <RichTextDisplayField
                value={[<TextItem key="t" text="Your application has been received. You'll get a confirmation email within 15 minutes. A member services representative will review your application within 24 hours." color="SECONDARY" size="STANDARD" />]}
                marginBelow="MORE"
              />
              <StampField text="Application #1009" backgroundColor="POSITIVE" contentColor="#ffffff" size="MEDIUM" marginBelow="MORE" />
              <ButtonArrayLayout
                buttons={[{ label: 'Return to Home', style: 'SOLID', color: 'ACCENT', onClick: () => { window.location.hash = '/' } }]}
                align="CENTER"
              />
            </div>
          </CardLayout>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <HeadingField text="Open a New Account" size="LARGE" headingTag="H1" marginBelow="EVEN_LESS" />
        <RichTextDisplayField
          value={[<TextItem key="s" text="Pacific Coast Credit Union — Member Application" color="SECONDARY" size="STANDARD" />]}
          marginBelow="MORE"
        />

        {/* Progress */}
        <CardLayout padding="STANDARD" showShadow={false}>
          <div className="flex justify-between mb-2">
            {STEPS.map(s => (
              <div key={s.id} className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${s.id < step ? 'bg-green-500 text-white' : s.id === step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {s.id < step ? <CheckCircle size={16} /> : s.id}
                </div>
                <RichTextDisplayField
                  value={[<TextItem key="l" text={s.label} size="SMALL" color={s.id === step ? 'ACCENT' : 'SECONDARY'} />]}
                  marginBelow="NONE"
                />
              </div>
            ))}
          </div>
          <ProgressBar percentage={progress} color="ACCENT" marginBelow="NONE" />
        </CardLayout>

        <div className="mt-6">
          {/* Step 1: Account Type */}
          {step === 1 && (
            <CardLayout padding="MORE" showShadow={true}>
              <HeadingField text="Choose Your Account Type" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
              <div className="space-y-3">
                {ACCOUNT_TYPES.map(acct => (
                  <div
                    key={acct.id}
                    onClick={() => updateStr('accountType', acct.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${form.accountType === acct.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {form.accountType === acct.id
                          ? <CheckCircle className="text-blue-500 mt-0.5 shrink-0" size={20} />
                          : <Circle className="text-gray-300 mt-0.5 shrink-0" size={20} />
                        }
                        <div>
                          <RichTextDisplayField
                            value={[<TextItem key="n" text={acct.label} size="MEDIUM" style="STRONG" />]}
                            marginBelow="EVEN_LESS"
                          />
                          <RichTextDisplayField
                            value={[<TextItem key="d" text={acct.description} size="SMALL" color="SECONDARY" />]}
                            marginBelow="NONE"
                          />
                        </div>
                      </div>
                      <TagField tags={[{ text: acct.fee, backgroundColor: 'ACCENT' }]} size="SMALL" marginBelow="NONE" />
                    </div>
                  </div>
                ))}
              </div>
              {form.accountType && (
                <div className="mt-4">
                  <MessageBanner
                    primaryText={`Required documents: ${(REQUIRED_DOCS[form.accountType] ?? []).join(', ')}`}
                    backgroundColor="INFO"
                    highlightColor="INFO"
                    icon="info"
                  />
                </div>
              )}
            </CardLayout>
          )}

          {/* Step 2: Personal Info */}
          {step === 2 && (
            <CardLayout padding="MORE" showShadow={true}>
              <HeadingField text="Personal Information" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
              <div className="grid grid-cols-2 gap-4">
                <TextField label="First Name" value={form.firstName} onChange={(v: string) => updateStr('firstName', v)} placeholder="Carlos" />
                <TextField label="Last Name" value={form.lastName} onChange={(v: string) => updateStr('lastName', v)} placeholder="Martinez" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <TextField label="Email Address" value={form.email} onChange={(v: string) => updateStr('email', v)} placeholder="carlos@example.com" />
                <TextField label="Phone Number" value={form.phone} onChange={(v: string) => updateStr('phone', v)} placeholder="(415) 555-0192" />
              </div>
              <div className="mt-4">
                <TextField label="Date of Birth" value={form.dob} onChange={(v: string) => updateStr('dob', v)} placeholder="MM/DD/YYYY" />
              </div>
              <div className="mt-4">
                <TextField label="Street Address" value={form.address} onChange={(v: string) => updateStr('address', v)} placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <TextField label="City" value={form.city} onChange={(v: string) => updateStr('city', v)} placeholder="San Francisco" />
                <DropdownField
                  label="State"
                  value={form.state}
                  onChange={(v: string) => updateStr('state', v)}
                  choiceLabels={['California', 'Nevada', 'Oregon']}
                  choiceValues={['CA', 'NV', 'OR']}
                />
                <TextField label="ZIP Code" value={form.zip} onChange={(v: string) => updateStr('zip', v)} placeholder="94102" />
              </div>
            </CardLayout>
          )}

          {/* Step 3: Identity Verification */}
          {step === 3 && (
            <CardLayout padding="MORE" showShadow={true}>
              <HeadingField text="Identity Verification" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
              <MessageBanner
                primaryText="Your information is encrypted and protected. We use this to verify your identity as required by federal law."
                backgroundColor="INFO"
                highlightColor="INFO"
                icon="info"
              />
              <div className="mt-4">
                <DropdownField
                  label="ID Type"
                  value={form.idType}
                  onChange={(v: string) => updateStr('idType', v)}
                  choiceLabels={["Driver's License", 'Passport', 'State ID']}
                  choiceValues={['drivers_license', 'passport', 'state_id']}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <TextField label="ID Number" value={form.idNumber} onChange={(v: string) => updateStr('idNumber', v)} placeholder="D1234567" />
                <TextField label="Expiration Date" value={form.idExpiry} onChange={(v: string) => updateStr('idExpiry', v)} placeholder="MM/YYYY" />
              </div>
              <div className="mt-4">
                <TextField label="Social Security Number (last 4 digits)" value={form.ssn} onChange={(v: string) => updateStr('ssn', v)} placeholder="XXXX" masked={true} />
              </div>
            </CardLayout>
          )}

          {/* Step 4: Documents */}
          {step === 4 && (
            <CardLayout padding="MORE" showShadow={true}>
              <HeadingField text="Upload Documents" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
              <RichTextDisplayField
                value={[<TextItem key="t" text="Upload the following documents to complete your application. Accepted formats: PDF, JPG, PNG (max 10MB each)." color="SECONDARY" size="STANDARD" />]}
                marginBelow="STANDARD"
              />
              <div className="space-y-3">
                {requiredDocs.map((doc, i) => (
                  <div key={i} className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="text-gray-400" size={20} />
                      <div>
                        <RichTextDisplayField value={[<TextItem key="n" text={doc} size="STANDARD" style="STRONG" />]} marginBelow="NONE" />
                        <RichTextDisplayField value={[<TextItem key="r" text="Required" size="SMALL" color="NEGATIVE" />]} marginBelow="NONE" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Upload className="text-blue-500" size={16} />
                      <RichTextDisplayField value={[<TextItem key="u" text="Upload" size="SMALL" color="ACCENT" />]} marginBelow="NONE" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <MessageBanner
                  primaryText="You can also upload documents later from your member portal. Your application will be saved."
                  backgroundColor="INFO"
                  highlightColor="INFO"
                  icon="info"
                />
              </div>
            </CardLayout>
          )}

          {/* Step 5: Review & Submit */}
          {step === 5 && (
            <CardLayout padding="MORE" showShadow={true}>
              <HeadingField text="Review & Submit" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="STANDARD" />
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <RichTextDisplayField value={[<TextItem key="h" text="Account Type" size="SMALL" color="SECONDARY" />]} marginBelow="EVEN_LESS" />
                  <RichTextDisplayField value={[<TextItem key="v" text={selectedAccount?.label ?? '—'} size="STANDARD" style="STRONG" />]} marginBelow="NONE" />
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <RichTextDisplayField value={[<TextItem key="h" text="Applicant" size="SMALL" color="SECONDARY" />]} marginBelow="EVEN_LESS" />
                  <RichTextDisplayField value={[<TextItem key="v" text={`${form.firstName} ${form.lastName}`} size="STANDARD" style="STRONG" />]} marginBelow="EVEN_LESS" />
                  <RichTextDisplayField value={[<TextItem key="e" text={form.email} size="SMALL" color="SECONDARY" />]} marginBelow="EVEN_LESS" />
                  <RichTextDisplayField value={[<TextItem key="p" text={form.phone} size="SMALL" color="SECONDARY" />]} marginBelow="NONE" />
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <RichTextDisplayField value={[<TextItem key="h" text="Address" size="SMALL" color="SECONDARY" />]} marginBelow="EVEN_LESS" />
                  <RichTextDisplayField value={[<TextItem key="v" text={`${form.address}, ${form.city}, ${form.state} ${form.zip}`} size="STANDARD" />]} marginBelow="NONE" />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <CheckboxField
                  label="Agreements"
                  choiceLabels={['I agree to the Terms and Conditions and Member Account Agreement']}
                  choiceValues={['terms']}
                  value={form.agreedToTerms}
                  onChange={(v: string[]) => updateArr('agreedToTerms', v)}
                />
                <CheckboxField
                  choiceLabels={['I agree to the Privacy Policy and consent to electronic communications']}
                  choiceValues={['privacy']}
                  value={form.agreedToPrivacy}
                  onChange={(v: string[]) => updateArr('agreedToPrivacy', v)}
                  labelPosition="COLLAPSED"
                />
              </div>
            </CardLayout>
          )}

          {/* Navigation */}
          <div className="mt-6">
            <ButtonArrayLayout
              buttons={[
                ...(step > 1 ? [{ label: 'Back', style: 'OUTLINE' as const, color: 'SECONDARY' as const, onClick: () => setStep(s => s - 1) }] : []),
                {
                  label: step === STEPS.length ? 'Submit Application' : 'Continue',
                  style: 'SOLID' as const,
                  color: 'ACCENT' as const,
                  disabled: !canProceed(),
                  onClick: () => {
                    if (step === STEPS.length) setSubmitted(true)
                    else setStep(s => s + 1)
                  },
                },
              ]}
              align="END"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
