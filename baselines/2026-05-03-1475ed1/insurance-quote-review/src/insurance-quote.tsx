import {
  CardLayout,
  HeadingField,
  RichTextDisplayField,
  TextItem,
  ButtonWidget,
  ButtonArrayLayout,
  StampField,
  Icon,
} from '@pglevy/sailwind'

// ── Coverage line item ──────────────────────────────────────────────────────
function CoverageItem({
  title,
  details,
  hasDivider = true,
}: {
  title: string
  details: string[]
  hasDivider?: boolean
}) {
  return (
    <div className={`flex items-start justify-between py-3 ${hasDivider ? 'border-b border-gray-200' : ''}`}>
      <div>
        <RichTextDisplayField
          value={[
            <TextItem key="title" text={title} style="STRONG" size="STANDARD" />,
            ...details.map((d, i) => (
              <span key={i} className="block"><TextItem text={d} color="SECONDARY" size="STANDARD" /></span>
            )),
          ]}
          marginBelow="NONE"
        />
      </div>
      <div className="ml-4 shrink-0">
        <ButtonWidget label="Edit" style="OUTLINE" color="SECONDARY" size="SMALL" />
      </div>
    </div>
  )
}

// ── Summary row (discounts / vehicles / drivers / coverage) ─────────────────
function SummaryRow({
  iconName,
  label,
  value,
  valueColor,
  chevron = 'right',
}: {
  iconName: string
  label: string
  value?: string
  valueColor?: string
  chevron?: 'right' | 'down'
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 px-1 rounded">
      <div className="flex items-center gap-3">
        <Icon icon={iconName} color="SECONDARY" size="SMALL" />
        <TextItem text={label} size="STANDARD" />
      </div>
      <div className="flex items-center gap-2">
        {value && (
          <TextItem text={value} size="STANDARD" style="STRONG" color={valueColor ?? '#38761d'} />
        )}
        <Icon icon={chevron === 'right' ? 'angle-right' : 'angle-down'} color="SECONDARY" size="SMALL" />
      </div>
    </div>
  )
}

// ── Discount card with colored top bar ─────────────────────────────────────
function DiscountCard({
  stampIcon,
  stampBg,
  amount,
  label,
  barColor,
}: {
  stampIcon: string
  stampBg: string
  amount: string
  label: string
  barColor: string
}) {
  return (
    <CardLayout
      padding="STANDARD"
      showShadow={false}
      marginBelow="STANDARD"
      decorativeBarPosition="TOP"
      decorativeBarColor={barColor}
    >
      <div className="flex items-center gap-3">
        <StampField
          labelPosition="COLLAPSED"
          icon={stampIcon}
          backgroundColor={stampBg}
          contentColor="#ffffff"
          size="SMALL"
          marginBelow="NONE"
        />
        <RichTextDisplayField
          value={[
            <TextItem key="amount" text={`${amount} `} size="MEDIUM" style="STRONG" />,
            <TextItem key="period" text="/ Year" size="STANDARD" color="SECONDARY" />,
            <br key="br" />,
            <TextItem key="label" text={label} size="STANDARD" color="SECONDARY" />,
          ]}
          marginBelow="NONE"
        />
      </div>
    </CardLayout>
  )
}

