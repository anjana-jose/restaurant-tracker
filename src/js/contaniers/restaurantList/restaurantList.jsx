/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import defaultStyle from './styles';

class RestaurantList extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      restaurants: [],
      cities: [],
      city: 'toronto'
    });
  }


  componentDidMount() {
    const { fetchRestaurantList, fetchCities } = this.props;
    if (fetchCities) {
      fetchCities();
    }
    if (fetchRestaurantList) {
      fetchRestaurantList(this.state.city);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cities: nextProps.cities
    });
    if (nextProps.data !== undefined || this.props.data !== nextProps.data) {
      this.setState({
        restaurants: nextProps.data
      });
    }
  }

  handleRefineSearch = (evt) => {
    const allRestaurantList = [...this.props.data];
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
    this.setState({
      restaurants: modifiedRestaurantList
    });
  }


  onFilterByCity = (evt) => {
    this.setState({
      city: evt.target.value
    });
    this.props.fetchRestaurantList(evt.target.value);
  }

  handleSearchCity = (evt) => {
    const { cities } = this.props;
    const searchValue = evt.target.value;
    const modifiedCityList = cities.filter(item => item.toLowerCase().includes(searchValue.toLowerCase()));
    this.setState({
      cities: modifiedCityList
    });
  }

  render() {
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
                  onChange={this.handleRefineSearch}
                  style={{ width: '95%' }}
                />
              </label>
            </h4>

            <h4 style={defaultStyle.headerStyle}>
              City Selected:
              <span style={defaultStyle.textStyle}>{this.state.city}</span>
              <label htmlFor="search-city">
                <input
                  type="text"
                  id="search-city"
                  onChange={this.handleSearchCity}
                  style={{ width: '95%' }}
                />
              </label>
            </h4>
            <div style={defaultStyle.optionListStyle}>
              {this.state.cities && this.state.cities.map(city => (
                <div>
                  <input
                    type="radio"
                    name="city"
                    value={city}
                    onChange={this.onFilterByCity}
                  />
                  <span style={defaultStyle.optionStyle}>{city}</span>
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
              {this.state.restaurants.length > 0
                ? this.state.restaurants.map(item => (
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
  }
}

RestaurantList.propTypes = {
  data: PropTypes.shape({}),
  fetchRestaurantList: PropTypes.func,
  fetchCities: PropTypes.func,
  cities: PropTypes.shape({
    filter: e => e
  })
};

RestaurantList.defaultProps = {
  data: [],
  fetchRestaurantList: e => e,
  fetchCities: e => e,
  cities: []
};

export default RestaurantList;
