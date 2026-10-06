import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import CartContext from './context/CartContext'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = dishItem => {
    const {cartList} = this.state
    const existingItem = cartList.find(
      item => item.dish_id === dishItem.dish_id,
    )

    if (existingItem) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.dish_id === dishItem.dish_id) {
            return {...item, quantity: item.quantity + dishItem.quantity}
          }
          return item
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, dishItem],
      }))
    }
  }

  removeCartItem = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.dish_id !== dishId),
    }))
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.dish_id === dishId) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
    }))
  }

  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const targetItem = cartList.find(item => item.dish_id === dishId)

    if (targetItem && targetItem.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.dish_id === dishId) {
            return {...item, quantity: item.quantity - 1}
          }
          return item
        }),
      }))
    } else {
      this.removeCartItem(dishId)
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/' component={Home} />
            <ProtectedRoute exact path='/cart' component={Cart} />
            <Redirect to='/login' />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
