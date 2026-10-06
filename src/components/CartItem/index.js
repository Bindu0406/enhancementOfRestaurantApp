import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = ({cartItemDetails}) => (
  <CartContext.Consumer>
    {value => {
      const {
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
      } = value

      const {
        dish_id: dishId,
        dish_name: dishName,
        dish_image: dishImage,
        dish_currency: dishCurrency,
        dish_price: dishPrice,
        quantity,
      } = cartItemDetails

      const onIncrement = () => incrementCartItemQuantity(dishId)
      const onDecrement = () => decrementCartItemQuantity(dishId)
      const onRemove = () => removeCartItem(dishId)

      const totalItemPrice = dishPrice * quantity

      return (
        <li className='cart-item'>
          <img className='cart-item-image' src={dishImage} alt={dishName} />
          <div className='cart-item-details-container'>
            <p className='cart-item-title'>{dishName}</p>
            <div className='cart-quantity-container'>
              <button
                type='button'
                className='cart-qty-btn'
                onClick={onDecrement}
              >
                -
              </button>
              <p className='cart-qty-value'>{quantity}</p>
              <button
                type='button'
                className='cart-qty-btn'
                onClick={onIncrement}
              >
                +
              </button>
            </div>
            <p className='cart-item-price'>
              {dishCurrency} {totalItemPrice.toFixed(2)}
            </p>
          </div>
          <button type='button' className='cart-remove-btn' onClick={onRemove}>
            <AiFillCloseCircle className='remove-icon' />
            <span className='remove-text'>Remove</span>
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
