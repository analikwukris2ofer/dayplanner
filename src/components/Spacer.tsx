import React from "react";

type Props = {
  flex?: number; //means it could be undefined or number. In other words it is not a required prop.
  height?: number;
  width?: number;
};
//You can use the method above or the one below.
// type Props =
//   | { flex: number; height?: never; width?: never }
//   | { flex?: never; height: number; width?: never }
//   | { flex?: never; height?: never; width?: number };
//basically it means the component will receive one of the two props above.

const Spacer: React.FC<Props> = ({ flex, height, width }) => {
  return <div style={{ flex, height, width }} />;
};

export default Spacer;
