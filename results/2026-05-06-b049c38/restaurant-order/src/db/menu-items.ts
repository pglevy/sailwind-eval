export interface MenuItem {
  id: number
  title: string
  description: string
  price: string
  priceValue: number
  image: string
  category: string
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: 'Edamame',
    description: 'Soybeans, steamed tender right in their pods and finished with a light, savory sprinkle of sea salt.',
    price: '$6.99',
    priceValue: 6.99,
    image: '/assets/edamame.jpg',
    category: 'Appetizers',
  },
  {
    id: 2,
    title: 'Gyoza',
    description: 'Pan-fried pork and vegetable dumplings served with a soy-vinegar dipping sauce.',
    price: '$8.00',
    priceValue: 8.00,
    image: '/assets/gyoza.jpg',
    category: 'Appetizers',
  },
  {
    id: 3,
    title: 'Agedashi Tofu',
    description: 'Lightly fried tofu cubes served in a warm, savory dashi broth with green onions.',
    price: '$8.50',
    priceValue: 8.50,
    image: '/assets/agedashi-tofu.jpg',
    category: 'Appetizers',
  },
  {
    id: 4,
    title: 'Seaweed Salad',
    description: 'Chilled and seasoned mixed seaweed with sesame seeds and a light vinegar dressing.',
    price: '$7.00',
    priceValue: 7.00,
    image: '/assets/seaweed-salad.jpg',
    category: 'Appetizers',
  },
  {
    id: 5,
    title: 'Chicken Karaage',
    description: 'Bite-sized, soy-marinated chicken, lightly battered and fried to a crispy golden brown.',
    price: '$7.50',
    priceValue: 7.50,
    image: '/assets/chicken-karaage.jpg',
    category: 'Appetizers',
  },
  {
    id: 6,
    title: 'Takoyaki',
    description: 'Fried octopus-filled batter balls (5 pieces), drizzled with savory sauce, mayo, and bonito flakes.',
    price: '$9.00',
    priceValue: 9.00,
    image: '/assets/takoyaki.jpg',
    category: 'Appetizers',
  },
]

export async function getMenuItems(): Promise<MenuItem[]> {
  return menuItems
}

export async function getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
  return menuItems.filter(item => item.category === category)
}

export async function getMenuItem(id: number): Promise<MenuItem | undefined> {
  return menuItems.find(item => item.id === id)
}
