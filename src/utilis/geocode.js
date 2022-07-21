import { createRequire } from "module";

const require = createRequire(import.meta.url);
const request = require("postman-request");

const geocode = (address, callback) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURIComponent(address) +
      ".json?access_token=pk.eyJ1IjoiYW5hc2FyaWYiLCJhIjoiY2w1czMzaXliMDVrYTNqcnpwY3JoaGU3cSJ9.wks4yg-t8gcoMg6ZF7tk9g&limit=1";
    request({ url, json: true }, (error, {body}) => {
      if (error) {
        callback("unable to connect to the location servise", undefined);
      } else if (body.features.length == 0) {
        callback("unable to find location! try another search", undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        });
      }
    });
  };

export default geocode;