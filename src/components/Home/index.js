import {Component} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import './index.css'

const fallbackData = {
  restaurant_name: 'UNI Resto Cafe',
  table_menu_list: [
    {
      menu_category: 'Salads and Soup',
      menu_category_id: '11',
      category_dishes: [
        {
          dish_id: '100000001',
          dish_name: 'Spinach Salad',
          dish_price: 7.95,
          dish_image:
            'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80',
          dish_currency: 'USD',
          dish_calories: 15,
          dish_description:
            'Fresh baby spinach, toasted almonds, dried cranberries, and creamy goat cheese tossed in a balsamic glaze.',
          dish_Availability: true,
          dish_Type: 2,
          addonCat: [{addon_category: 'Dressing'}],
        },
        {
          dish_id: '100000002',
          dish_name: 'Traditional Chicken Soup',
          dish_price: 12.0,
          dish_image:
            'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80',
          dish_currency: 'USD',
          dish_calories: 320,
          dish_description:
            'Hearty comforting chicken soup slow-simmered with garden root vegetables and aromatic garden herbs.',
          dish_Availability: true,
          dish_Type: 1,
          addonCat: [],
        },
      ],
    },
    {
      menu_category: 'From The Barnyard',
      menu_category_id: '12',
      category_dishes: [
        {
          dish_id: '100000003',
          dish_name: 'Grilled Chicken Breast',
          dish_price: 15.5,
          dish_image:
            'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=500&q=80',
          dish_currency: 'USD',
          dish_calories: 450,
          dish_description:
            'Succulent char-grilled chicken breast served with honey glazed roasted vegetables and garlic butter.',
          dish_Availability: true,
          dish_Type: 1,
          addonCat: [{addon_category: 'Sauce'}],
        },
      ],
    },
    {
      menu_category: 'From the Hen House',
      menu_category_id: '13',
      category_dishes: [
        {
          dish_id: '100000004',
          dish_name: 'Farm Fresh Omelette',
          dish_price: 9.0,
          dish_image:
            'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=500&q=80',
          dish_currency: 'USD',
          dish_calories: 280,
          dish_description:
            'Fluffy farm-fresh three-egg omelette stuffed with aged cheddar, bell peppers, and fine herbs.',
          dish_Availability: true,
          dish_Type: 2,
          addonCat: [],
        },
      ],
    },
  ],
}

class Home extends Component {
  state = {
    isLoading: true,
    restaurantData: {},
    activeCategoryId: '',
  }

  componentDidMount() {
    this.fetchRestaurantData()
  }

  fetchRestaurantData = async () => {
    const url = 'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        const menuList = data[0]?.table_menu_list || []
        if (menuList.length > 0) {
          this.setState({
            restaurantData: data[0],
            activeCategoryId: menuList[0].menu_category_id,
            isLoading: false,
          })
          return
        }
      }
      throw new Error('API response invalid')
    } catch {
      this.setState({
        restaurantData: fallbackData,
        activeCategoryId: fallbackData.table_menu_list[0].menu_category_id,
        isLoading: false,
      })
    }
  }

  onSelectCategory = categoryId => {
    this.setState({activeCategoryId: categoryId})
  }

  renderCategories = () => {
    const {restaurantData, activeCategoryId} = this.state
    const menuList = restaurantData.table_menu_list || []

    return (
      <div className='categories-nav-wrapper'>
        <ul className='categories-tab-list'>
          {menuList.map(category => (
            <li
              key={category.menu_category_id}
              className={`tab-item ${
                activeCategoryId === category.menu_category_id
                  ? 'active-tab'
                  : ''
              }`}
            >
              <button
                type='button'
                className='tab-button'
                onClick={() => this.onSelectCategory(category.menu_category_id)}
              >
                {category.menu_category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderDishes = () => {
    const {restaurantData, activeCategoryId} = this.state
    const menuList = restaurantData.table_menu_list || []
    const activeCategory = menuList.find(
      cat => cat.menu_category_id === activeCategoryId,
    )
    const dishes = activeCategory ? activeCategory.category_dishes : []

    return (
      <ul className='dishes-list'>
        {dishes.map(dish => (
          <DishItem key={dish.dish_id} dishDetails={dish} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, restaurantData} = this.state

    if (isLoading) {
      return (
        <div className='loader-container'>
          <div className='spinner' />
          <p className='loading-text'>Preparing your menu...</p>
        </div>
      )
    }

    return (
      <div className='home-container'>
        <Header restaurantName={restaurantData.restaurant_name} />
        <div className='hero-banner'>
          <h2 className='hero-title'>Delicious Meals Prepared Fresh</h2>
          <p className='hero-subtitle'>
            Order your favorite dishes and have them delivered warm & fast
          </p>
        </div>
        {this.renderCategories()}
        {this.renderDishes()}
      </div>
    )
  }
}

export default Home
