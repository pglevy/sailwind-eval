export interface OrderItem {
  id: number
  menuItemId: number
  title: string
  unitPrice: number
  quantity: number
  image: string
}

const orderItems: OrderItem[] = [
  {
    id: 1,
    menuItemId: 1,
    title: 'Edamame',
    unitPrice: 6.99,
    quantity: 1,
    image: '/assets/edamame.jpg',
  },
  {
    id: 2,
    menuItemId: 3,
    title: 'Agedashi Tofu',
    unitPrice: 8.50,
    quantity: 2,
    image: '/assets/agedashi-tofu.jpg',
  },
]

export async function getOrderItems(): Promise<OrderItem[]> {
  return orderItems
}

export async function createOrderItem(data: Omit<OrderItem, 'id'>): Promise<OrderItem> {
  const newItem = { ...data, id: Math.max(0, ...orderItems.map(i => i.id)) + 1 }
  orderItems.push(newItem)
  return newItem
}

export async function updateOrderItem(id: number, data: Partial<OrderItem>): Promise<OrderItem | undefined> {
  const idx = orderItems.findIndex(i => i.id === id)
  if (idx === -1) return undefined
  orderItems[idx] = { ...orderItems[idx], ...data }
  return orderItems[idx]
}
