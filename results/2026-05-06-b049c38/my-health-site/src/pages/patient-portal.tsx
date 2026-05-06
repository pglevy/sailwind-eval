import { useEffect, useState } from 'react'
import {
  ButtonArrayLayout,
  CardLayout,
  HeadingField,
  RichTextDisplayField,
  TabsField,
  TextItem,
} from '@pglevy/sailwind'
import { Venus, Cake, UserRound, Building2, ChevronRight } from 'lucide-react'
import { getAppointments, getHealthSummaryItems, type Appointment, type HealthSummaryItem } from '../db/health'

// ─── Health summary icon map (Font Awesome icon names → Lucide equivalents) ───
// We render these inline since Sailwind's Icon component uses FA icon keys
// and the SAIL expression uses richTextIcon. We'll use inline SVG via Lucide.

function HealthIcon({ icon }: { icon: string }) {
  const color = '#C22966'
  const size = 22

  const icons: Record<string, React.ReactElement> = {
    dna: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 15c6.667-6 13.333 0 20-6" /><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
        <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" /><path d="m17 6-2.5-2.5" />
        <path d="m14 8-1-1" /><path d="m7 18 2.5 2.5" /><path d="m10 16 1 1" />
        <path d="m16 9 2.5 2.5" /><path d="m13 12 1 1" /><path d="m8 15-2.5-2.5" />
        <path d="m11 12-1-1" />
      </svg>
    ),
    viruses: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
    prescription: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" />
        <path d="m14 11 2 2-2 2" /><path d="M16 13h-3" />
      </svg>
    ),
    syringe: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 2 4 4" /><path d="m17 7 3-3" /><path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
        <path d="m9 11 4 4" /><path d="m5 19-3 3" /><path d="m14 4 6 6" />
      </svg>
    ),
    'user-md': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    'glass-cheers': (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 22h8" /><path d="M7 10h10" /><path d="M12 15v7" />
        <path d="M17 3 7 13l5 2 5-12Z" /><path d="M7 3l10 10-5 2L7 3Z" />
      </svg>
    ),
    vial: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6" /><path d="M10 9h4" />
        <path d="M9 3v11a6 6 0 0 0 6 0V3" /><path d="M3 21h18" />
      </svg>
    ),
  }

  return icons[icon] ?? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

// ─── Appointment Card ──────────────────────────────────────────────────────────
function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <CardLayout
      shape="SEMI_ROUNDED"
      borderColor="#DCE6E8"
      marginBelow="STANDARD"
      padding="STANDARD"
      showBorder={true}
    >
      <HeadingField
        text={appointment.title}
        headingTag="H3"
        size="EXTRA_SMALL"
        fontWeight="SEMI_BOLD"
        marginBelow="NONE"
      />
      <RichTextDisplayField
        labelPosition="COLLAPSED"
        marginBelow="EVEN_LESS"
        value={[
          <TextItem key="date" text={appointment.date} size="SMALL" color="STANDARD" />,
        ]}
      />
      <div className="flex items-start gap-1 mt-1">
        <UserRound size={14} className="text-gray-500 mt-0.5 shrink-0" />
        <span className="text-xs text-gray-500">{appointment.provider}</span>
      </div>
      <div className="flex items-start gap-1 mt-1">
        <Building2 size={14} className="text-gray-500 mt-0.5 shrink-0" />
        <div className="text-xs text-gray-500">
          <div>{appointment.address1}</div>
          {appointment.address2 && <div>{appointment.address2}</div>}
          <div>{appointment.address3}</div>
        </div>
      </div>
    </CardLayout>
  )
}

// ─── Health Summary Card ───────────────────────────────────────────────────────
function HealthSummaryCard({ item }: { item: HealthSummaryItem }) {
  return (
    <CardLayout
      shape="SEMI_ROUNDED"
      borderColor="#DCE6E8"
      padding="STANDARD"
      marginBelow="NONE"
      showBorder={true}
      decorativeBarPosition="START"
      decorativeBarColor="#1E798F"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0">
            <HealthIcon icon={item.icon} />
          </div>
          <div className="min-w-0">
            <HeadingField
              text={item.label}
              headingTag="H3"
              size="SMALL"
              fontWeight="SEMI_BOLD"
              marginBelow="NONE"
            />
            <RichTextDisplayField
              labelPosition="COLLAPSED"
              marginBelow="NONE"
              preventWrapping={true}
              value={[
                <TextItem key="sub" text={item.secondaryText} color="SECONDARY" size="SMALL" />,
              ]}
            />
          </div>
        </div>
        <ChevronRight size={18} className="text-gray-400 shrink-0" />
      </div>
    </CardLayout>
  )
}

