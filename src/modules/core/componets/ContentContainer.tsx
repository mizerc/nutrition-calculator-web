// import tw from "twin.macro";
// const ContentContainer = tw.div`border ml-64 mt-16 p-4`;

import { COLORS } from "@/styles/Colors";
import styled from "styled-components";

const ContentContainer = styled.div`
  /* display: fixed; */
  /* left: 200px; */
  margin-top: 4rem;
  margin-left: 16rem;
  background-color: ${COLORS.contentBackground};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-top-left-radius: 20px;
`;

export default ContentContainer;
