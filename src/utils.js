/**
 * An Handler to all exceptions made in the app
 * @param type {string} - the type / scope of error (api calls will have type API)
 * @param title {string} - the title of the error (usually the function name)
 * @param msg {string} - a detail explanation of the error
 * @returns null
 */

/**
 * An helper function to get first letter of each word in a string
 * @param  {String} str       [description]
 * @param  {Number} maxLetter [description]
 * @return {String}           [description]
 */
export function getFirstLetterOfEachWord(str = '', maxLetter = 2) {
  return (str.match(/\b(\w)/g) || [])
    .splice(0, maxLetter)
    .join('')
    .toUpperCase();
}

/**
 * Create a region from latlng and distance (diameter)
 * @param lat
 * @param lng
 * @param distance
 * @returns {{latitude: *, longitude: *, latitudeDelta: number, longitudeDelta: number}}
 */
export function regionFrom(lat, lng, distance) {
  const radiusInKm = distance / 1000;
  const kmInLongitudeDegree = 111.32 * Math.cos((lat / 180.0) * Math.PI);
  const latitudeDelta = radiusInKm / 111.1;
  const longitudeDelta = radiusInKm / kmInLongitudeDegree;

  return {
    latitude: lat,
    longitude: lng,
    latitudeDelta,
    longitudeDelta,
  };
}

/**
 * An helper function to convert 'latlng' string to object of {lat, lng}
 * @returns {Object}
 */
export function latlngStringToObj(string, spliter = ',') {
  return {
    latitude: parseFloat(string.split(spliter)[0]),
    longitude: parseFloat(string.split(spliter)[1]),
  };
}

/**
 *  get distance between 2 location in km
 * @param lat1
 * @param lng1
 * @param lat2
 * @param lng2
 * @returns {*}
 */
export function getRawDistance(lat1, lng1, lat2, lng2) {
  if (lat1 === null || lng1 === null || lat2 === null || lng2 === null)
    return null;

  const R = 6371; // km (change this constant to get miles)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * An helper function to calculate distance between two sets of lat, lng
 * @returns {Object}
 */
export function calcDistance(lat1, lng1, lat2, lng2) {
  const cacheKey = [lat1, lng1, lat2, lng2].join(',');
  if (!calcDistance.cache) {
    calcDistance.cache = {};
  }
  if (!calcDistance.cache[cacheKey]) {
    let distance;
    const d = getRawDistance(lat1, lng1, lat2, lng2);
    if (d > 1) {
      distance = `${Math.round(d).toLocaleString()} km`;
    } else {
      distance = `${Math.round(d * 1000).toLocaleString()} m`;
    }
    calcDistance.cache[cacheKey] = distance;
    return distance;
  }
  return calcDistance.cache[cacheKey];
}

/**
 * Get a center latitude,longitude,delta from an array of objects
 * @param data [{latlng: {lat: 0.000, lng: 0.000}, ...]
 * @returns {*}
 */
export function getCenterFromList(data = []) {
  if (data.length <= 0) return false;

  const numCoords = data.length;

  let X = 0.0;
  let Y = 0.0;
  let Z = 0.0;

  data.forEach((i) => {
    const _lat = (i.latitude * Math.PI) / 180;
    const _lng = (i.longitude * Math.PI) / 180;

    const a = Math.cos(_lat) * Math.cos(_lng);
    const b = Math.cos(_lat) * Math.sin(_lng);
    const c = Math.sin(_lat);

    X += a;
    Y += b;
    Z += c;
  });

  X /= numCoords;
  Y /= numCoords;
  Z /= numCoords;

  const avgLng = Math.atan2(Y, X);
  const avgHyp = Math.sqrt(X * X + Y * Y);
  const avgLat = Math.atan2(Z, avgHyp);

  const newX = (avgLat * 180) / Math.PI;
  const newY = (avgLng * 180) / Math.PI;

  return {
    latitude: newX,
    longitude: newY,
    distance: avgHyp,
  };
}

export const extractCoordinateListFromSearchResult = (results) => {
  return results
    .map((item) => {
      if (item.location_coordinate) {
        return latlngStringToObj(item.location_coordinate);
      }
      return null;
    })
    .filter((item) => item != null);
};

/**
 * Given a pre-defined set of coordinates as {latitude: ..., longitude: ...}
 * and a pre-defined center point with {latitude: ..., longitude: ...}
 * Find the zoom deltas needed for maps
 *
 *  const center = {latitude: 40.0348483, longitude: -73.00318473};
 *  const points = [{latitude: ..., longitude: ...}, {latitude: ..., longitude: ...}, ...]
 *  zoomDeltas(center, points); // => {latitudeDelta: ..., longitudeDelta: ...}
 *
 * @type {number}
 */
function _maxCoordinateDistance(point1, point2) {
  // finding "furthest distance" means finding
  // the maximum of the x/y deltas
  const latDelta =
    Math.max(point1.latitude, point2.latitude) -
    Math.min(point1.latitude, point2.latitude);
  const longDelta =
    Math.max(point1.longitude, point2.longitude) -
    Math.min(point1.longitude, point2.longitude);
  return {
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
  };
}

export function calculateDeltaFromList(centerPoint, coordinates) {
  let maxLatDelta = 0.0;
  let maxLongDelta = 0.0;
  coordinates.forEach((coordinate) => {
    const distanceFromCenter = _maxCoordinateDistance(centerPoint, coordinate);
    maxLatDelta = Math.max(maxLatDelta, distanceFromCenter.latitudeDelta);
    maxLongDelta = Math.max(maxLongDelta, distanceFromCenter.longitudeDelta);
  });

  // maxLatDelta and maxLongDelta are now the furthest radial distance from
  // the center point, so multiply by 2 will give you the deltas you need
  // for zooming a map
  return {
    latitudeDelta: maxLatDelta * 2,
    longitudeDelta: maxLongDelta * 2,
  };
}

export function insertItem(array, action) {
  const newArray = array.slice();
  newArray.splice(action.index || array.length - 1, 0, action.item);
  return newArray;
}

export function removeItem(array, action) {
  if (action.index)
    return array.filter((item, index) => index !== action.index);
  if (action.item) return array.filter((item) => item !== action.item);
  return array;
}

/**
 * Format a distance to M or KM
 * @param {number} distance
 */
export function formatDistance(distance) {
  if (distance < 1) {
    return `${distance * 1000} m`;
  }
  return `${distance} km`;
}

export function isEqualSources(prev, next, sources) {
  if (!prev) {
    if (!next) return true;
    return next.length === sources.length;
  }
  if (prev.length !== next.length) return false;
  for (let i = 0; i < prev.length; i += 1) {
    if (!next.includes(prev[i])) return false;
  }
  return true;
}
