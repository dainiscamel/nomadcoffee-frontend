import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#d6a93b",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "#e5d6c6",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#000",
  borderColor: "#dcb571",
  accent: "#d6a93b",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
      box-sizing: border-box;
    }
    input {
      all: unset;
    }
    body {
        background-color:${(props) => props.theme.bgColor};
        font-size:14px;
        color:${(props) => props.theme.fontColor};
        font-family: 'Poppins', sans-serif;
    }
    a {
      text-decoration: none;
    }
`;
