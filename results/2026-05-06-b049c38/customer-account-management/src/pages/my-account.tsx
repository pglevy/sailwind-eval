import { useEffect, useState } from 'react'
import {
  CardLayout,
  HeadingField,
  RichTextDisplayField,
  TextItem,
  TagField,
  StampField,
  TabsField,
} from '@pglevy/sailwind'
import { getPaymentInfo, getDrivers, getVehicles, type PaymentInfo, type Driver, type Vehicle } from '../db/account'

export default function MyAccount() {
  const [payment, setPayment] = useState<PaymentInfo | undefined>(undefined)
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  useEffect(() => {
    getPaymentInfo().then(setPayment)
    getDrivers().then(setDrivers)
    getVehicles().then(setVehicles)
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFCFF]">
      {/* Top nav bar */}
      <div className="bg-[#1155cc] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/images/icon-app.svg" alt="InsureCorp" className="h-5 w-5 invert" />
          <span className="text-white font-semibold text-sm tracking-wide">INSURECORP</span>
        </div>
        <div className="flex items-center gap-3">
          <img src="/images/icon-appian-header.png" alt="apps" className="h-5 w-5 opacity-80" />
          <img src="/images/icon-appian-header.png" alt="user" className="h-8 w-8 rounded-full object-cover" />
          <span className="text-white text-sm">appian</span>
        </div>
      </div>

      {/* Hero header */}
      <div className="bg-[#1155cc] px-8 pt-6 pb-8">
        <HeadingField
          text="My Account"
          size="LARGE_PLUS"
          fontWeight="BOLD"
          color="#ffffff"
          headingTag="H1"
          marginBelow="NONE"
        />
      </div>

      {/* Tabs + content */}
      <div className="px-4 pt-0">
        <TabsField
          tabs={[
            {
              value: 'overview',
              label: 'Overview',
              content: (
                <div className="flex gap-6 pt-4 flex-col lg:flex-row">
                  {/* Left column */}
                  <div className="lg:w-[420px] flex-shrink-0 space-y-6">
                    {/* Payment section */}
                    <div>
                      <HeadingField text="Payment" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" headingTag="H2" marginBelow="STANDARD" />
                      <CardLayout padding="STANDARD" showShadow={true} showBorder={false} style="NONE" height="AUTO">
                        {/* Next Payment */}
                        <div className="border-b border-gray-200 pb-4 mb-4">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Next Payment</p>
                          <div className="flex items-center justify-between">
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[
                                <TextItem key="amount" text={payment?.nextPaymentAmount ?? ''} size="MEDIUM_PLUS" style="STRONG" />
                              ]}
                              marginBelow="NONE"
                            />
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[
                                <TextItem key="due" text={payment?.nextPaymentDue ?? ''} size="MEDIUM_PLUS" />
                              ]}
                              marginBelow="NONE"
                            />
                          </div>
                        </div>

                        {/* Payment Source */}
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Payment Source</p>
                          <div className="flex items-center justify-between mb-2">
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[
                                <TextItem key="source" text={payment?.paymentSource ?? ''} size="MEDIUM" />
                              ]}
                              marginBelow="NONE"
                            />
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[
                                <TextItem key="edit" text="Edit" size="MEDIUM" color="ACCENT" link={() => {}} linkStyle="STANDALONE" />
                              ]}
                              marginBelow="NONE"
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <TagField
                              labelPosition="COLLAPSED"
                              tags={[{ text: 'AUTOPAY', backgroundColor: '#1155cc', textColor: '#ffffff' }]}
                              marginBelow="NONE"
                            />
                            <RichTextDisplayField
                              labelPosition="COLLAPSED"
                              value={[
                                <TextItem key="desc" text={payment?.autopayDescription ?? ''} color="SECONDARY" size="STANDARD" />
                              ]}
                              marginBelow="NONE"
                            />
                          </div>
                        </div>
                      </CardLayout>
                    </div>

                    {/* Insured Drivers section */}
                    <div>
                      <HeadingField text="Insured Drivers" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" headingTag="H2" marginBelow="STANDARD" />
                      <CardLayout padding="STANDARD" showShadow={true} showBorder={false} style="NONE" height="AUTO">
                        {drivers.map((driver, index) => (
                          <div
                            key={driver.id}
                            className={index < drivers.length - 1 ? 'border-b border-gray-200 pb-4 mb-4' : ''}
                          >
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{driver.relationship}</p>
                            <div className="flex items-center gap-3">
                              <StampField
                                labelPosition="COLLAPSED"
                                text={driver.initial}
                                backgroundColor={driver.avatarColor}
                                contentColor="#ffffff"
                                size="SMALL"
                                marginBelow="NONE"
                              />
                              <div className="flex-1">
                                <RichTextDisplayField
                                  labelPosition="COLLAPSED"
                                  value={[
                                    <TextItem key="name" text={driver.name} size="MEDIUM_PLUS" style="STRONG" />
                                  ]}
                                  marginBelow="NONE"
                                />
                                <RichTextDisplayField
                                  labelPosition="COLLAPSED"
                                  value={[
                                    <TextItem key="desc" text={driver.description} size="STANDARD" color="SECONDARY" />
                                  ]}
                                  marginBelow="NONE"
                                />
                              </div>
                              <RichTextDisplayField
                                labelPosition="COLLAPSED"
                                value={[
                                  <TextItem key="edit" text="Edit" size="MEDIUM" color="ACCENT" link={() => {}} linkStyle="STANDALONE" />
                                ]}
                                marginBelow="NONE"
                              />
                            </div>
                          </div>
                        ))}
                      </CardLayout>
                    </div>
                  </div>

                  {/* Right column — Vehicles & Coverage */}
                  <div className="flex-1">
                    <HeadingField text="Vehicles & Coverage" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" headingTag="H2" marginBelow="STANDARD" />
                    <CardLayout padding="STANDARD" showShadow={true} showBorder={false} style="NONE" height="AUTO">
                      {vehicles.map((vehicle, vIndex) => (
                        <div
                          key={vehicle.id}
                          className={vIndex < vehicles.length - 1 ? 'border-b border-gray-200 pb-6 mb-6' : ''}
                        >
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">{vehicle.label}</p>
                          <div className="flex gap-6">
                            {/* Vehicle name + edit */}
                            <div className="w-40 flex-shrink-0">
                              <RichTextDisplayField
                                labelPosition="COLLAPSED"
                                value={[
                                  <TextItem
                                    key="name"
                                    text={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                                    size="MEDIUM_PLUS"
                                    style="STRONG"
                                  />
                                ]}
                                marginBelow="EVEN_LESS"
                              />
                              <RichTextDisplayField
                                labelPosition="COLLAPSED"
                                value={[
                                  <TextItem key="edit" text="Edit" size="MEDIUM" color="ACCENT" link={() => {}} linkStyle="STANDALONE" />
                                ]}
                                marginBelow="NONE"
                              />
                            </div>

                            {/* Coverage details */}
                            <div className="flex-1 space-y-3">
                              {vehicle.coverages.map((coverage) => (
                                <div key={coverage.type}>
                                  <p className="text-sm font-semibold text-gray-800">{coverage.type}</p>
                                  {coverage.details.map((detail, i) => (
                                    <p key={i} className="text-sm text-gray-600">{detail}</p>
                                  ))}
                                </div>
                              ))}
                              <RichTextDisplayField
                                labelPosition="COLLAPSED"
                                value={[
                                  <TextItem key="more" text="Show More" size="MEDIUM" color="ACCENT" link={() => {}} linkStyle="STANDALONE" />
                                ]}
                                marginBelow="NONE"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardLayout>
                  </div>
                </div>
              ),
            },
            { value: 'claims', label: 'Claims', content: <div className="py-8 text-gray-500">Claims content coming soon.</div> },
            { value: 'preferences', label: 'Preferences', content: <div className="py-8 text-gray-500">Preferences content coming soon.</div> },
          ]}
          defaultValue="overview"
          variant="UNDERLINE"
        />
      </div>
    </div>
  )
}
