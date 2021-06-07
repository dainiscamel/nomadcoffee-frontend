import { gql, useMutation } from "@apollo/client";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
import Input from "../components/auth/Input";
import PageTitle from "../components/auth/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
  color: #385285;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $password: String!
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SingUp() {
  const history = useHistory();
  const onCompleted = (data) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home, {
      message: "Account created. Please log in.",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon
            icon={faCoffee}
            size="3x"
            style={{ color: "#d6a93b" }}
          />
          <Subtitle>Sign up to find some coffe place.</Subtitle>
        </HeaderContainer>

        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            type="text"
            ref={register({
              required: "Name is required.",
            })}
            name="name"
            placeholder="Name"
            hasError={Boolean(errors?.name?.message)}
          />
          <FormError message={errors?.name?.message} />
          <Input
            type="text"
            ref={register({
              required: "Username is required.",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            name="username"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            type="text"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
            name="email"
            ref={register({
              required: "Email is required.",
              pattern: {
                value: /^[\w.]+@[\w.]+\.[A-Za-z]{2,3}$/i,
                message: "Invalid email address.",
              },
            })}
          />
          <FormError message={errors?.email?.message} />
          <Input
            type="password"
            name="password"
            ref={register({
              required: "Password is required.",
              // 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식
              pattern: {
                value:
                  /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                message:
                  "Password requires 8-15 letters including Special Characters & Number.",
              },
            })}
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
export default SingUp;
