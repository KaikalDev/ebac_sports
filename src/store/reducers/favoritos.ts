import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../App'

type favoritoState = {
  favoritados: Produto[]
}

const initialState: favoritoState = {
  favoritados: []
}

const FavoritosSlice = createSlice({
  name: 'favoritos',
  initialState,
  reducers: {
    adicionarFavorito: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      const favoritos = state.favoritados
      if (favoritos.find((p) => p.id === produto.id)) {
        const favoritosSemProduto = favoritos.filter((p) => p.id !== produto.id)
        state.favoritados = favoritosSemProduto
      } else {
        state.favoritados = [...favoritos, produto]
      }
    }
  }
})

export const { adicionarFavorito } = FavoritosSlice.actions
export default FavoritosSlice.reducer
