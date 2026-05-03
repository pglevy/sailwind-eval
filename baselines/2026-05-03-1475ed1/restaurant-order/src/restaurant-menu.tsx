import { useState } from 'react'
import {
  HeadingField,
  RichTextDisplayField,
  TextItem,
  CardLayout,
  ImageField,
  TagField,
  ButtonArrayLayout,
  TabsField,
} from '@pglevy/sailwind'

// ─── Menu item data ───────────────────────────────────────────────────────────

interface MenuItem {
  id: number
  title: string
  description: string
  price: string
  image: string
}

const appetizers: MenuItem[] = [
  {
    id: 1,
    title: 'Edamame',
    description:
      'Soybeans, steamed tender right in their pods and finished with a light, savory sprinkle of sea salt.',
    price: '$6.99',
    image: '/edamame.jpg',
  },
  {
    id: 2,
    title: 'Gyoza',
    description:
      'Pan-fried pork and vegetable dumplings served with a soy-vinegar dipping sauce.',
    price: '$8.00',
    image: '/gyoza.jpg',
  },
  {
    id: 3,
    title: 'Agedashi Tofu',
    description:
      'Lightly fried tofu cubes served in a warm, savory dashi broth with green onions.',
    price: '$8.50',
    image: '/agedashi-tofu.jpg',
  },
  {
    id: 4,
    title: 'Seaweed Salad',
    description:
      'Chilled and seasoned mixed seaweed with sesame seeds and a light vinegar dressing.',
    price: '$7.00',
    image: '/seaweed-salad.jpg',
  },
  {
    id: 5,
    title: 'Chicken Karaage',
    description:
      'Bite-sized, soy-marinated chicken, lightly battered and fried to a crispy golden brown.',
    price: '$7.50',
    image: '/chicken-karaage.jpg',
  },
  {
    id: 6,
    title: 'Takoyaki',
    description:
      'Fried octopus-filled batter balls (5 pieces), drizzled with savory sauce, mayo, and bonito flakes.',
    price: '$9.00',
    image: '/takoyaki.jpg',
  },
]

// ─── Order item data ──────────────────────────────────────────────────────────

interface OrderItem {
  id: number
  title: string
  unitPrice: string
  quantity: number
  lineTotal: string
  image: string
}

const initialOrderItems: OrderItem[] = [
  {
    id: 1,
    title: 'Edamame',
    unitPrice: '$6.99',
    quantity: 1,
    lineTotal: '$6.99',
    image: '/edamame.jpg',
  },
  {
    id: 3,
    title: 'Agedashi Tofu',
    unitPrice: '$8.50',
    quantity: 2,
    lineTotal: '$17.00',
    image: '/agedashi-tofu.jpg',
  },
]

// ─── Menu card ────────────────────────────────────────────────────────────────

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <CardLayout padding="STANDARD" showShadow={true} showBorder={false} shape="ROUNDED">
      <ImageField
        labelPosition="COLLAPSED"
        images={[{ document: item.image, altText: item.title }]}
        size="FIT"
        marginBelow="LESS"
        className="rounded-md overflow-hidden"
      />
      <HeadingField text={item.title} size="MEDIUM" marginBelow="EVEN_LESS" />
      <RichTextDisplayField
        labelPosition="COLLAPSED"
        value={[<TextItem key="desc" text={item.description} color="SECONDARY" size="STANDARD" />]}
        marginBelow="LESS"
      />
      {/* Price + add button row */}
      <div className="flex items-center justify-between mt-auto">
        <RichTextDisplayField
          labelPosition="COLLAPSED"
          value={[<TextItem key="price" text={item.price} size="MEDIUM_PLUS" style="STRONG" />]}
          marginBelow="NONE"
        />
        <ButtonArrayLayout
          buttons={[{ icon: 'plus', style: 'OUTLINE', size: 'STANDARD' }]}
          marginBelow="NONE"
        />
      </div>
    </CardLayout>
  )
}

// ─── Order summary panel ──────────────────────────────────────────────────────

type DineMode = 'Dine In' | 'To Go' | 'Delivery'

