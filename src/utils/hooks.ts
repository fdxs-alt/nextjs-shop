import useSWR from 'swr'
import { Order } from 'types'

function useOrders() {
  const { data, error } = useSWR<Order[]>('/api/get-orders')

  return {
    orders: data,
    isLoading: !error && !data,
    isError: error,
  }
}

export { useOrders }
