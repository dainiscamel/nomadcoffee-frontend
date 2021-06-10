import PropTypes from "prop-types";

function CoffeeShop({ id, name, latitude, longitude, photos, categories }) {
  return (
    <div>
      <span>{name}</span>
      <span>{latitude}</span>
      <span>{longitude}</span>
      {photos && photos.map((photo, index) => <span>{photo.url}</span>)}
      {categories && categories.map((category) => <span>{category.slug}</span>)}
    </div>
  );
}

CoffeeShop.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ),
};

export default CoffeeShop;
