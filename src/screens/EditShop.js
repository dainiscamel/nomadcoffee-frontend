import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/auth/PageTitle";

const EDIT_SHOP_QUERY = gql`
  mutation editCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $categories: String!
  ) {
    editCoffeeShop(
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

const DELETE_SHOP_QUERY = gql`
  mutation editCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $categories: String!
  ) {
    editCoffeeShop(
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

function EditShop() {
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
    console.log(data);
  };

  const [addshop, { loading }] = useMutation(EDIT_SHOP_QUERY, {
    onCompleted,
  });

  function onSubmitValid(data) {
    console.log("dd");
    if (loading) {
      return;
    }
  }
  return (
    <AuthLayout>
      <PageTitle title="AddShop" />
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: "Name is required.",
            })}
            name="Name"
            type="text"
            placeholder="Name"
            hasError={Boolean(errors?.name?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "Password is required.",
            })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Input
            ref={register({
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log In"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
    </AuthLayout>
  );
}

export default EditShop;
