const axios = require("axios");

const getCityFromLatLng = async (lat, lng) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat,
          lon: lng,
        },
        headers: {
          "User-Agent": "Employee-Management-System",
        },
      }
    );

    const address = response.data.address || {};

    return (
      address.suburb ||
      address.city ||
      address.town ||
      address.village ||
      address.state ||
      "Unknown Location"
    );
  } catch (error) {
    console.error("Reverse geocoding error:", error.message);
    return "Unknown Location";
  }
};

module.exports = getCityFromLatLng;
