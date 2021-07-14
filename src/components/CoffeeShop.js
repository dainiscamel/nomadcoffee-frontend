import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../hooks/useUser";

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
    background-color: rgba(214, 169, 59, 0.2);
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
  display: inline-block;
  color: ${(props) => props.theme.accent};
  &:hover {
    color: white;
    font-weight: 600;
  }
`;

const Me = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.accent};
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function CoffeeShop({
  id,
  name,
  userId,
  latitude,
  longitude,
  photos,
  categories,
}) {
  const {
    data: { me },
  } = useUser();

  return (
    <Shop>
      {userId === me.id ? (
        <Link
          to={{
            pathname: `/shop/${id}`,
          }}
        >
          <Shadow></Shadow>
          <ShopImageWrapper>
            <Me>me</Me>
            {photos &&
              photos.map((photo) => (
                <ShopImage key={photo.id} src={photo.url} />
              ))}
          </ShopImageWrapper>
        </Link>
      ) : (
        <div>
          <ShopImageWrapper>
            {photos &&
              photos.map((photo) => (
                <ShopImage key={photo.id} src={photo.url} />
              ))}
          </ShopImageWrapper>
        </div>
      )}
      <ShopContent>
        <ShopName>{name}</ShopName>
        <ShopLocation>위도 : {latitude}</ShopLocation>
        <ShopLocation>경도 : {longitude}</ShopLocation>
        <h1>카테고리 : </h1>
        <ShopCategories>
          {categories &&
            categories.map((category) => (
              <span key={category.id} style={{ textDecoration: "underline" }}>
                {category.slug}
                <span
                  style={{ textDecoration: "none", display: "inline-block" }}
                >
                  &nbsp;
                </span>
              </span>
            ))}
        </ShopCategories>
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
