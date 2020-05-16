import { BasketActionTypes, IBasketAdd } from './BasketTypes'
import { IProduct } from '../pages/Products/ProductsData'

export const addToBasket = (product: IProduct): IBasketAdd => ({
  product,
  type: BasketActionTypes.ADD,
})