function OrderPanel() {
  const [dineMode, setDineMode] = useState<DineMode>('Dine In')
  const dineModes: DineMode[] = ['Dine In', 'To Go', 'Delivery']

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <HeadingField text="Order #12138" size="MEDIUM" fontWeight="SEMI_BOLD" marginBelow="NONE" />

      {/* Dine mode selector */}
      <div className="flex gap-2">
        {dineModes.map((mode) => (
          <button
            key={mode}
            onClick={() => setDineMode(mode)}
            className={`px-3 py-1 rounded text-sm font-medium border transition-colors ${
              dineMode === mode
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Column headers */}
      <div className="flex items-center text-sm text-gray-500 border-b pb-2">
        <span className="flex-1">Item</span>
        <span className="w-16 text-right">Quantity</span>
        <span className="w-16 text-right">Price</span>
      </div>

      {/* Order items */}
      <div className="flex flex-col gap-4 flex-1">
        {initialOrderItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {/* Avatar image */}
            <div className="shrink-0">
              <ImageField
                labelPosition="COLLAPSED"
                images={[{ document: item.image, altText: item.title }]}
                size="SMALL_PLUS"
                style="AVATAR"
                marginBelow="NONE"
              />
            </div>
            {/* Name + unit price */}
            <div className="flex-1 min-w-0">
              <HeadingField text={item.title} size="SMALL" marginBelow="NONE" />
              <RichTextDisplayField
                labelPosition="COLLAPSED"
                value={[<TextItem key="up" text={item.unitPrice} color="SECONDARY" size="STANDARD" />]}
                marginBelow="NONE"
              />
            </div>
            {/* Quantity */}
            <div className="w-16 text-right">
              <RichTextDisplayField
                labelPosition="COLLAPSED"
                align="RIGHT"
                value={[<TextItem key="qty" text={String(item.quantity)} size="MEDIUM" />]}
                marginBelow="NONE"
              />
            </div>
            {/* Line total */}
            <div className="w-16 text-right">
              <RichTextDisplayField
                labelPosition="COLLAPSED"
                align="RIGHT"
                value={[<TextItem key="lt" text={item.lineTotal} size="MEDIUM" />]}
                marginBelow="NONE"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t pt-4 flex flex-col gap-1">
        {/* Sub total */}
        <div className="flex justify-between">
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            value={[<TextItem key="st-l" text="Sub total" size="STANDARD" />]}
            marginBelow="NONE"
          />
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            align="RIGHT"
            value={[<TextItem key="st-v" text="$23.99" size="STANDARD" />]}
            marginBelow="NONE"
          />
        </div>
        {/* Discount */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <RichTextDisplayField
              labelPosition="COLLAPSED"
              value={[<TextItem key="disc-l" text="Discount" size="STANDARD" />]}
              marginBelow="NONE"
            />
            <TagField
              tags={[{ text: '5% off', backgroundColor: 'ACCENT' }]}
              size="SMALL"
              marginBelow="NONE"
            />
          </div>
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            align="RIGHT"
            value={[<TextItem key="disc-v" text="-$1.19" size="STANDARD" />]}
            marginBelow="NONE"
          />
        </div>
        {/* Tip */}
        <div className="flex justify-between">
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            value={[<TextItem key="tip-l" text="Tip" size="STANDARD" />]}
            marginBelow="NONE"
          />
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            align="RIGHT"
            value={[<TextItem key="tip-v" text="$5.00" size="STANDARD" />]}
            marginBelow="NONE"
          />
        </div>
        {/* Tax */}
        <div className="flex justify-between">
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            value={[<TextItem key="tax-l" text="Tax" size="STANDARD" />]}
            marginBelow="NONE"
          />
          <RichTextDisplayField
            labelPosition="COLLAPSED"
            align="RIGHT"
            value={[<TextItem key="tax-v" text="$1.67" size="STANDARD" />]}
            marginBelow="NONE"
          />
        </div>
      </div>

      {/* Total */}
      <div className="border-t pt-4 flex justify-between items-center">
        <RichTextDisplayField
          labelPosition="COLLAPSED"
          value={[<TextItem key="tot-l" text="Total" size="MEDIUM_PLUS" />]}
          marginBelow="NONE"
        />
        <RichTextDisplayField
          labelPosition="COLLAPSED"
          align="RIGHT"
          value={[<TextItem key="tot-v" text="$29.47" size="MEDIUM_PLUS" style="STRONG" />]}
          marginBelow="NONE"
        />
      </div>

      {/* CTA */}
      <ButtonArrayLayout
        buttons={[{
          label: 'Continue to Payment',
          icon: 'credit-card',
          style: 'SOLID',
          color: 'ACCENT',
          width: 'FILL',
        }]}
        align="CENTER"
        marginBelow="NONE"
      />
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function RestaurantMenu() {
  const menuTabs = [
    {
      value: 'appetizers',
      label: 'Appetizers',
      content: (
        <div className="grid grid-cols-2 gap-4 pt-4">
          {appetizers.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ),
    },
    { value: 'sushi', label: 'Sushi', content: <div className="pt-4 text-gray-400 text-sm">No items yet.</div> },
    { value: 'rice-bowls', label: 'Rice Bowls', content: <div className="pt-4 text-gray-400 text-sm">No items yet.</div> },
    { value: 'noodles', label: 'Noodles', content: <div className="pt-4 text-gray-400 text-sm">No items yet.</div> },
    { value: 'desserts', label: 'Desserts', content: <div className="pt-4 text-gray-400 text-sm">No items yet.</div> },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left: menu */}
      <div className="flex-1 px-8 py-8 overflow-y-auto">
        <HeadingField text="Menu" size="LARGE" fontWeight="SEMI_BOLD" marginBelow="NONE" />
        <RichTextDisplayField
          labelPosition="COLLAPSED"
          value={[<TextItem key="date" text="Tuesday, 24 Feb 2025" size="MEDIUM" color="SECONDARY" />]}
          marginBelow="STANDARD"
        />
        <TabsField tabs={menuTabs} defaultValue="appetizers" variant="UNDERLINE" />
      </div>

      {/* Right: order panel */}
      <div className="w-96 bg-white border-l border-gray-200 px-6 py-8 flex flex-col">
        <OrderPanel />
      </div>
    </div>
  )
}
