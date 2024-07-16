import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import { adicionarCarrinho } from '../../store/reducers/carrinho'
import { useGetProdutosQuery } from '../../service/api'
import { adicionarFavorito } from '../../store/reducers/favoritos'
import { RootReducer } from '../../store'
import { Produto } from '../../App'

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = () => {
  const dispatch = useDispatch()
  const { data: produtos, isLoading } = useGetProdutosQuery()

  const favoritos = useSelector(
    (state: RootReducer) => state.favorito.favoritados
  )

  const estaNosFavoritos = (produto: Produto) => {
    const produtoId = produto.id
    const IdsDosFavoritos = favoritos.map((f) => f.id)

    return IdsDosFavoritos.includes(produtoId)
  }

  if (isLoading) return <h2>Carregando...</h2>

  return (
    <>
      {produtos?.map((produto) => (
        <S.Produto key={produto.id}>
          <S.Capa>
            <img src={produto.imagem} alt={produto.nome} />
          </S.Capa>
          <S.Titulo>{produto.nome}</S.Titulo>
          <S.Prices>
            <strong>{paraReal(produto.preco)}</strong>
          </S.Prices>
          <S.BtnComprar
            onClick={() => dispatch(adicionarFavorito(produto))}
            type="button"
          >
            {estaNosFavoritos(produto)
              ? '- Remover dos favoritos'
              : '+ Adicionar aos favoritos'}
          </S.BtnComprar>
          <S.BtnComprar
            onClick={() => dispatch(adicionarCarrinho(produto))}
            type="button"
          >
            Adicionar ao carrinho
          </S.BtnComprar>
        </S.Produto>
      ))}
    </>
  )
}

export default ProdutoComponent
