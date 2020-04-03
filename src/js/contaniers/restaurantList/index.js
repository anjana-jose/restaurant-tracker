import { connect } from 'react-redux';
import RestaurantList from './restaurantList';

function mapStateToProps(state) {
  return {
    data: state.restaurantList.restaurants,
    cities: state.restaurantList.cities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRestaurantList: (city) => {
      dispatch({ type: 'RESTAURANTS_LIST:LIST:FETCH', city });
    },
    fetchCities: () => {
      dispatch({ type: 'CITIES_LIST:LIST:FETCH' });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
