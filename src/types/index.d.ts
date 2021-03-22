export interface ResponsiveImage {
  src: string
  srcSet: string
  webpSrcSet: string
  sizes: string
  width: number
  height: number
  aspectRatio: number
  base64: string
}

export interface Image {
  responsiveImage: ResponsiveImage
}

export interface IProduct {
  id: string
  date: string
  description: string
  price: number
  platform: string
  category: string
  name: string
  image: Image
}

type InitalProduct = {
  id: string
  price: number
  name: string
  image: Image
  platform: string
}

export type Product = {
  id: string
  price: number
  name: string
  image: Image
  platform: string
  quantity: number
}

export interface Order {
  name: string
  surname: string
  email: string
  country: string
  street: string
  city: string
  products: Product[]
  cartValue: number
  userId: string
  _id: string
  date: string
}
