import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/auth/PageTitle";
import routes from "../routes";

const ADD_SHOP_QUERY = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $categories: String!
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
    ) {
      ok
      error
    }
  }
`;

function AddShop() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
    getValues,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data) => {
    if (loading) {
      return;
    }

    const {
      createCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    history.push(routes.home);
  };

  const [createCoffeeShop, { loading }] = useMutation(ADD_SHOP_QUERY, {
    onCompleted,
  });

  function onSubmitValid(data) {
    if (loading) {
      return;
    }
    const { name, latitude, longitude, categories } = getValues();

    createCoffeeShop({
      variables: {
        name,
        latitude,
        longitude,
        categories,
      },
    });
  }

  const clearAddShopError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="AddShop" />
      <FormBox>
        <h1>Make your own Coffee Shop. </h1>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Name is required.",
            })}
            name="name"
            type="text"
            placeholder="Name"
            hasError={Boolean(errors?.name?.message)}
            onChange={clearAddShopError}
          />

          <FormError message={errors?.name?.message} />
          <Input
            ref={register({
              required: "Latitude is required.",
            })}
            name="latitude"
            type="text"
            placeholder="Latitude"
            hasError={Boolean(errors?.latitude?.message)}
            onChange={clearAddShopError}
          />
          <FormError message={errors?.latitude?.message} />
          <Input
            ref={register({
              required: "Longitude is required.",
            })}
            name="longitude"
            type="text"
            placeholder="Longitude"
            hasError={Boolean(errors?.longitude?.message)}
            onChange={clearAddShopError}
          />
          <FormError message={errors?.longitude?.message} />
          <Input
            ref={register({
              required: "Categories is required.",
              minLength: {
                message: "Categories should be longer than 5 chars.",
              },
            })}
            name="categories"
            type="text"
            placeholder="Categories"
            hasError={Boolean(errors?.categories?.message)}
            onChange={clearAddShopError}
          />
          <FormError message={errors?.categories?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Add Shop"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
    </AuthLayout>
  );
}

export default AddShop;
