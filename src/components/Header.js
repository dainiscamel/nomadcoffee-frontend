import { useReactiveVar } from "@apollo/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./Avatar";

const SHeader = styled.header`
  width: 100%;
  height: 69px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
`;

const PlusIcon = styled(FontAwesomeIcon)`
  color: #d6a93b;
  margin-right: 10px;
`;

const Button = styled.div`
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 8px 15px;
  color: ${(props) => props.theme.accent};
  font-weight: 600;
  &:hover {
    background-color: ${(props) => props.theme.bor};
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  height: auto;
  width: 180px;
`;
function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();

  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <Logo src="/logo.png" />
          </Link>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <Link to={`/add`}>
                  <Button>
                    <PlusIcon icon={faPlus} className="fa-plus" size="lg" />
                    Add Shop
                  </Button>
                </Link>
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.username}`}>
                  <Avatar url={data?.me?.avatarURL} />
                </Link>
              </Icon>
            </IconsContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
export default Header;
