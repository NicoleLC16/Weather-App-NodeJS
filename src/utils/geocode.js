const request = require("request");

const geocode = (address, callback) => {
  const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoibmljb2xlbGMxNiIsImEiOiJja29naGY1eHAwcmJ5MnBsajk1Z3pyeGpvIn0.ZG71DIitwLIx5ftMv5bGkg&limit=1`;

  request({ url: locationUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to location service!", undefined);
    } else if (body.features.length === 0) {
      callback("0 search results", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
