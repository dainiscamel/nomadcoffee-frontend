import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: ${(props) => props.theme.bgColor};
  border: 0.5px solid
    ${(props) => (props.hasError ? "#c93429" : props.theme.borderColor)};
  box-sizing: border-box;
  margin-bottom: 5px;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;
