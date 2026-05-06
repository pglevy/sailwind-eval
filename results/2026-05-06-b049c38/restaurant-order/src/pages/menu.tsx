import { useEffect, useState } from 'react'
import {
  HeadingField,
  RichTextDisplayField,
  TextItem,
  CardLayout,
  ButtonWidget,
  ButtonArrayLayout,
  TagField,
} from '@pglevy/sailwind'
import { getMenuItemsByCategory, type MenuItem } from '../db/menu-items'
import { getOrderItems, type OrderItem } from '../db/order-items'

const TABS = ['Appetizers', 'Sushi', 'Rice Bowls', 'Noodles', 'Desserts']
const ORDER_TABS = ['Dine In', 'To Go', 'Delivery']

const DISCOUNT_RATE = 0.05
const TIP = 5.0
const TAX_RATE = 0.07

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [activeCategory, setActiveCategory] = useState('Appetizers')
  const [activeOrderTab, setActiveOrderTab] = useState('Dine In')

  useEffect(() => {
    getMenuItemsByCategory(activeCategory).then(setMenuItems)
  }, [activeCategory])

  useEffect(() => {
    getOrderItems().then(setOrderItems)
  }, [])

  const subtotal = orderItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const discount = subtotal * DISCOUNT_RATE
  const tax = (subtotal - discount + TIP) * TAX_RATE
  const total = subtotal - discount + TIP + tax

  const fmt = (n: number) =>
    n < 0 ? `-$${Math.abs(n).toFixed(2)}` : `$${n.toFixed(2)}`

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left: Menu */}
      <div className="flex-1 p-8 overflow-y-auto">
        <HeadingField text="Menu" size="LARGE" fontWeight="SEMI_BOLD" marginBelow="EVEN_LESS" />
        <RichTextDisplayField
          value={[<TextItem key="date" text="Tuesday, 24 Feb 2025" size="MEDIUM" color="SECONDARY" />]}
          marginBelow="STANDARD"
        />

        {/* Category tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-6">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`pb-3 text-sm font-medium transition-colors ${
                  activeCategory === tab
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
          {menuItems.map(item => (
            <CardLayout key={item.id} showShadow={true} showBorder={false} padding="STANDARD" shape="ROUNDED">
              <div className="grid grid-rows-[auto_auto_1fr_auto]">
                <div className="w-full aspect-[4/3] overflow-hidden rounded-md mb-2">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <HeadingField text={item.title} size="MEDIUM" marginBelow="EVEN_LESS" />
                <RichTextDisplayField
                  labelPosition="COLLAPSED"
                  value={[<TextItem key="desc" text={item.description} color="SECONDARY" size="STANDARD" />]}
                  marginBelow="NONE"
                />
                <div className="flex items-center justify-between pt-3">
                  <RichTextDisplayField
                    labelPosition="COLLAPSED"
                    value={[<TextItem key="price" text={item.price} size="MEDIUM_PLUS" style="STRONG" />]}
                    marginBelow="NONE"
                  />
                  <ButtonWidget
                    icon="plus"
                    style="OUTLINE"
                  />
                </div>
              </div>
            </CardLayout>
          ))}
        </div>
      </div>

      {/* Right: Order panel */}
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col overflow-y-auto">
        <HeadingField text="Order #12138" size="MEDIUM_PLUS" fontWeight="SEMI_BOLD" marginBelow="LESS" />

        {/* Order type tabs */}
        <div className="flex gap-1 mb-6">
          {ORDER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveOrderTab(tab)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                activeOrderTab === tab
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Column headers */}
        <div className="flex text-sm text-gray-500 mb-1">
          <span className="flex-1">Item</span>
          <span className="w-12 text-right">Quantity</span>
          <span className="w-16 text-right">Price</span>
        </div>
        <hr className="border-gray-200 mb-2" />

        {/* Order items */}
        <div className="flex-1">
          {orderItems.map(item => (
            <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
              <div className="flex-1 flex items-center gap-2 min-w-0">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <HeadingField text={item.title} size="SMALL" marginBelow="EVEN_LESS" />
                  <RichTextDisplayField
                    labelPosition="COLLAPSED"
                    value={[<TextItem key="up" text={fmt(item.unitPrice)} color="SECONDARY" size="STANDARD" />]}
                    marginBelow="NONE"
                  />
                </div>
              </div>
              <span className="w-12 text-right text-sm">{item.quantity}</span>
              <span className="w-16 text-right text-sm font-medium">{fmt(item.unitPrice * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Sub total</span>
            <span>{fmt(subtotal)}</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Discount</span>
              <TagField
                labelPosition="COLLAPSED"
                tags={[{ text: '5% off', backgroundColor: 'ACCENT' }]}
                marginBelow="NONE"
              />
            </div>
            <span className="text-red-600">{fmt(-discount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tip</span>
            <span>{fmt(TIP)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span>{fmt(tax)}</span>
          </div>
        </div>

        <hr className="border-gray-200 my-4" />

        <div className="flex justify-between items-center mb-6">
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            value={[<TextItem key="total-label" text="Total" size="MEDIUM_PLUS" />]}
            marginBelow="NONE"
          />
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            value={[<TextItem key="total-val" text={fmt(total)} size="MEDIUM_PLUS" style="STRONG" />]}
            marginBelow="NONE"
          />
        </div>

        <ButtonArrayLayout
          buttons={[
            {
              label: 'Continue to Payment',
              width: 'FILL',
              icon: 'credit-card',
              style: 'SOLID',
            },
          ]}
          marginBelow="NONE"
          align="CENTER"
        />
      </div>
    </div>
  )
}
