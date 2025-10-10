import { COLORS } from "@/styles/Colors";
import styled from "styled-components";

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-family: "Ubuntu";
  color: ${COLORS.textPrimary};
`;

const Input = styled.input`
  color: ${COLORS.textPrimary};
  padding: 0.5rem 0.75rem;
  border: 1px solid ${COLORS.inputBorder};
  border-radius: 8px;
  font-size: 1rem;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: ${COLORS.inputBorderFocused};
  }
`;

interface FormInputProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string | readonly string[] | number | undefined;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  type = "text",
  placeholder = "",
  readOnly = false,
  onChange,
}: FormInputProps) => {
  return (
    <FieldGroup>
      <Label>{label}</Label>
      <Input
        readOnly={readOnly}
        disabled={readOnly}
        type={type}
        name="name"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        autoComplete="off"
      />
    </FieldGroup>
  );
};

export default FormInput;
