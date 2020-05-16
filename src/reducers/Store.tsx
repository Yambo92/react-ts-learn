import { applyMiddleware, combineReducers, createStore, Store } from 'redux'

import thunk from 'redux-thunk'

import { productsReducer } from './ProductsReducer'
import { IProductsState } from './ProductsTypes'

export interface IApplicationState {
  products: IProductsState
}

const rootReducer = combineReducers<IApplicationState>({
  products: productsReducer,
})
/* The function that creates our store is called  configureStore and returns
the generic  Store type with our specific store state passed in to it */
export default function configureStore(): Store<IApplicationState> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk))
  return store
}
