import { z } from 'zod'

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  currentPrice: z.coerce.number().min(0, 'Current price must be positive'),
  oldPrice: z.coerce.number().min(0, 'Old price must be positive').optional(),
  type: z.string().min(1, 'Type is required'),
  icons: z.string().default(""),
  imagePath: z.string().min(1, 'Image path is required'),
  isAvailable: z.boolean().default(true),
})

export type ProductInput = z.infer<typeof ProductSchema>

export const MapLocationSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  address: z.string().min(1, 'Address is required'),
  isVisible: z.boolean().default(true),
})

export type MapLocationInput = z.infer<typeof MapLocationSchema>
