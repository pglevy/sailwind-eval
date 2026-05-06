import {
  CardLayout,
  HeadingField,
  RichTextDisplayField,
  TextItem,
  ImageField,
  ButtonArrayLayout,
  StampField,
} from '@pglevy/sailwind'
import { Car, Users, Umbrella, ChevronRight, ChevronDown, DollarSign } from 'lucide-react'

// Coverage detail rows
const coverageItems = [
  {
    title: 'Bodily Injury Liability',
    details: ['$50,000/person', '$100,000/accident'],
  },
  {
    title: 'Uninsured/Underinsured Motorist Bodily Injury Liability',
    details: ['$50,000/person', '$100,000/accident'],
  },
  {
    title: 'Property Damage Liability',
    details: ['$75,000/accident'],
  },
  {
    title: 'Medical Payments',
    details: ['$25,000/person', '$50,000/accident'],
  },
]

const discounts = [
  {
    icon: 'car',
    bgColor: '#674ea7',
    amount: '$180.90',
    label: 'Multi-Vehicle Discount',
    barColor: '#674ea7',
  },
  {
    icon: 'user-friends',
    bgColor: '#e69138',
    amount: '$143.25',
    label: 'Multi-Driver Discount',
    barColor: '#e69138',
  },
  {
    icon: 'thumbs-up',
    bgColor: '#6aa84f',
    amount: '$211.60',
    label: 'Safe Driving Discount',
    barColor: '#6aa84f',
  },
]

