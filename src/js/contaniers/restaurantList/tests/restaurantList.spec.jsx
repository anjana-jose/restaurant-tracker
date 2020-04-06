/* eslint-disable react/prop-types */
/* eslint-disable react/no-multi-comp */

import React from 'react';
import renderer from 'react-test-renderer';

const { RestaurantList } = require('../restaurantList');

describe('containers/restaurantList', () => {
  it('without data and cities', () => {
    const data = {};
    const cities = [];

    const component = renderer.create(
      <RestaurantList data={data} cities={cities} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('With out url and user id', () => {
    const data = { id: 'id1', name: 'restaurant1' };
    const cities = ['toronto', 'Mississauga'];

    const component = renderer.create(
      <RestaurantList data={data} cities={cities} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
