import { useEffect, useState } from 'react'
import {
  CardLayout,
  HeadingField,
  RichTextDisplayField,
  TagField,
  StampField,
  TabsField,
  TextItem,
} from '@pglevy/sailwind'
import { getPaymentInfo, getDrivers, getVehicles } from '../db/account'
import type { PaymentInfo, Driver, Vehicle } from '../db/account'

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
      {text}
    </p>
  )
}

function Divider() {
  return <hr className="border-gray-200 my-4" />
}

// ─── Payment Card ─────────────────────────────────────────────────────────────

function PaymentCard({ payment }: { payment: PaymentInfo }) {
  return (
    <CardLayout padding="STANDARD" showShadow={true} showBorder={false} marginBelow="MORE">
      {/* Next Payment */}
      <SectionLabel text="NEXT PAYMENT" />
      <div className="flex items-center justify-between mb-1">
        <span className="text-2xl font-bold text-gray-900">{payment.nextPaymentAmount}</span>
        <span className="text-lg text-gray-800">{payment.nextPaymentDue}</span>
      </div>
      <Divider />

      {/* Payment Source */}
      <SectionLabel text="PAYMENT SOURCE" />
      <div className="flex items-center justify-between mb-2">
        <span className="text-base text-gray-800">{payment.paymentSource}</span>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Edit</a>
      </div>
      {payment.isAutopay && (
        <div className="flex items-center gap-2">
          <TagField
            tags={[{ text: 'AUTOPAY', backgroundColor: '#1155cc', textColor: '#ffffff' }]}
            size="SMALL"
            marginBelow="NONE"
          />
          <span className="text-sm text-gray-500">{payment.autopayDescription}</span>
        </div>
      )}
    </CardLayout>
  )
}

// ─── Insured Drivers Card ─────────────────────────────────────────────────────

function DriversCard({ drivers }: { drivers: Driver[] }) {
  return (
    <CardLayout padding="STANDARD" showShadow={true} showBorder={false} marginBelow="MORE">
      {drivers.map((driver, idx) => (
        <div key={driver.id}>
          <SectionLabel text={driver.role} />
          <div className="flex items-center gap-3">
            <StampField
              text={driver.initial}
              backgroundColor={driver.color}
              contentColor="#ffffff"
              size="SMALL"
              labelPosition="COLLAPSED"
              marginBelow="NONE"
            />
            <div className="flex-1">
              <RichTextDisplayField
                labelPosition="COLLAPSED"
                marginBelow="NONE"
                value={[
                  <TextItem key="name" text={driver.name} size="MEDIUM" />,
                ]}
              />
              <RichTextDisplayField
                labelPosition="COLLAPSED"
                marginBelow="NONE"
                value={[
                  <TextItem key="desc" text={driver.description} color="SECONDARY" size="STANDARD" />,
                ]}
              />
            </div>
            <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Edit</a>
          </div>
          {idx < drivers.length - 1 && <Divider />}
        </div>
      ))}
    </CardLayout>
  )
}

// ─── Vehicle Coverage Card ────────────────────────────────────────────────────

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <div className="mb-0">
      <SectionLabel text={vehicle.label} />
      <div className="flex gap-8">
        {/* Vehicle name + Edit */}
        <div className="w-40 shrink-0">
          <p className="text-lg font-bold text-gray-900 leading-tight">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
          <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Edit</a>
        </div>
        {/* Coverage details */}
        <div className="flex-1 space-y-3">
          {vehicle.coverages.map((cov) => (
            <div key={cov.label}>
              <p className="text-sm font-bold text-gray-900">{cov.label}</p>
              {cov.details.map((d) => (
                <p key={d} className="text-sm text-gray-700">{d}</p>
              ))}
            </div>
          ))}
          <a href="#" className="text-blue-600 text-sm font-medium hover:underline block">Show More</a>
        </div>
      </div>
    </div>
  )
}

function VehiclesCard({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <CardLayout padding="STANDARD" showShadow={true} showBorder={true} marginBelow="MORE">
      {vehicles.map((vehicle, idx) => (
        <div key={vehicle.id}>
          <VehicleCard vehicle={vehicle} />
          {idx < vehicles.length - 1 && <Divider />}
        </div>
      ))}
    </CardLayout>
  )
}

// ─── Overview Tab Content ─────────────────────────────────────────────────────

function OverviewContent({
  payment,
  drivers,
  vehicles,
}: {
  payment: PaymentInfo | null
  drivers: Driver[]
  vehicles: Vehicle[]
}) {
  return (
    <div className="flex gap-8 pt-4">
      {/* Left column */}
      <div className="w-[380px] shrink-0">
        <HeadingField text="Payment" size="MEDIUM" headingTag="H2" marginBelow="STANDARD" />
        {payment && <PaymentCard payment={payment} />}

        <HeadingField text="Insured Drivers" size="MEDIUM" headingTag="H2" marginBelow="STANDARD" />
        <DriversCard drivers={drivers} />
      </div>

      {/* Right column */}
      <div className="flex-1 min-w-0">
        <HeadingField text="Vehicles & Coverage" size="MEDIUM" headingTag="H2" marginBelow="STANDARD" />
        <VehiclesCard vehicles={vehicles} />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MyAccount() {
  const [payment, setPayment] = useState<PaymentInfo | null>(null)
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    getPaymentInfo().then(setPayment)
    getDrivers().then(setDrivers)
    getVehicles().then(setVehicles)
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFCFF]">
      {/* Blue header banner */}
      <div className="bg-[#1155cc] px-8 py-6">
        <HeadingField
          text="My Account"
          size="LARGE_PLUS"
          fontWeight="BOLD"
          color="#ffffff"
          headingTag="H1"
          marginBelow="NONE"
        />
      </div>

      {/* Tab content */}
      <div className="px-4">
        <TabsField
          tabs={[
            {
              value: 'overview',
              label: 'Overview',
              content: (
                <OverviewContent
                  payment={payment}
                  drivers={drivers}
                  vehicles={vehicles}
                />
              ),
            },
            {
              value: 'claims',
              label: 'Claims',
              content: (
                <div className="py-8 text-gray-500">Claims content coming soon.</div>
              ),
            },
            {
              value: 'preferences',
              label: 'Preferences',
              content: (
                <div className="py-8 text-gray-500">Preferences content coming soon.</div>
              ),
            },
          ]}
          defaultValue="overview"
          variant="UNDERLINE"
          marginBelow="NONE"
        />
      </div>
    </div>
  )
}
