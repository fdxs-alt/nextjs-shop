/* eslint-disable no-case-declarations */
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import { InitalProduct, Product } from 'types'

type TCartStateCtx = {
  products: Product[]
  quantity: number
  cartValue: number
}

const CartStateCtx = createContext<TCartStateCtx>({} as TCartStateCtx)
const CartActionCtx = createContext<Dispatch<Actions>>(() => null)

type Actions =
  | { type: 'ADD_TO_CART'; payload: InitalProduct }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'RESET_CART' }
  | { type: 'GET_ITEMS_FROM_LS'; payload: { products: Product[] } }

const reducer = (state: Product[], action: Actions) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newProd = action.payload
      const isAlreadyInCart = state.find((el) => el.id === newProd.id)

      if (!isAlreadyInCart) {
        return [...state, { ...action.payload, quantity: 1 }]
      } else {
        const newState = state.reduce((acc, prod) => {
          if (prod.id === newProd.id) {
            return [...acc, { ...newProd, quantity: prod.quantity + 1 }]
          } else {
            return [...acc, prod]
          }
        }, [] as Product[])
        return [...newState]
      }
    case 'REMOVE_FROM_CART':
      const newState = state.reduce((acc, prod) => {
        if (prod.id === action.payload.id) {
          return prod.quantity === 1
            ? [...acc]
            : [...acc, { ...prod, quantity: prod.quantity - 1 }]
        } else {
          return [...acc, prod]
        }
      }, [] as Product[])
      return [...newState]
    case 'RESET_CART':
      return [] as Product[]
    case 'GET_ITEMS_FROM_LS':
      return [...state, ...action.payload.products]
    default:
      return [...state]
  }
}

const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [] as Product[])

  useEffect(() => {
    const productsFromLs = window.localStorage.getItem('products')
    if (productsFromLs) {
      dispatch({
        type: 'GET_ITEMS_FROM_LS',
        payload: { products: JSON.parse(productsFromLs) as Product[] },
      })
    }
  }, [])

  useEffect(() => {
    const productsToLs = JSON.stringify(state)
    localStorage.setItem('products', productsToLs)
  }, [state])

  const { cartValue, quantity } = useMemo(() => {
    return state.reduce(
      (acc, el) => ({
        quantity: acc.quantity + el.quantity,
        cartValue: acc.cartValue + el.price * el.quantity,
      }),
      { quantity: 0, cartValue: 0 } as { quantity: number; cartValue: number }
    )
  }, [state])

  return (
    <CartActionCtx.Provider value={dispatch}>
      <CartStateCtx.Provider value={{ products: state, cartValue, quantity }}>
        {children}
      </CartStateCtx.Provider>
    </CartActionCtx.Provider>
  )
}

export default CartProvider

export const useCartState = () => useContext(CartStateCtx)
export const useCartActions = () => useContext(CartActionCtx)
