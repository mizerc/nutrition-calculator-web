import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "@/styles/Colors";

import Button from "./Button";

interface ButtonToggleProps {
  $active: boolean;
}

const ButtonToggle = styled(Button)<ButtonToggleProps>`
  background-color: ${({ $active }) =>
    $active ? COLORS.buttonActiveBg : COLORS.buttonBg};
  color: ${({ $active }) =>
    $active ? COLORS.buttonActiveText : COLORS.buttonText};
  transition: background 0.2s ease;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? COLORS.buttonActiveHover : COLORS.buttonBgHover};
  }
`;

interface StatefulButtonProps {
  onToggle?: (active: boolean) => void; // <-- explicitly typed!
  children: React.ReactNode;
}

export default function StatefulButton({
  onToggle,
  children,
}: StatefulButtonProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive((prev) => !prev);
    if (onToggle) onToggle(!active); // optional callback for parent
  };

  return (
    <ButtonToggle $active={active} onClick={handleClick}>
      {children}
    </ButtonToggle>
  );
}
