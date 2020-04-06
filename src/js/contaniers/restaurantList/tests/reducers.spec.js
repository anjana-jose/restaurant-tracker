import Immutable from 'seamless-immutable';
import reducer from '../reducers';

const defaultState = Immutable({
  restaurants: []
});


describe('containers/restaurantList/reducers', () => {
  describe('state', () => {
    it('should export `reducer`', () => {
      expect(reducer)
        .toBeDefined();
    });

    it('should return the default state', () => {
      expect(reducer(undefined, {})).toEqual(defaultState);
    });

    it('should return the same state', () => {
      const startState = Immutable.set(defaultState, 'anotherValue', 'someValue');
      const expectedState = startState;
      expect(reducer(startState, {})).toEqual(expectedState);
    });
  });
  describe('actions', () => {
    it('should handle RESTAURANT:LIST:INIT', () => {
      const data = {
        restaurants: {
          name: 'ABC',
          address: 'Address 1',
          phone: '99989898'
        }
      };
      const resultState = reducer(defaultState, { type: 'RESTAURANT:LIST:INIT', data });
      expect(resultState.restaurants)
        .toEqual(data.restaurants);
    });
    it('should handle CITIES:LIST:INIT', () => {
      const data = {
        cities: [
          'Toronto',
          'Mississauga'
        ]
      };
      const resultState = reducer(defaultState, { type: 'CITIES:LIST:INIT', data });
      expect(resultState.cities)
        .toEqual(data.cities);
    });
  });
});
