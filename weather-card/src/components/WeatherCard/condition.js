import React from "react";
import styled from "@emotion/styled";

const Condition = ({ temp, condition }) => {
  const Temp = styled.h1`
    font-family: "Fira Sans", sans-serif;
    font-size: 2rem;
    font-weight: 200;
  `;
  const Con = styled.h3`
    font-family: "Merriweather", sans-serif;
    font-size: 1.2rem;
  `;
  return (
    <>
      <Temp>{temp} °C</Temp>
      <Con>{condition} </Con>
    </>
  );
};

export default Condition;
