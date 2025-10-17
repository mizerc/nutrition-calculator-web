import styled from "styled-components";
import Button from "./Button"; // Import your base Button component

const ButtonEdit = styled(Button)`
  background-color: yellow;
  color: black;

  &:hover {
    background-color: #facc15; /* similar to Tailwind's yellow-400 */
  }
`;

export default ButtonEdit;
