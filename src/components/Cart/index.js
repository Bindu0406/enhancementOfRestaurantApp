import Header from '../Header'
import CartItem from '../CartItem'
import EmptyCartView from '../EmptyCartView'
import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const isCartEmpty = cartList.length === 0

      return (
        <div className='cart-route-container'>
          <Header />
          <div className='cart-body-container'>
            {isCartEmpty ? (
              <EmptyCartView />
            ) : (
              <div className='cart-content-container'>
                <div className='cart-header-action'>
                  <h1 className='cart-main-heading'>Cart Items</h1>
                  <button
                    type='button'
                    className='remove-all-btn'
                    onClick={removeAllCartItems}
                  >
                    Remove All
                  </button>
                </div>
                <ul className='cart-items-list'>
                  {cartList.map(item => (
                    <CartItem key={item.dish_id} cartItemDetails={item} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
