import React from "react";
import styled from "styled-components";

const BackGround = ({ children }) => {
  return (
    <BG>
      <div>{children}</div>
    </BG>
  );
};

export default BackGround;

const BG = styled.main`
overflow: hidden;
    position: relative;
  width: 100vw;
  height: 100vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(23, 23, 240, 1) 25%,
    rgba(62, 66, 158, 1) 50%,
    rgba(23, 23, 240, 1) 75%,
    rgba(6, 6, 6, 1) 100%
  );
  background-size: 500% 500%;
  animation: animateBg 25s ease infinite;
    /* &::after{
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        opacity: 0.8;
        background-image: linear-gradient(
  90deg,
  hsl(240deg 15% 92%) 0%,
  hsl(277deg 10% 90%) 22%,
  hsl(319deg 9% 89%) 33%,
  hsl(343deg 10% 87%) 42%,
  hsl(0deg 9% 86%) 50%,
  hsl(14deg 9% 84%) 58%,
  hsl(25deg 7% 82%) 67%,
  hsl(38deg 5% 81%) 78%,
  hsl(60deg 3% 79%) 100%
);
background-size: 1% 100%;
background-repeat: no-repeat;
animation: animateBg 25s ease infinite;
opacity: 0.5;
border: none;
    } */




  @keyframes animateBg {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0 0;
    }
  }

  @keyframes animateStroke {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0 0;
    }
  }
`;
