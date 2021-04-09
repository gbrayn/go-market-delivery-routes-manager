import config from '../config';

const ACCESS_TOKEN_MAPBOX = `access_token=${config.mapbox.token}`;

export const fetchLocalMapBox = (local: string) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAPBOX}`
  )
    .then((response) => response.json())
    .then((data) => data);
