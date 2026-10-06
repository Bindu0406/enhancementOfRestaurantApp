import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {restaurantName = 'UNI Resto Cafe'} = props

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <header className='nav-header'>
            <Link to='/' className='nav-link'>
              <h1 className='logo-heading'>{restaurantName}</h1>
            </Link>
            <div className='header-actions'>
              <p className='my-orders-text'>My Orders</p>
              <Link to='/cart'>
                <button
                  type='button'
                  data-testid='cart'
                  className='cart-icon-button'
                >
                  <AiOutlineShoppingCart className='cart-icon' />
                  <span className='cart-count-badge'>{cartItemsCount}</span>
                </button>
              </Link>
              <button
                type='button'
                className='logout-button'
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </header>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
