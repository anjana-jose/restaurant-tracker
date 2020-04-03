import { put } from 'redux-saga/effects';

export function* fetchRestaurants(params) {
  const { city = 'toronto' } = params;
  try {
    const data = yield fetch(`http://opentable.herokuapp.com/api/restaurants?city=${city}`)
      .then(res => res.json());
    yield put({ type: 'RESTAURANT:LIST:INIT', data });
  } catch {
    yield put({ type: 'RESTAURANT:LIST:FAIL' });
  }
}

export function* fetchCities() {
  try {
    const data = yield fetch('http://opentable.herokuapp.com/api/cities ')
      .then(res => res.json());
    yield put({ type: 'CITIES:LIST:INIT', data });
  } catch {
    yield put({ type: 'CITIES:LIST:FAIL' });
  }
}
