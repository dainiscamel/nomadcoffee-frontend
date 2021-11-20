import { gql, useMutation } from "@apollo/client";
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
import { useEffect, useState } from "react";

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

const ADD_SHOP_QUERY = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $categories: String!
    $photos: Upload
  ) {
    createCoffeeShop(
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

function AddShop() {
  const history = useHistory();
  const { register, handleSubmit, errors, formState, setError, clearErrors } =
    useForm({
      mode: "onChange",
    });

  const onCompleted = (data) => {
    console.log("complete", data);
    const {
      createCoffeeShop: { ok },
    } = data;

    if (!ok) {
      return setError("result", {
        message: "Can't add shop :-().",
      });
    }
    history.push(routes.home);
  };

  const [createCoffeeShop, { loading }] = useMutation(ADD_SHOP_QUERY, {
    onCompleted,
  });
  const [image, setImage] = useState();

  function onSubmitValid(data) {
    console.log("submit", data, image);

    if (loading) {
      return;
    }
    const { name, latitude, longitude, categories, photos } = data;
    createCoffeeShop({
      variables: {
        name,
        latitude,
        longitude,
        categories,
        photos: image,
      },
    });
  }

  const clearAddShopError = () => {
    clearErrors("result");
  };

  return (
    <FormLayout>
      <PageTitle title="AddShop" />
      <TitleContainer>
        <Title>Make your own Coffee Shop. </Title>
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
            onChange={clearAddShopError}
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
            onChange={clearAddShopError}
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
            onChange={clearAddShopError}
          />
          <FormError message={errors?.longitude?.message} />

          <Label>Shop Image</Label>
          <Input
            ref={register()}
            name="photos"
            type="file"
            accept=".png, .jpg"
            placeholder="가게 이미지"
            hasError={Boolean(errors?.photos?.message)}
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            // onChange={clearAddShopError}
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
            onChange={clearAddShopError}
          />
          <FormError message={errors?.categories?.message} />
          <FormButton
            type="submit"
            value={loading ? "Loading..." : "Add Shop"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
    </FormLayout>
  );
}

export default AddShop;
