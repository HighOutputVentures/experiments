import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState
} from 'react'
import constants from './constants'
import { IProduct } from './types'

interface Item {
  product: IProduct
  quantity: number
}

export interface ICartContext {
  items: Item[]
  add(product: IProduct, quantity: number): void
  remove(product: IProduct): void
  clear(): void
}

export const CartContext = createContext<ICartContext>({
  items: [],
  add() {},
  remove() {},
  clear() {}
})

const getInitialState = (): ICartContext['items'] => {
  if (typeof window === 'undefined') return []
  const raw = localStorage.getItem(constants.LOCALSTORAGE_CART_ID)
  return raw ? JSON.parse(raw) : []
}

export function CartProvider({ children }: PropsWithChildren<{}>) {
  const [items, setItems] = useState(getInitialState)

  const add: ICartContext['add'] = useCallback(
    (product, quantity) => {
      const index = items.findIndex((o) => o.product.id === product.id)

      if (index < 0) {
        const newItems = [{ product, quantity }, ...items]
        setItems(newItems)
        localStorage.setItem(
          constants.LOCALSTORAGE_CART_ID,
          JSON.stringify(newItems)
        )
        return
      }

      const newItem = {
        product,
        quantity: quantity + items[index].quantity
      }

      const newItems = [
        newItem,
        ...items.filter((...args) => args[1] !== index)
      ]
      setItems(newItems)
      localStorage.setItem(
        constants.LOCALSTORAGE_CART_ID,
        JSON.stringify(newItems)
      )
    },
    [items]
  )

  const remove: ICartContext['remove'] = useCallback(
    ({ id }) => {
      const newItems = items.filter(({ product }) => product.id === id)
      setItems(newItems)
      localStorage.setItem(
        constants.LOCALSTORAGE_CART_ID,
        JSON.stringify(newItems)
      )
    },
    [items]
  )

  const clear = useCallback(() => {
    setItems([])
    localStorage.removeItem(constants.LOCALSTORAGE_CART_ID)
  }, [])

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        clear
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export type UseCartContext = ICartContext

export function useCartContext(): UseCartContext {
  return useContext(CartContext)
}

export function withCartContext<T extends { [key: string]: unknown } = {}>(
  Component: (props: T) => JSX.Element
) {
  return function ComponentWithAuthContext(props: T) {
    return (
      <CartProvider>
        <Component {...props} />
      </CartProvider>
    )
  }
}
