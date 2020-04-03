import { takeEvery } from 'redux-saga';

import { fetchRestaurants, fetchCities } from '../contaniers/restaurantList/sagas';


const sagas = [
  [takeEvery, 'RESTAURANTS_LIST:LIST:FETCH', fetchRestaurants],
  [takeEvery, 'CITIES_LIST:LIST:FETCH', fetchCities]

];

function* rootSaga() {
  yield [
    sagas.map(saga => function* () {
      yield saga[0](saga[1], saga[2]);
    }).map(saga => saga.call())
  ];
}

export default rootSaga;
