// import tw from "twin.macro";
// const Button = tw.button`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`;
// export default Button;

import { COLORS } from "@/styles/Colors";
import styled from "styled-components";

const Button = styled.button`
  background-color: ${COLORS.buttonBg};
  color: ${COLORS.buttonText};
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: ${COLORS.buttonBgHover}; /* blue-600 */
  }
`;

export default Button;