export default function InsuranceQuote() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#1155cc' }}>
      {/* ── HEADER BAND ── */}
      <div style={{ backgroundColor: '#1155cc' }}>
        {/* Logo bar */}
        <div className="flex justify-center pt-4 pb-2">
          <ImageField
            label=""
            labelPosition="COLLAPSED"
            images={[{ document: 'insurecorp_logo.png', altText: 'InsureCorp Logo' }]}
            size="SMALL"
            isThumbnail={false}
            style="STANDARD"
          />
        </div>

        {/* Hero row: text + car image */}
        <div className="max-w-4xl mx-auto px-6 pt-4 pb-4 flex items-center justify-center gap-16">
          {/* Left: welcome text + CTA */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-white whitespace-nowrap mb-1">
              Welcome back, Karen!
            </h1>
            <p className="text-base text-white mb-5 whitespace-nowrap">
              Please review your personalized insurance quote.
            </p>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 text-sm font-semibold text-white border-2 border-white rounded hover:bg-white hover:text-blue-700 transition-colors"
              >
                PURCHASE NOW
              </button>
              <span className="text-blue-200 text-sm">
                Or,{' '}
                <a href="#" className="text-white underline hover:text-blue-100">
                  start a new quote
                </a>
              </span>
            </div>
          </div>

          {/* Right: automobile illustration */}
          <div className="flex-shrink-0 w-56">
            <ImageField
              label=""
              labelPosition="COLLAPSED"
              images={[{ document: 'automobile.png', altText: 'Illustration of automobile' }]}
              size="FIT"
              isThumbnail={false}
              style="STANDARD"
              align="END"
            />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT AREA ── */}
      <div style={{ backgroundColor: '#1155cc' }} className="pb-12">
        <div className="max-w-4xl mx-auto px-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">

            {/* ── LEFT COLUMN: Coverage Details ── */}
            <div className="md:col-span-3">
              <CardLayout
                padding="MORE"
                showBorder={false}
                showShadow={true}
                shape="SEMI_ROUNDED"
              >
                <HeadingField
                  text="Your coverage details"
                  size="LARGE"
                  fontWeight="REGULAR"
                  marginBelow="MORE"
                />

                {/* Pricing card */}
                <CardLayout
                  padding="STANDARD"
                  showBorder={true}
                  showShadow={false}
                  decorativeBarPosition="TOP"
                  decorativeBarColor="ACCENT"
                  marginBelow="STANDARD"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-900">$113.50</span>
                      <span className="text-sm text-gray-600">/ Month</span>
                    </div>
                    <span className="text-sm text-gray-500">– or –</span>
                    <div className="flex flex-col items-end">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-gray-900">$646.95</span>
                        <span className="text-sm text-gray-600">/ 6 Mos*</span>
                      </div>
                      <span className="text-xs text-gray-400">*With prepayment discount</span>
                    </div>
                  </div>
                </CardLayout>

                <RichTextDisplayField
                  labelPosition="COLLAPSED"
                  value={[<TextItem key="ai" text="Auto Insurance" size="STANDARD" color="SECONDARY" />]}
                  marginBelow="EVEN_LESS"
                />

                {/* Expandable rows */}
                <div className="divide-y divide-gray-100 mb-4">
                  {/* Discounts row */}
                  <div className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded">
                    <DollarSign size={18} className="text-gray-400 shrink-0" />
                    <span className="flex-1 text-sm text-gray-800">3 discounts</span>
                    <span className="text-sm font-semibold text-green-700">$42.90/mo</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                  {/* Vehicles row */}
                  <div className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded">
                    <Car size={18} className="text-gray-400 shrink-0" />
                    <span className="flex-1 text-sm text-gray-800">2 vehicles</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                  {/* Drivers row */}
                  <div className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded">
                    <Users size={18} className="text-gray-400 shrink-0" />
                    <span className="flex-1 text-sm text-gray-800">2 drivers</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                  {/* Coverage row */}
                  <div className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded">
                    <Umbrella size={18} className="text-gray-400 shrink-0" />
                    <span className="flex-1 text-sm text-gray-800">Coverage</span>
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>

                {/* Coverage line items */}
                <div className="border-t border-gray-200">
                  {coverageItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between py-3 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.title}</p>
                        {item.details.map((d, i) => (
                          <p key={i} className="text-xs text-gray-500">{d}</p>
                        ))}
                      </div>
                      <ButtonArrayLayout
                        buttons={[
                          {
                            label: 'EDIT',
                            style: 'OUTLINE',
                            color: 'SECONDARY',
                            size: 'SMALL',
                          },
                        ]}
                        align="END"
                      />
                    </div>
                  ))}
                </div>
              </CardLayout>
            </div>

            {/* ── RIGHT COLUMN: Discounts + Savings ── */}
            <div className="md:col-span-2 flex flex-col gap-6">

              {/* Discounts card */}
              <CardLayout
                padding="MORE"
                showBorder={false}
                showShadow={true}
                shape="SEMI_ROUNDED"
              >
                <HeadingField
                  text="Your discounts"
                  size="LARGE"
                  fontWeight="REGULAR"
                  marginBelow="MORE"
                />

                {discounts.map((d, idx) => (
                  <CardLayout
                    key={idx}
                    padding="STANDARD"
                    showBorder={false}
                    showShadow={false}
                    decorativeBarPosition="TOP"
                    decorativeBarColor={d.barColor}
                    marginBelow="STANDARD"
                    style="NONE"
                  >
                    <div className="flex items-center gap-3">
                      <StampField
                        labelPosition="COLLAPSED"
                        icon={d.icon}
                        backgroundColor={d.bgColor}
                        contentColor="#ffffff"
                        size="SMALL"
                      />
                      <div>
                        <RichTextDisplayField
                          labelPosition="COLLAPSED"
                          value={[
                            <TextItem key="amt" text={`${d.amount} `} size="MEDIUM_PLUS" style="STRONG" />,
                            <TextItem key="yr" text="/ Year" size="STANDARD" color="SECONDARY" />,
                          ]}
                          marginBelow="NONE"
                        />
                        <RichTextDisplayField
                          labelPosition="COLLAPSED"
                          value={[
                            <TextItem key="lbl" text={d.label} size="STANDARD" color="SECONDARY" />,
                          ]}
                          marginBelow="NONE"
                        />
                      </div>
                    </div>
                  </CardLayout>
                ))}
              </CardLayout>

              {/* Savings card */}
              <CardLayout
                padding="MORE"
                showBorder={false}
                showShadow={true}
                shape="SEMI_ROUNDED"
              >
                <HeadingField
                  text="Your savings"
                  size="LARGE"
                  fontWeight="REGULAR"
                  marginBelow="MORE"
                />

                {/* Gauge donut */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-36 h-36">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="9" />
                      <circle
                        cx="50" cy="50" r="40" fill="none"
                        stroke="#4285f4" strokeWidth="9"
                        strokeDasharray={`${2 * Math.PI * 40 * 0.24} ${2 * Math.PI * 40}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-800">
                        24<span className="text-base font-normal text-gray-500">%</span>
                      </span>
                    </div>
                  </div>
                </div>

                <RichTextDisplayField
                  labelPosition="COLLAPSED"
                  value={[
                    <TextItem key="t1" text="You can get our award-winning service while enjoying a premium that's " size="STANDARD" color="SECONDARY" />,
                    <TextItem key="t2" text="24% lower" size="STANDARD" style="STRONG" />,
                    <TextItem key="t3" text=" than the average for other drivers in your area." size="STANDARD" color="SECONDARY" />,
                  ]}
                />
              </CardLayout>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER BAND ── */}
      <div style={{ backgroundColor: '#333333' }} className="py-10">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <ImageField
              label=""
              labelPosition="COLLAPSED"
              images={[{ document: 'insurecorp_logo.png', altText: 'InsureCorp Logo' }]}
              size="SMALL"
              isThumbnail={false}
              style="STANDARD"
            />
          </div>
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            value={[
              <TextItem
                key="d1"
                text="We may use information from public sources or third parties, such as driving records, claim history, vehicle driving data, and credit reports to provide you with the best quote."
                size="SMALL"
                color="#aaaaaa"
              />,
              <br key="b1" />,
              <br key="b2" />,
              <TextItem
                key="d2"
                text="Some discounts, coverages, payment plans, and features are not available in all states."
                size="SMALL"
                color="#aaaaaa"
              />,
              <br key="b3" />,
              <br key="b4" />,
              <TextItem
                key="d3"
                text="This site exists for demonstration purposes only. We can't actually sell you auto insurance."
                size="SMALL"
                color="#aaaaaa"
              />,
            ]}
          />
        </div>
      </div>
    </div>
  )
}
