import { configureStore } from '@reduxjs/toolkit'

import carrinhoReducer from './reducers/carrinho'
import favoritoReducer from './reducers/favoritos'
import api from '../service/api'

export const store = configureStore({
  reducer: {
    carrinho: carrinhoReducer,
    favorito: favoritoReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultmiddleware) =>
    getDefaultmiddleware().concat(api.middleware)
})

export type RootReducer = ReturnType<typeof store.getState>
