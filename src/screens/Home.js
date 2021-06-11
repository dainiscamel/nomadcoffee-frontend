import { gql, useQuery } from "@apollo/client";
import PageTitle from "../components/auth/PageTitle";
import CoffeeShop from "../components/CoffeeShop";

const COFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      id
      name
      latitude
      longitude
      photos {
        id
        url
      }
      categories {
        name
        slug
      }
      createdAt
      updatedAt
    }
  }
`;

function Home() {
  const { data } = useQuery(COFFEESHOPS_QUERY, {
    variables: {
      page: 1,
    },
  });

  return (
    <div>
      <PageTitle title="Home" />
      {data &&
        data?.seeCoffeeShops?.map((shop) => (
          <CoffeeShop
            key={shop.id}
            id={shop.id}
            name={shop.name}
            latitude={shop.latitude}
            longitude={shop.longitude}
            photos={shop.photos}
            categories={shop.categories}
          />
        ))}
    </div>
  );
}
export default Home;
