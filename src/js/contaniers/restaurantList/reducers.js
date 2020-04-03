import Immutable from 'seamless-immutable';

const defaultState = Immutable({
  restaurantList: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'RESTAURANT:LIST:INIT':
      return state.set('restaurants', action.data.restaurants);
    case 'CITIES:LIST:INIT':
      return state.set('cities', action.data.cities);
    case 'RESTAURANT_LIST:REFINE:SEARCH': {
      const { restaurants, searchValue } = action;
      const modifiedRestaurantList = [];
      if (searchValue) {
        restaurants.forEach((item) => {
          if (Object.values(item).join('').includes(searchValue)) {
            modifiedRestaurantList.push(item);
          }
        });
        return state.set('restaurants', modifiedRestaurantList);
      }
      return state.set('restaurants', restaurants);
    }
    default:
      return state;
  }
};
