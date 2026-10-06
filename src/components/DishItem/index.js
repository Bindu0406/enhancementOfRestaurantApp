import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const fallbackImage =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80'

const DishItem = ({dishDetails}) => {
  const [quantity, setQuantity] = useState(0)

  const onIncrease = () => setQuantity(prev => prev + 1)
  const onDecrease = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0))

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onClickAddToCart = () => {
          if (quantity > 0) {
            addCartItem({...dishDetails, quantity})
          }
        }

        const isAvailable = dishDetails.dish_Availability

        return (
          <li className='dish-card'>
            <div className='dish-indicator-content'>
              <div
                className={`dish-type-border ${
                  dishDetails.dish_Type === 1 ? 'non-veg-border' : 'veg-border'
                }`}
              >
                <div
                  className={`dish-type-dot ${
                    dishDetails.dish_Type === 1 ? 'non-veg-dot' : 'veg-dot'
                  }`}
                />
              </div>

              <div className='dish-info'>
                <h3 className='dish-name'>{dishDetails.dish_name}</h3>
                <p className='dish-currency-price'>
                  {dishDetails.dish_currency} {dishDetails.dish_price}
                </p>
                <p className='dish-description'>
                  {dishDetails.dish_description}
                </p>

                {isAvailable ? (
                  <div className='action-row'>
                    <div className='quantity-control-container'>
                      <button
                        type='button'
                        className='qty-btn'
                        onClick={onDecrease}
                      >
                        -
                      </button>
                      <p className='qty-value'>{quantity}</p>
                      <button
                        type='button'
                        className='qty-btn'
                        onClick={onIncrease}
                      >
                        +
                      </button>
                    </div>

                    {quantity > 0 && (
                      <button
                        type='button'
                        className='add-to-cart-btn'
                        onClick={onClickAddToCart}
                      >
                        ADD TO CART
                      </button>
                    )}
                  </div>
                ) : (
                  <p className='not-available-text'>Not available</p>
                )}

                {dishDetails.addonCat && dishDetails.addonCat.length > 0 && (
                  <span className='customizations-tag'>
                    ★ Customizations available
                  </span>
                )}
              </div>
            </div>

            <div className='dish-calories-image'>
              <span className='calories-badge'>
                🔥 {dishDetails.dish_calories} calories
              </span>
              <img
                src={dishDetails.dish_image || fallbackImage}
                alt={dishDetails.dish_name}
                className='dish-image'
                onError={e => {
                  e.target.onerror = null
                  e.target.src = fallbackImage
                }}
              />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
