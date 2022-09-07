import { getFavoritesByUser } from "./favoritesData";
import { deleteSingleStop, getTripStops } from "./stopData";
import { deleteSingleTrip, getFavoriteTrips, getSingleTrip } from "./tripData";

const deleteTripStops = (tripFirebaseKey) => new Promise((resolve, reject) => {
  getTripStops(tripFirebaseKey).then((stopsArray) => {
    const deleteCommentPromises = stopsArray.map((stop) => deleteSingleStop(stop.stopFirebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleTrip(tripFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

const getUsersFavoriteTrips = async (uid) => {
  const userFavs = await getFavoritesByUser(uid);
  const favTrips = userFavs.map((fav) => fav.tripFirebaseKey);
  const tripObjects = await favTrips.map((firebaseKey) => getSingleTrip(firebaseKey));
  const tripObjectArray = await Promise.all(tripObjects);
  return tripObjectArray;
};

export { deleteTripStops, getUsersFavoriteTrips, }
