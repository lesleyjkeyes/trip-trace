import axios from 'axios';
import { clientCredentials } from '../../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getAllTrips = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trips.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const getSingleTrip = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trips/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

const updateTrip = (tripObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/trips/${tripObj.firebaseKey}.json`, tripObj)
    .then(() => getAllTrips(tripObj.uid).then(resolve))
    .catch(reject);
});

const createTrip = (tripObj) => new Promise((resolve, reject) => {
  console.warn(tripObj);
  axios.post(`${dbUrl}/trips.json`, tripObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/trips/${response.data.name}.json`, payload)
        .then(() => {
          getAllTrips(tripObj.uid).then(resolve);
        });
    }).catch(reject);
});

const deleteSingleTrip = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/trips/${firebaseKey}.json`)
    .then(() => {
      getAllTrips().then((tripsArray) => resolve(tripsArray));
    })
    .catch((error) => reject(error));
});

const getUserTrips = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/trips.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

export { 
  createTrip,
  updateTrip,
  getAllTrips,
  getSingleTrip,
  deleteSingleTrip,
  getUserTrips,
}
