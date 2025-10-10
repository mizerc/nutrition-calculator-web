// import tw from "twin.macro";

import { COLORS } from "@/styles/Colors";
import styled from "styled-components";

const HeaderBar = styled.div`
  background-color: ${COLORS.headerBg};
  color: ${COLORS.textPrimary};
  border-bottom: 1px solid ${COLORS.headerBorder};
  position: fixed;
  top: 0;
  left: 16rem; /* 64 in Tailwind = 16rem */
  right: 0;
  height: 4rem; /* 16 in Tailwind = 4rem */
  display: flex;
  align-items: center;
  padding-left: 1rem; /* px-4 = 1rem left & right padding */
  padding-right: 1rem;
`;

export default HeaderBar;
