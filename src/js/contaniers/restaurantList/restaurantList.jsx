/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import defaultStyle from './styles';

export const RestaurantList = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [citiesList, setCities] = useState([]);
  const [city, setCitySelected] = useState('toronto');

  useEffect(() => {
    const { fetchRestaurantList, fetchCities } = props;
    if (fetchCities) {
      fetchCities();
    }
    if (fetchRestaurantList) {
      fetchRestaurantList(city);
    }
  }, []);


  useEffect(() => {
    if (props.cities !== undefined) {
      setCities(props.cities);
    }
  }, [props.cities]);


  useEffect(() => {
    if (props.data !== undefined) {
      setRestaurants(props.data);
    }
  }, [props.data]);


  const handleRefineSearch = (evt) => {
    const allRestaurantList = [...props.data];
    let modifiedRestaurantList = [];
    const searchValue = evt.target.value;
    if (searchValue) {
      allRestaurantList.forEach((item) => {
        if (Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())) {
          modifiedRestaurantList.push(item);
        }
      });
    } else {
      modifiedRestaurantList = allRestaurantList;
    }
    setRestaurants(modifiedRestaurantList);
  };


  const onFilterByCity = (evt) => {
    setCitySelected(evt.target.value);
    props.fetchRestaurantList(evt.target.value);
  };

  const handleSearchCity = (evt) => {
    const { cities } = props;
    const searchValue = evt.target.value;
    const modifiedCityList = cities.filter(item => item.toLowerCase().includes(searchValue.toLowerCase()));
    setCities(modifiedCityList);
  };

  return (
    <React.Fragment>
      <div style={defaultStyle.rootStyle}>
        <div style={defaultStyle.leftNavStyle}>
          <h4 style={defaultStyle.headerStyle}>
            <img
              src="https://careers.just-eat.com/assets/images/icons/search.png"
              style={defaultStyle.imageStyle}
              alt=""
            />
            <span style={{ color: '#5b616b' }}>Refine</span>
            <label htmlFor="querySearch">
              <input
                type="text"
                id="querySearch"
                onChange={handleRefineSearch}
                style={{ width: '95%' }}
              />
            </label>
          </h4>

          <h4 style={defaultStyle.headerStyle}>
            City Selected:
            <span style={defaultStyle.textStyle}>{city}</span>
            <label htmlFor="search-city">
              <input
                type="text"
                id="search-city"
                onChange={handleSearchCity}
                style={{ width: '95%' }}
              />
            </label>
          </h4>
          <div style={defaultStyle.optionListStyle}>
            {citiesList && citiesList.map(cityValue => (
              <div key={cityValue}>
                <input
                  id="radio-button"
                  type="radio"
                  name="city"
                  value={cityValue}
                  onChange={onFilterByCity}
                />
                <span style={defaultStyle.optionStyle}>{cityValue}</span>
              </div>
            ))
            }
          </div>

        </div>
        <div style={defaultStyle.rightDivStyle}>
          <table style={defaultStyle.tableStyle}>
            <tr style={defaultStyle.tableHeaderStyle}>
              <th>Name</th>
              <th>Area</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Photo</th>
            </tr>
            {restaurants.length > 0
              ? restaurants.map(item => (
                <tr
                  key={`${item.name}_${item.department}`}
                  style={{ border: '1px solid' }}
                >
                  <td align="center" style={defaultStyle.rowStyle}>
                    <font color="#326DEA">
                      {item.name}
                    </font>
                  </td>
                  <td align="center">
                    {item.area}
                  </td>
                  <td align="center">
                    {item.address}
                  </td>
                  <td align="center">
                    {item.phone}
                  </td>
                  <td align="center">
                    <img src={item.image_url} alt={item.name} />
                  </td>
                </tr>
              ))
              : <div>Loading data...</div>}
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

RestaurantList.propTypes = {
  data: PropTypes.shape({}),
  fetchRestaurantList: PropTypes.func,
  fetchCities: PropTypes.func,
  cities: PropTypes.arrayOf(PropTypes.string)
};

RestaurantList.defaultProps = {
  data: {},
  fetchRestaurantList: e => e,
  fetchCities: e => e,
  cities: []
};

export default RestaurantList;
