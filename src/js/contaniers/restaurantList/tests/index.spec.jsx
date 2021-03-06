import Immutable from 'seamless-immutable';

describe('containers/restaurantList/index.js', () => {
  let wrapWithConnect;
  let connect;
  const expectedContainerElement = {};
  beforeEach(() => {
    jest.resetModules();
    jest.unmock('seamless-immutable');
    wrapWithConnect = jest.fn(() => expectedContainerElement);
    connect = jest.fn(() => wrapWithConnect);
    jest.doMock('react-redux', () => ({ connect }));
  });
  it('should call connect', () => {
    require('../index'); // eslint-disable-line global-require
    expect(connect).toBeCalled();
  });
  describe('connect function', () => {
    describe('mapStateToProps function', () => {
      beforeEach(() => {
        require('../index'); // eslint-disable-line global-require
      });
      it('should be an argument', () => {
        const mapStateToProps = connect.mock.calls[0][0];

        expect(mapStateToProps).toBeDefined();
        expect(mapStateToProps).toBeInstanceOf(Function);
      });
      it('should be fired', () => {
        const mapStateToProps = connect.mock.calls[0][0];
        const state = {
          restaurantList: Immutable({
            cities: [],
            restaurants: {}
          })
        };
        const result = mapStateToProps(state);
        expect(result).toEqual({
          cities: [],
          data: {}
        });
      });
    });
  });
  describe('connect function', () => {
    describe('mapDispatchToProps function', () => {
      beforeEach(() => {
        require('../index'); // eslint-disable-line global-require
      });
      it('should be an argument', () => {
        const mapDispatchToProps = connect.mock.calls[0][1];

        expect(mapDispatchToProps).toBeDefined();
        expect(mapDispatchToProps).toBeInstanceOf(Function);
        expect(mapDispatchToProps.name).toBe('mapDispatchToProps');
      });
      it('should be fired on fetchRestaurantList', () => {
        const mapDispatchToProps = connect.mock.calls[0][1];
        const dispatch = jest.fn();
        const props = mapDispatchToProps(dispatch);
        const city = 'Toronto';
        expect(props).toBeDefined();
        expect(props.fetchRestaurantList).toBeDefined();
        expect(props.fetchRestaurantList).toBeInstanceOf(Function);

        props.fetchRestaurantList(city);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'RESTAURANTS_LIST:LIST:FETCH', city
        });
      });
    });
  });
});
