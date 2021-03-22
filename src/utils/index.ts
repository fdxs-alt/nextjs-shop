import { Product } from './../types/index.d'
import { InitalProduct, IProduct } from 'types'
import { useOrders } from './hooks'

const prepareProduct = ({ id, price, name, image, platform }: IProduct) => {
  return {
    id,
    price,
    name,
    image,
    platform,
  }
}

const addToCart = (
  product: IProduct | Product
): { type: 'ADD_TO_CART'; payload: InitalProduct } => {
  return {
    type: 'ADD_TO_CART',
    payload: Object.keys(product).includes('description')
      ? prepareProduct(product as IProduct)
      : product,
  }
}

const removeFromCart = (
  product: Product | IProduct
): { type: 'REMOVE_FROM_CART'; payload: { id: string } } => {
  return { type: 'REMOVE_FROM_CART', payload: { id: product.id } }
}

const resetCart = (): { type: 'RESET_CART' } => {
  return { type: 'RESET_CART' }
}

const fetchBuyIntent = async (cartValue: number) => {
  const data = await window.fetch('/api/create-intent', {
    method: 'POST',
    body: JSON.stringify({ total: cartValue }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return data
}

export { addToCart, removeFromCart, resetCart, fetchBuyIntent, useOrders }
