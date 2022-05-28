import styled from "styled-components";

type Props = {
  showOnHover?: boolean;
};

const IconButton = styled.button<Props>`
  background: none;
  border: none;
  color: #ffc93f;
  cursor: pointer;

  &:hover {
    // display: inline-block;
    transform: translateY(-1px);
  }
  /* ${(props) =>
    props.showOnHover &&
    `
  // display: none;

  &:hover {
    // display: inline-block;
    transform: translateY(0.25px):
  }
  `} */
`;

export default IconButton;
