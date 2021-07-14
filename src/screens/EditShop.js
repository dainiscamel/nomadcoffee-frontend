import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import FormLayout from "../components/auth/FormLayout";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/auth/PageTitle";
import routes from "../routes";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const TitleContainer = styled.div`
  padding: 35px 40px 25px 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: ${(props) => props.theme.accent};
  line-height: 1.8;
  font-weight: 600;
`;

const SubTitle = styled.h2`
  font-size: 18px;
`;

const Label = styled.label`
  color: ${(props) => props.theme.accent};
  width: 100%;
  font-weight: 600;
  font-size: 16px;
  margin: 10px 0;
`;

const FormButton = styled(Button)`
  margin-top: 35px;
`;

const COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      latitude
      longitude
      categories {
        name
        slug
      }
    }
  }
`;

const EDIT_SHOP_QUERY = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String!
    $latitude: String
    $longitude: String
    $categories: String!
    $photos: Upload
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photos: $photos
    ) {
      ok
      error
    }
  }
`;

function EditShop() {
  const { id } = useParams();
  const history = useHistory();

  const onError = ({ networkError }) => {
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  };
  const { data } = useQuery(COFFEE_SHOP_QUERY, {
    variables: { id: +id },
    onError,
  });

  const { register, handleSubmit, errors, formState, setError, clearErrors } =
    useForm({
      mode: "onChange",
      defaultValues: {
        name: data?.seeCoffeeShop?.name,
        latitude: data?.seeCoffeeShop?.latitude,
        longitude: data?.seeCoffeeShop?.longitude,
        categories: data?.seeCoffeeShop?.categories
          ?.map((cate) => cate?.name)
          .join(","),
        photos: data?.seeCoffeeShop?.photos,
        result: "",
      },
    });

  const onCompleted = (data) => {
    const {
      editCoffeeShop: { ok },
    } = data;
    console.log(ok);
    if (!ok) {
      return setError("result", {
        message: "Can't edit shop :-().",
      });
    }
    history.push(routes.home);
  };

  const [editCoffeeShop, { loading }] = useMutation(EDIT_SHOP_QUERY, {
    onCompleted,
    onError,
  });

  function onSubmitValid(data) {
    if (loading) {
      return;
    }

    editCoffeeShop({
      variables: {
        id: +id,
        ...data,
        ...(data.photos && { photos: data.photos[0] }),
      },
    });
  }

  const clearEditShopError = () => {
    clearErrors("result");
  };

  return (
    <FormLayout>
      <PageTitle title="EditShop" />
      <TitleContainer>
        <Title>Edit your Coffee Shop. </Title>
        <SubTitle>
          Please fill in the details and sharing with your friends.
        </SubTitle>
      </TitleContainer>
      <FormBox>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Label>Name</Label>
          <Input
            ref={register({
              required: "Name is required.",
            })}
            name="name"
            type="text"
            placeholder="가게명"
            hasError={Boolean(errors?.name?.message)}
            onChange={clearEditShopError}
          />

          <FormError message={errors?.name?.message} />
          <Label>Latitude</Label>
          <Input
            ref={register({
              required: "Latitude is required.",
            })}
            name="latitude"
            type="text"
            placeholder="위도"
            hasError={Boolean(errors?.latitude?.message)}
            onChange={clearEditShopError}
          />
          <FormError message={errors?.latitude?.message} />
          <Label>Longitude</Label>
          <Input
            ref={register({
              required: "Longitude is required.",
            })}
            name="longitude"
            type="text"
            placeholder="경도"
            hasError={Boolean(errors?.longitude?.message)}
            onChange={clearEditShopError}
          />
          <FormError message={errors?.longitude?.message} />

          <Label>Shop Image</Label>
          <Input
            ref={register()}
            name="photos"
            type="file"
            placeholder="가게 이미지"
            hasError={Boolean(errors?.photos?.message)}
            onChange={clearEditShopError}
          />
          <FormError message={errors?.photos?.message} />

          <Label>Category</Label>
          <Input
            ref={register({
              required: "Category is required.",
              minLength: {
                message: "Categories should be longer than 5 chars.",
              },
            })}
            name="categories"
            type="text"
            placeholder="1개 이상의 카테로리를 콤마(,)로 구분하여주세요."
            hasError={Boolean(errors?.categories?.message)}
            onChange={clearEditShopError}
          />
          <FormError message={errors?.categories?.message} />
          <FormButton
            type="submit"
            value={loading ? "Loading..." : "Edit Shop"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
    </FormLayout>
  );
}

export default EditShop;
