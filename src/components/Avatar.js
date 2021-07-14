import styled from "styled-components";

const SAvatar = styled.div`
  width: ${(props) => (props.lg ? "30px" : "35px")};
  height: ${(props) => (props.lg ? "30px" : "35px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
  display: flex;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

function Avatar({ url = "", lg = false }) {
  return <SAvatar lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
}

export default Avatar;
