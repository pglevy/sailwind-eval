import { useState, useEffect } from 'react'
import {
  CardLayout,
  HeadingField,
  RichTextDisplayField,
  TextItem,
  Icon,
  ImageField,
  ButtonArrayLayout,
  TabsField,
} from '@pglevy/sailwind'
import { getAppointments, type Appointment } from '../db/appointments'
import { getHealthSummaryItems, type HealthSummaryItem } from '../db/health-summary'

// ── Sub-components ────────────────────────────────────────────────────────────

function AppointmentCard({ appt }: { appt: Appointment }) {
  return (
    <CardLayout
      shape="SEMI_ROUNDED"
      borderColor="#DCE6E8"
      marginBelow="STANDARD"
      padding="STANDARD"
    >
      <HeadingField
        text={appt.title}
        headingTag="H3"
        size="SMALL"
        fontWeight="SEMI_BOLD"
        marginBelow="NONE"
      />
      <RichTextDisplayField
        labelPosition="COLLAPSED"
        marginBelow="EVEN_LESS"
        value={[<TextItem key="date" text={appt.date} size="SMALL" />]}
      />
      <RichTextDisplayField
        labelPosition="COLLAPSED"
        marginBelow="EVEN_LESS"
        value={[
          <Icon key="icon" icon="user-md" color="#6b6b6b" size="SMALL" />,
          <TextItem key="provider" text={` ${appt.provider}`} color="#6b6b6b" size="SMALL" />,
        ]}
      />
      <RichTextDisplayField
        labelPosition="COLLAPSED"
        marginBelow="NONE"
        value={[
          <Icon key="bldg" icon="building" color="#6b6b6b" size="SMALL" />,
          <TextItem key="addr" text={` ${appt.address1}`} color="#6b6b6b" size="SMALL" />,
          <br key="br" />,
          <TextItem key="city" text={`       ${appt.address2}`} color="#6b6b6b" size="SMALL" />,
        ]}
      />
    </CardLayout>
  )
}

function HealthSummaryCard({ item }: { item: HealthSummaryItem }) {
  return (
    <CardLayout
      shape="SEMI_ROUNDED"
      borderColor="#DCE6E8"
      padding="STANDARD"
      marginBelow="NONE"
      decorativeBarPosition="START"
      decorativeBarColor="#1E798F"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0">
            <RichTextDisplayField
              labelPosition="COLLAPSED"
              marginBelow="NONE"
              value={[<Icon key="icon" icon={item.icon} color="#C22966" size="MEDIUM_PLUS" />]}
            />
          </div>
          <div className="min-w-0">
            <HeadingField
              text={item.label}
              headingTag="H3"
              size="SMALL"
              fontWeight="SEMI_BOLD"
              marginBelow="EVEN_LESS"
            />
            <RichTextDisplayField
              labelPosition="COLLAPSED"
              marginBelow="NONE"
              value={[
                <TextItem key="sec" text={item.secondary} color="SECONDARY" size="SMALL" />,
              ]}
            />
          </div>
        </div>
        <div className="shrink-0">
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            marginBelow="NONE"
            value={[<Icon key="chevron" icon="angle-right" size="MEDIUM_PLUS" />]}
          />
        </div>
      </div>
    </CardLayout>
  )
}

// ── Health Summary tab content ────────────────────────────────────────────────

