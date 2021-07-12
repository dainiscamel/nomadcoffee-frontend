import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Shop = styled.div`
  border: 1px solid ${(props) => props.theme.accent};
  margin-top: 5%;
  position: relative;
`;

const Shadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const ShopImageWrapper = styled.div`
  height: 250px;
`;

const ShopImage = styled.img`
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ShopContent = styled.div`
  padding: 10px;
  color: ${(props) => props.theme.accent};
  font-size: 16px;
  line-height: 1.2;
`;

const ShopName = styled.h1`
  font-size: 32px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
`;

const ShopLocation = styled.h1``;

const ShopCategories = styled.div`
  text-decoration: underline;
  color: ${(props) => props.theme.accent};
  &:hover {
    color: white;
    font-weight: 600;
  }
`;

function CoffeeShop({ id, name, latitude, longitude, photos, categories }) {
  return (
    <Shop>
      <Link to={`/shop/${id}`}>
        <Shadow></Shadow>
        <ShopImageWrapper>
          {photos &&
            photos.map((photo) => <ShopImage key={photo.id} src={photo.url} />)}
        </ShopImageWrapper>
      </Link>
      <ShopContent>
        <ShopName>{name}</ShopName>
        <ShopLocation>위도 : {latitude}</ShopLocation>
        <ShopLocation>경도 : {longitude}</ShopLocation>
        <h1>카테고리 : </h1>
        {categories &&
          categories.map((category, index) => (
            <Link to={`/shop/${id}`}>
              <ShopCategories key={++index}>{category.slug}</ShopCategories>
            </Link>
          ))}
      </ShopContent>
    </Shop>
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
