export interface HealthSummaryItem {
  id: number
  icon: string
  label: string
  secondary: string
}

const healthSummaryItems: HealthSummaryItem[] = [
  {
    id: 1,
    icon: 'dna',
    label: 'Conditions/Diagnoses',
    secondary: 'Generalized Anxiety Disorder (GAD), Vita...',
  },
  {
    id: 2,
    icon: 'viruses',
    label: 'Allergies',
    secondary: 'Penicillin (Hives/Anaphylaxis)',
  },
  {
    id: 3,
    icon: 'prescription',
    label: 'Medications',
    secondary: 'Fluoxetine 20 mg; Norethindrone/Ethinyl ...',
  },
  {
    id: 4,
    icon: 'syringe',
    label: 'Immunizations',
    secondary: 'COVID-19, HPV (Gardasil 9), Tdap',
  },
  {
    id: 5,
    icon: 'user-md',
    label: 'Procedures and Surgeries',
    secondary: 'Wisdom Teeth Extraction, Tonsillectomy',
  },
  {
    id: 6,
    icon: 'glass-cheers',
    label: 'Lifestyle',
    secondary: 'Tobacco: Never Smoker; Alcohol: Socially',
  },
  {
    id: 7,
    icon: 'vial',
    label: 'Lab Results',
    secondary: 'No results to review',
  },
]

export async function getHealthSummaryItems(): Promise<HealthSummaryItem[]> {
  return healthSummaryItems
}

export async function getHealthSummaryItem(id: number): Promise<HealthSummaryItem | undefined> {
  return healthSummaryItems.find(h => h.id === id)
}

export async function updateHealthSummaryItem(id: number, data: Partial<HealthSummaryItem>): Promise<HealthSummaryItem | undefined> {
  const idx = healthSummaryItems.findIndex(h => h.id === id)
  if (idx === -1) return undefined
  healthSummaryItems[idx] = { ...healthSummaryItems[idx], ...data }
  return healthSummaryItems[idx]
}
