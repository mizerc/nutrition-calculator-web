import styled from "styled-components";
import { useForm, type SubmitHandler } from "react-hook-form";

const Container = styled.form`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* all direct children */
  > * {
    border: 1px solid blue;
    margin: 8px;
  }
`;

// const Input = styled.input`
//   color: ${COLORS.textPrimary};
//   padding: 0.5rem 0.75rem;
//   border: 1px solid ${COLORS.inputBorder};
//   border-radius: 8px;
//   font-size: 1rem;
//   min-width: 200px;

//   &:focus {
//     outline: none;
//     border-color: ${COLORS.inputBorderFocused};
//   }
// `;

type GenderEnum = "female" | "male" | "other";

interface IFormInput {
  firstName: string;
  gender: GenderEnum;
}

export default function Debug() {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue="test" {...register("firstName")} />
      {/* <label>
        Room type:
        <select>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
      </label> */}
      {/* <Input
        name="name"
        value={value}
        onChange={handleOnChange}
        type="number"
        min={0}
        max={100}
        required
        autoComplete="off"
      />
      <input type="text" name="username" />
      <input type="password" name="password" />
      <input type="number" name="age" />
      <input type="checkbox" name="subscribe" />
      <input type="radio" name="gender" value="male" />
      <p>{value}</p>
      <select name="state">
        <option>Arizona</option>
        <option>Texas</option>
      </select>
       */}
      <button type="submit">Login</button>
    </Container>
  );
}
