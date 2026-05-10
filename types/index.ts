export interface GrowthEntry {
  date: string
  weight: string
  length: string
  notes: string
}

export interface VideoNote {
  id: string
  title: string
  url: string
  date: string
  description: string
}

export interface Axolotl {
  id: string
  name: string
  morph: string
  status: 'Available' | 'Reserved'
  age: string
  weight: string
  length: string
  description: string
  buyerName?: string
  buyerEmail?: string
  reservedDate?: string
  imageUrl?: string
  imageColor: string
  videoNotes: VideoNote[]
  growthTimeline: GrowthEntry[]
}
