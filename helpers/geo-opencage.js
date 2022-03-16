const opencage = require("opencage-api-client");
const OCD_API_KEY = process.env.OCD_API_KEY;
/*
This helper file contains *all* knowledge of OpenCage: How to send requests,
how to get the API key, and how to extract the desired info from the response.
Note that the only difference between forward/reverse geocode requests is what you
pass as ‘q’: pass an address for forward, and lat,lng for reverse.
*/
/**
 * Forward geocode: address => latitude/longitude
 **/
module.exports = async function geocode(address) {
  let geoParams = {
    q: address,
    key: OCD_API_KEY,
    no_annotations: 1
  };
  let response = { ok: true, error: "", data: null };
  try {
    let ocresp = await opencage.geocode(geoParams);
    if (ocresp.status.code === 200) {
      if (ocresp.results.length > 0) {
        // Save bits of OC response that interest us
        // The first result is the best result
        let g = ocresp.results[0].geometry;
        response.data = {
          latLng: [g.lat, g.lng],
          formatted_address: ocresp.results[0].formatted
        };
      } else {
        // No results found; essentially a 404
        response.data = {
          latLng: null,
          formatted_address: ""
        };
      }
    } else {
      response.ok = false;
      response.error = `Server error: ${ocresp.status.code}: ${ocresp.status.text}`;
    }
    console.log("my response:", response);
  } catch (err) {
    response.ok = false;
    response.error = `Network error: ${err.message}`;
  }
  return response;
};
