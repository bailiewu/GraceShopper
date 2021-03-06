import React, { useState } from 'react'
import { User, Product, Order } from 'src/@types/redux-types'
import { Link } from 'react-router-dom'
import { addItemToCart } from '../../../store'
import { connect } from 'react-redux'

const mapStateToProps = ({ user, order }: { user: User; order: Order }) => {
  return { user, order }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    add: (userId: number, product: Product) => dispatch(addItemToCart(userId, product))
  }
}

enum ButtonText {
  add = '+Cart',
  added = 'Added!'
}

const ProductItem = ({ user, order, product, add }: { user: User; order: Order; product: Product; add: any }) => {
  const [buttonText, setButtonText] = useState(ButtonText.add)

  const addToCart = () => {
    add(user.id, product).then(() => {
      setButtonText(ButtonText.added)
      setTimeout(() => {
        setButtonText(ButtonText.add)
      }, 3000)
    })
  }
  return (
    <div className="border mb-2">
      <div className="row">
        <div className="col product-image">
          <img alt="A picture of a product" src={product.imageUrl} className="col pt-1 pb-1 pl-1" />
        </div>
        <div className="col d-flex align-items-around justify-content-center flex-column">
          <div className="row d-flex align-items-center justify-content-around">
            <div className="col d-flex justify-content-center">
              <Link to={`/products/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
            </div>
            <div className="col d-flex justify-content-center">
              <h6>
                <span>${product.price}</span>
              </h6>
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <p>{product.description}</p>
            </div>
            <div className="col d-flex justify-content-center align-items-center">
              <button className="btn btn-raised btn-success" onClick={addToCart}>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem)
