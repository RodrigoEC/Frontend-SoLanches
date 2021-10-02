import { StarFilled } from '@ant-design/icons'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import useLoginContext from '../../contexts/login.context'
import { formatRoute } from '../../util/format'
import { Button } from '../Button'
import { ProductCard } from '../ProductCard'

import style from './styles.module.css'

export const FavProducts = ({ products = [[]], favedIds = [] }) => {
  const { user } = useLoginContext()
  const { commerceName } = useParams()
  const history = useHistory()

  return (
    <section className={style.FavSection}>
      <div className={style.sectionTitle}>
        <StarFilled style={{ fontSize: '2rem' }} />
        <h2>Destaques</h2>
        {user && formatRoute(user) === commerceName ? (
          <Button
            title='editar cardápio'
            handleClick={() => history.push(`/${commerceName}/edit`)}
          />
        ) : (
          <></>
        )}
      </div>
      <div>
        {favedIds.length > 0 ? (
          <div className={style.products}>
            {products.map((product, index) => {
              console.log('produto', product)
              if (favedIds && product[0] && favedIds.includes(product[0]._id)) {
                return (
                  <ProductCard
                    key={index}
                    title={product[0].nome}
                    category={product[0].attributes.categoria}
                    description={product[0].attributes.description}
                    price={product[0].attributes.price}
                    editable={false}
                  />
                )
              }
              return null
            })}
          </div>
        ) : (
          <p className={style.noItens}>Não há itens em destaque!</p>
        )}
      </div>
    </section>
  )
}