function HealthSummaryContent({ items }: { items: HealthSummaryItem[] }) {
  const left = items.filter((_, i) => i % 2 === 0)
  const right = items.filter((_, i) => i % 2 === 1)

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-3">
        {left.map((item) => (
          <HealthSummaryCard key={item.label} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {right.map((item) => (
          <HealthSummaryCard key={item.label} item={item} />
        ))}
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

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
      <div className="bg-[#0E3842] px-8 py-5">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <Icon icon="heartbeat" color="#ffffff" size="SMALL" />
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            marginBelow="NONE"
            value={[
              <TextItem key="logo" text="Community Health Partners" color="#ffffff" size="SMALL" />,
            ]}
          />
        </div>

        {/* Hero row */}
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            <ImageField
              labelPosition="COLLAPSED"
              images={[
                {
                  imageType: 'user' as const,
                  user: {
                    name: 'Brittany',
                    photoUrl: '/brittany.jpg',
                    initials: 'B',
                  },
                  altText: 'Brittany',
                },
              ]}
              size="LARGE_PLUS"
              style="AVATAR"
              marginBelow="NONE"
            />
          </div>

          {/* Name + demographics */}
          <div className="flex-1">
            <HeadingField
              text="Good afternoon, Brittany!"
              headingTag="H1"
              size="LARGE"
              fontWeight="REGULAR"
              marginBelow="EVEN_LESS"
              className="text-white"
            />
            <RichTextDisplayField
              labelPosition="COLLAPSED"
              marginBelow="NONE"
              value={[
                <Icon key="venus" icon="venus" color="#ffffff" size="SMALL" />,
                <TextItem key="female" text=" Female" color="#ffffff" size="SMALL" />,
                <TextItem key="dot" text="  •  " color="#ffffff" size="SMALL" />,
                <Icon key="cake" icon="birthday-cake" color="#ffffff" size="SMALL" />,
                <TextItem key="age" text=" 25 years old" color="#ffffff" size="SMALL" />,
              ]}
            />
          </div>

          {/* CTA button */}
          <div className="shrink-0">
            <ButtonArrayLayout
              marginBelow="NONE"
              buttons={[
                {
                  label: 'Request Appointment',
                  style: 'SOLID',
                  color: '#C22966',
                  icon: 'calendar',
                  size: 'LARGE',
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex gap-0">
        {/* ── Left pane: Upcoming Appointments ── */}
        <div className="w-64 shrink-0 bg-[#F0F6F7] px-6 py-6">
          <HeadingField
            text="Upcoming Appointments"
            headingTag="H2"
            size="MEDIUM"
            fontWeight="SEMI_BOLD"
            marginBelow="STANDARD"
          />

          {appointments.map((appt) => (
            <AppointmentCard key={appt.title} appt={appt} />
          ))}

          <ButtonArrayLayout
            align="CENTER"
            marginBelow="NONE"
            buttons={[
              {
                label: 'View All Appointments',
                style: 'OUTLINE',
                color: '#C22966',
              },
            ]}
          />
        </div>

        {/* ── Right pane: My Health ── */}
        <div className="flex-1 px-6 py-6">
          <HeadingField
            text="My Health"
            headingTag="H2"
            size="MEDIUM"
            fontWeight="SEMI_BOLD"
            marginBelow="STANDARD"
          />

          <CardLayout
            borderColor="#DCE6E8"
            padding="NONE"
            shape="SEMI_ROUNDED"
            showBorder={true}
          >
            <TabsField
              defaultValue="health-summary"
              color="#C22966"
              tabs={[
                {
                  value: 'health-summary',
                  label: 'Health Summary',
                  content: (
                    <div className="p-6">
                      <HealthSummaryContent items={healthItems} />
                    </div>
                  ),
                },
                {
                  value: 'care-summaries',
                  label: 'Care Summaries',
                  content: <div className="p-6 text-gray-400 text-sm">No care summaries available.</div>,
                },
                {
                  value: 'vitals',
                  label: 'Vitals',
                  content: <div className="p-6 text-gray-400 text-sm">No vitals recorded.</div>,
                },
                {
                  value: 'health-records',
                  label: 'Health Records',
                  content: <div className="p-6 text-gray-400 text-sm">No health records available.</div>,
                },
                {
                  value: 'tobacco-history',
                  label: 'Tobacco History',
                  content: <div className="p-6 text-gray-400 text-sm">No tobacco history recorded.</div>,
                },
                {
                  value: 'forms-documents',
                  label: 'Forms & Documents',
                  content: <div className="p-6 text-gray-400 text-sm">No forms or documents available.</div>,
                },
              ]}
            />
          </CardLayout>
        </div>
      </div>
    </div>
  )
}
