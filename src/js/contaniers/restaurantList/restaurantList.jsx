/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import './style.css';


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
        <div style={{ display: 'flex', width: '100%', flexDirection: 'row', height: `calc(100% - 60px)` }}>
          <div style={{ width: '15%', marginLeft: '10px', height: '100%' }}>
            <h4 style={{ marginBottom: '5px', color: '#5b616b' }}>
              <img
                src="https://careers.just-eat.com/assets/images/icons/search.png"
                style={{ height: '14px', marginRight: '6px', marginTop: '2px' }}
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

            <h4 style={{ marginBottom: '5px', color: '#5b616b' }}>
                City Selected:
              <span style={{ color: '#5b616b', marginLeft: '5px', textTransform: 'capitalize' }}>{this.state.city}</span>
              <label htmlFor="search-city">
                <input
                  type="text"
                  id="search-city"
                  onChange={this.handleSearchCity}
                  style={{ width: '95%' }}
                />
              </label>
            </h4>
            <div style={{ overflow: 'auto', height: 'calc(100% - 130px' }}>
              {this.state.cities && this.state.cities.map(city => (
                <div>
                  <input type="radio" name="city" checked={city === this.state.city} value={city} onChange={this.onFilterByCity} />
                  <span style={{ fontSize: '16px', fontWeight: 'normal', color: '#5b616b' }}>{city}</span>
                </div>
              ))
              }
            </div>

          </div>
          <div style={{ width: '85%', height: '100%', overflow: 'auto' }}>
            <table style={{ border: '1px solid', width: '100%' }}>
              <tr style={{ border: '1px solid', height: 50, backgroundColor: '#112e51', color: '#ffffff' }}>
                <th>Name</th>
                <th>Area</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Image</th>
              </tr>
              {this.state.restaurants.map(item => (
                <tr
                  key={`${item.name}_${item.department}`}
                  style={{ border: '1px solid' }}
                >
                  <td align="center" style={{ height: 50, textColor: '#326DEA' }}>
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
              ))}
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
