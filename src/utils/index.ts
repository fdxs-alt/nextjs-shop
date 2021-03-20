import { Product } from './../types/index.d'
import { InitalProduct, IProduct } from 'types'

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

export { addToCart, removeFromCart, resetCart }
