import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/auth/PageTitle";
import routes from "../routes";

const SEE_SHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
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

const EDIT_SHOP_QUERY = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String!
    $latitude: String
    $longitude: String
    $photos: Upload
    $categories: String!
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      photos: $photos
      categories: $categories
    ) {
      ok
      error
    }
  }
`;

const DELETE_SHOP_QUERY = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

function EditShop() {
  const { id } = useParams();
  const history = useHistory();

  const onCompletedQuery = () => {
    console.log(data);

    setValue("name", data?.seeCoffeeShop?.name);
    setValue("latitude", data?.seeCoffeeShop?.latitude || "");
    setValue("longitude", data?.seeCoffeeShop?.longitude || "");
    // setValue(
    //   "photos",
    //   data?.seeCoffeeShop?.photos?.map((cate) => cate?.url).join("") || ""
    // );
    setValue(
      "categories",
      data?.seeCoffeeShop?.categories?.map((cate) => cate?.name).join("") || ""
    );
  };
  const { data } = useQuery(SEE_SHOP_QUERY, {
    variables: {
      id: Number.parseInt(id, 10),
    },
    onCompleted: onCompletedQuery,
  });

  const {
    register,
    handleSubmit,
    errors,
    formState,
    setValue,
    setError,
    getValues,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: data?.seeCoffeeShop?.name,
      latitude: data?.seeCoffeeShop?.latitude,
      longitude: data?.seeCoffeeShop?.longitude,
      categories: data?.seeCoffeeShop?.categories[0].name,
      photos: data?.seeCoffeeShop?.photos,
    },
  });
  const onCompleted = (data) => {
    console.log(data);
    const {
      editCoffeeShop: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
  };

  const [editCoffeeShop, { loading }] = useMutation(EDIT_SHOP_QUERY, {
    onCompleted,
  });

  const [deleteCoffeeShop] = useMutation(DELETE_SHOP_QUERY);

  const onDeleteHandler = () => {
    deleteCoffeeShop({
      variables: {
        id: Number.parseInt(id, 10),
      },
    });
    history.push(routes.home);
  };

  function onSubmitValid(data) {
    if (loading) {
      return;
    }
    const { name, latitude, longitude, categories, photos } = getValues();
    editCoffeeShop({
      variables: {
        id: Number.parseInt(id, 10),
        name,
        latitude,
        longitude,
        categories,
        photos,
      },
    });
  }
  return (
    <AuthLayout>
      <PageTitle title="EditShop" />
      <FormBox>
        <h1>Edit your coffee shop info.</h1>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register()}
            type="text"
            name="name"
            placeholder="Name"
            hasError={Boolean(errors?.name?.message)}
          />
          <FormError message={errors?.name?.message} />
          <Input
            ref={register()}
            type="text"
            name="latitude"
            placeholder="Latitude"
            hasError={Boolean(errors?.latitude?.message)}
          />
          <FormError message={errors?.latitude?.message} />
          <Input
            ref={register()}
            type="text"
            name="longitude"
            placeholder="Longitude"
            hasError={Boolean(errors?.longitude?.message)}
          />
          <FormError message={errors?.longitude?.message} />
          <Input
            ref={register()}
            type="file"
            name="photos"
            placeholder="Photos"
            accept="image/png, image/jpeg"
            hasError={Boolean(errors?.photos?.message)}
          />
          <FormError message={errors?.photos?.message} />
          <Input
            ref={register({
              required: "Categories is required.",
            })}
            name="categories"
            type="text"
            placeholder="Categories"
            hasError={Boolean(errors?.categories?.message)}
          />
          <FormError message={errors?.categories?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Edit"}
            disabled={!formState.isValid || loading}
          />

          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <Button onClick={onDeleteHandler} defaultValue="Delete Shop" />
    </AuthLayout>
  );
}

export default EditShop;