// ── Savings donut (SVG — no Sailwind gauge equivalent) ──────────────────────
function SavingsGauge({ percent }: { percent: number }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const filled = (percent / 100) * circumference
  const gap = circumference - filled

  return (
    <div className="flex justify-center my-4">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="12" />
          <circle
            cx="60" cy="60" r={radius}
            fill="none" stroke="#4285f4" strokeWidth="12"
            strokeDasharray={`${filled} ${gap}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{percent}<span className="text-base font-normal">%</span></span>
        </div>
      </div>
    </div>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────
export default function InsuranceQuote() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1155cc' }}>

      {/* ── Header ── */}
      <div className="px-6 pt-6 pb-2">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/insurecorp_logo.png" alt="InsureCorp Logo" className="h-8" />
        </div>

        {/* Welcome row */}
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-6 pb-8">
          <div className="flex-1">
            <HeadingField
              text="Welcome back, Karen!"
              size="LARGE"
              headingTag="H1"
              color="#ffffff"
              marginBelow="LESS"
            />
            <RichTextDisplayField
              value={[<TextItem key="sub" text="Please review your personalized insurance quote." color="#bfdbfe" size="MEDIUM" />]}
              marginBelow="MORE"
            />
            <div className="flex items-center gap-4">
              <ButtonArrayLayout
                buttons={[{ label: 'Purchase Now', style: 'OUTLINE', color: 'STANDARD', size: 'LARGE' }]}
                align="START"
                marginBelow="NONE"
              />
              <RichTextDisplayField
                value={[
                  <TextItem key="or" text="Or, " color="#bfdbfe" size="STANDARD" />,
                  <TextItem key="link" text="start a new quote" color="#ffffff" size="STANDARD" style="UNDERLINE" />,
                ]}
                marginBelow="NONE"
              />
            </div>
          </div>
          <div className="hidden md:block w-48 shrink-0">
            <img src="/automobile.png" alt="Illustration of automobile" className="w-full" />
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="px-4 pb-10" style={{ backgroundColor: '#1155cc' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ── Left: Coverage details ── */}
          <div className="md:col-span-2">
            <CardLayout padding="MORE" showShadow={true} marginBelow="NONE">
              <HeadingField text="Your coverage details" size="LARGE" headingTag="H2" marginBelow="STANDARD" />

              {/* Pricing banner */}
              <CardLayout
                padding="STANDARD"
                showShadow={false}
                marginBelow="STANDARD"
                decorativeBarPosition="TOP"
                decorativeBarColor="ACCENT"
              >
                <div className="flex items-baseline justify-between flex-wrap gap-2">
                  <RichTextDisplayField
                    value={[
                      <TextItem key="price1" text="$113.50" size="LARGE" style="STRONG" />,
                      <TextItem key="mo" text=" / Month" size="STANDARD" color="SECONDARY" />,
                    ]}
                    marginBelow="NONE"
                  />
                  <TextItem text="– or –" size="STANDARD" color="SECONDARY" />
                  <div className="text-right">
                    <RichTextDisplayField
                      value={[
                        <TextItem key="price2" text="$646.95" size="LARGE" style="STRONG" />,
                        <TextItem key="mos" text=" / 6 Mos*" size="STANDARD" color="SECONDARY" />,
                      ]}
                      marginBelow="NONE"
                    />
                    <TextItem text="*With prepayment discount" size="SMALL" color="SECONDARY" />
                  </div>
                </div>
              </CardLayout>

              <TextItem text="Auto Insurance" size="STANDARD" color="SECONDARY" />

              {/* Summary rows */}
              <div className="border border-gray-200 rounded my-3">
                <div className="px-3">
                  <SummaryRow iconName="hand-holding-usd" label="3 discounts" value="$42.90/mo" valueColor="#38761d" />
                  <SummaryRow iconName="car" label="2 vehicles" />
                  <SummaryRow iconName="user-friends" label="2 drivers" />
                  <SummaryRow iconName="umbrella" label="Coverage" chevron="down" />
                </div>
              </div>

              {/* Coverage line items */}
              <div className="border border-gray-200 rounded px-4">
                <CoverageItem title="Bodily Injury Liability" details={['$50,000/person', '$100,000/accident']} />
                <CoverageItem title="Uninsured/Underinsured Motorist Bodily Injury Liability" details={['$50,000/person', '$100,000/accident']} />
                <CoverageItem title="Property Damage Liability" details={['$75,000/accident']} />
                <CoverageItem title="Medical Payments" details={['$25,000/person', '$50,000/accident']} hasDivider={false} />
              </div>
            </CardLayout>
          </div>

          {/* ── Right: Discounts + Savings ── */}
          <div className="flex flex-col gap-4">
            <CardLayout padding="MORE" showShadow={true} marginBelow="NONE">
              <HeadingField text="Your discounts" size="LARGE" headingTag="H2" marginBelow="STANDARD" />
              <DiscountCard stampIcon="car" stampBg="#674ea7" amount="$180.90" label="Multi-Vehicle Discount" barColor="#674ea7" />
              <DiscountCard stampIcon="user-friends" stampBg="#e69138" amount="$143.25" label="Multi-Driver Discount" barColor="#e69138" />
              <DiscountCard stampIcon="thumbs-up" stampBg="#6aa84f" amount="$211.60" label="Safe Driving Discount" barColor="#6aa84f" />
            </CardLayout>

            <CardLayout padding="MORE" showShadow={true} marginBelow="NONE">
              <HeadingField text="Your savings" size="LARGE" headingTag="H2" marginBelow="STANDARD" />
              <SavingsGauge percent={24} />
              <RichTextDisplayField
                value={[
                  <TextItem key="t1" text="You can get our award-winning service while enjoying a premium that's " size="STANDARD" color="SECONDARY" />,
                  <TextItem key="t2" text="24% lower" size="STANDARD" style="STRONG" />,
                  <TextItem key="t3" text=" than the average for other drivers in your area." size="STANDARD" color="SECONDARY" />,
                ]}
                marginBelow="NONE"
              />
            </CardLayout>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-6 py-10" style={{ backgroundColor: '#333' }}>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6 items-start">
          <div className="shrink-0">
            <img src="/insurecorp_logo.png" alt="InsureCorp Logo" className="h-8" />
          </div>
          <RichTextDisplayField
            value={[
              <TextItem key="d1" text="We may use information from public sources or third parties, such as driving records, claim history, vehicle driving data, and credit reports to provide you with the best quote." color="#9ca3af" size="STANDARD" />,
              <br key="b1" />, <br key="b2" />,
              <TextItem key="d2" text="Some discounts, coverages, payment plans, and features are not available in all states." color="#9ca3af" size="STANDARD" />,
              <br key="b3" />, <br key="b4" />,
              <TextItem key="d3" text="This site exists for demonstration purposes only. We can't actually sell you auto insurance." color="#9ca3af" size="STANDARD" />,
            ]}
            marginBelow="NONE"
          />
        </div>
      </div>
    </div>
  )
}
