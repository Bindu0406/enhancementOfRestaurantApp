import './index.css'

const EmptyCartView = () => (
  <div className='empty-cart-container'>
    <img
      src='https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'
      alt='empty cart'
      className='empty-cart-image'
    />
    <h1 className='empty-heading'>Your Cart Is Empty</h1>
  </div>
)

export default EmptyCartView