// ─── Health Summary Grid ───────────────────────────────────────────────────────
function HealthSummaryGrid({ items }: { items: HealthSummaryItem[] }) {
  // Pair items into rows of 2 (left + right columns)
  const rows: HealthSummaryItem[][] = []
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2))
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-2 gap-3">
          {row.map((item) => (
            <HealthSummaryCard key={item.id} item={item} />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function PatientPortal() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [healthItems, setHealthItems] = useState<HealthSummaryItem[]>([])

  useEffect(() => {
    getAppointments().then(setAppointments)
    getHealthSummaryItems().then(setHealthItems)
  }, [])

  return (
    <div className="min-h-screen bg-[#F0F6F7]">
      {/* ── Header ── */}
      <CardLayout
        style="#0E3842"
        padding="STANDARD"
        marginBelow="NONE"
        showBorder={false}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left: logo */}
          <div className="flex items-center gap-2 text-white text-sm font-medium opacity-80 shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            <span>Community Health Partners</span>
          </div>

          {/* Right: user avatar + appian */}
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
            </svg>
            <img src="/brittany.jpg" alt="Brittany" className="w-8 h-8 rounded-full object-cover" />
            <span className="text-white text-sm font-medium">appian</span>
          </div>
        </div>
      </CardLayout>

      {/* ── Hero / Patient Banner ── */}
      <CardLayout
        style="#0E3842"
        padding="STANDARD"
        marginBelow="NONE"
        showBorder={false}
      >
        <div className="flex items-center justify-between gap-6 px-2 pb-4">
          {/* Avatar + name */}
          <div className="flex items-center gap-5">
            <img src="/brittany.jpg" alt="Brittany" className="w-24 h-24 rounded-full object-cover border-4 border-white/20" />
            <div>
              <HeadingField
                text="Good afternoon, Brittany!"
                headingTag="H1"
                size="LARGE"
                fontWeight="REGULAR"
                color="#FFFFFF"
                marginBelow="EVEN_LESS"
              />
              <div className="flex items-center gap-2 text-white text-sm opacity-80">
                <Venus size={14} />
                <span>Female</span>
                <span className="mx-1">•</span>
                <Cake size={14} />
                <span>25 years old</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <ButtonArrayLayout
            buttons={[{
              label: 'Request Appointment',
              style: 'SOLID',
              color: '#C22966',
              size: 'LARGE',
              icon: 'calendar',
            }]}
            marginBelow="NONE"
          />
        </div>
      </CardLayout>

      {/* ── Main Content: two-column layout ── */}
      <div className="flex gap-0 min-h-[calc(100vh-200px)]">

        {/* ── Left Sidebar: Upcoming Appointments ── */}
        <div className="w-72 shrink-0 bg-[#F0F6F7] p-6">
          <HeadingField
            text="Upcoming Appointments"
            headingTag="H2"
            size="MEDIUM"
            fontWeight="SEMI_BOLD"
            marginBelow="STANDARD"
          />

          {appointments.map((appt) => (
            <AppointmentCard key={appt.id} appointment={appt} />
          ))}

          <div className="mt-2">
            <ButtonArrayLayout
              align="CENTER"
              buttons={[{
                label: 'View All Appointments',
                style: 'OUTLINE',
                color: '#C22966',
              }]}
              marginBelow="NONE"
            />
          </div>
        </div>

        {/* ── Right: My Health ── */}
        <div className="flex-1 bg-white p-6">
          <HeadingField
            text="My Health"
            headingTag="H2"
            size="MEDIUM"
            fontWeight="SEMI_BOLD"
            marginBelow="STANDARD"
          />

          <CardLayout
            shape="SEMI_ROUNDED"
            borderColor="#DCE6E8"
            padding="NONE"
            showBorder={true}
          >
            <TabsField
              defaultValue="health-summary"
              color="#C22966"
              tabs={[
                {
                  label: 'Health Summary',
                  value: 'health-summary',
                  content: <HealthSummaryGrid items={healthItems} />,
                },
                { label: 'Care Summaries', value: 'care-summaries', content: <div className="p-6 text-gray-400 text-sm">No care summaries available.</div> },
                { label: 'Vitals', value: 'vitals', content: <div className="p-6 text-gray-400 text-sm">No vitals recorded.</div> },
                { label: 'Health Records', value: 'health-records', content: <div className="p-6 text-gray-400 text-sm">No health records available.</div> },
                { label: 'Tobacco History', value: 'tobacco-history', content: <div className="p-6 text-gray-400 text-sm">No tobacco history recorded.</div> },
                { label: 'Forms & Documents', value: 'forms-documents', content: <div className="p-6 text-gray-400 text-sm">No forms or documents available.</div> },
              ]}
            />
          </CardLayout>
        </div>
      </div>
    </div>
  )
}
