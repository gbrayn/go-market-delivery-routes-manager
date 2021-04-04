const ACESS_TOKEN_MAPBOX = `access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

const fetchLocalMapBox = (local: string) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  fetch(`${process.env.MAPBOX_PLACES_URL}/${local}.json?${ACESS_TOKEN_MAPBOX}`)
    .then((response) => response.json())
    .then((data) => data);

export default fetchLocalMapBox;
