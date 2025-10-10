import { COLORS } from "@/styles/Colors";
import styled from "styled-components";

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  color: ${COLORS.textPrimary};
  padding: 0.5rem 0.75rem;
  border: 1px solid #53647c; /* gray-600 */
  border-radius: 2px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6; /* blue-500 */
  }
`;

interface FormInputProps {
  label: string;
  value: string;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  readOnly = false,
  onChange,
}: FormInputProps) => {
  return (
    <FieldGroup>
      {/* <Label>{label}</Label> */}
      <Input
        readOnly={readOnly}
        disabled={readOnly}
        type="text"
        name="name"
        value={value}
        onChange={onChange}
        placeholder={label}
        required
        autoComplete="off"
      />
    </FieldGroup>
  );
};

export default FormInput;
