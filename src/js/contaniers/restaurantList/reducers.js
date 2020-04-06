import Immutable from 'seamless-immutable';

const defaultState = Immutable({
  restaurants: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'RESTAURANT:LIST:INIT':
      return state.set('restaurants', action.data.restaurants);
    case 'CITIES:LIST:INIT':
      return state.set('cities', action.data.cities);
    default:
      return state;
  }
};
