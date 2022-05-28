import { createGlobalStyle } from "styled-components";

export const colors = {
  primary: "#FFC93F",
};

export const GlobalStyle = createGlobalStyle`
body {
  background: #696969;
  color: #fff;
}

body, input {
  font-family: 'Roboto', sans-serif;
}
`;
