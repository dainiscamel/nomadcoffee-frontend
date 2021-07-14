import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import styled from "styled-components";
import PageTitle from "../components/auth/PageTitle";
import CoffeeShop from "../components/CoffeeShop";
import Loading from "../components/Loading";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
`;

const COFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      id
      name
      latitude
      longitude
      user {
        id
      }
      photos {
        id
        url
      }
      categories {
        id
        name
        slug
      }
      createdAt
      updatedAt
    }
  }
`;

function Home() {
  const { data, loading, fetchMore } = useQuery(COFFEESHOPS_QUERY, {
    variables: {
      offset: 0,
    },
  });

  useEffect(() => {
    const handleScroll = (e) => {
      const bottom =
        e.target.scrollingElement.offsetHeight <=
        e.target.scrollingElement.clientHeight +
          e.target.scrollingElement.scrollTop +
          10;
      if (bottom) {
        if (data?.seeCoffeeShops) {
          fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.length,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                seeCoffeeShops: [
                  ...prev.seeCoffeeShops,
                  ...fetchMoreResult.seeCoffeeShops,
                ],
              });
            },
          });
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, fetchMore]);

  return (
    <div>
      <PageTitle title="Home" />
      {loading ? <Loading /> : null}
      <CardContainer>
        {data &&
          data?.seeCoffeeShops?.map((shop, index) => (
            <CoffeeShop
              key={index}
              id={shop.id}
              name={shop.name}
              userId={shop.user.id}
              latitude={shop.latitude}
              longitude={shop.longitude}
              photos={shop.photos}
              categories={shop.categories}
            />
          ))}
      </CardContainer>
    </div>
  );
}
export default Home;
