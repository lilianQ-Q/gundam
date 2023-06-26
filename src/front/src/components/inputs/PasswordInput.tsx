// PasswordInput.tsx
import Input from "./Input";
import withValidation, { RequiredInputProps, ValueType } from "./WithValidation";

const requiredValidator = (value: ValueType) =>
  !value.toString().trim() ? "Required" : undefined;

const minLengthValidator = (value: ValueType) =>
  value && value.toString().length < 8 ? "Too short" : undefined;

const difficultyValidator = (value: ValueType) =>
  value && !/^(?=.*\d)(?=.*[A-Za-z]).*$/.test(value.toString())
  ? "Must contain at least one number and letter"
  : undefined;

  const validators = [requiredValidator, minLengthValidator, difficultyValidator];

  const PasswordInput: React.FC<RequiredInputProps> = (props) => {
    return <Input {...props} />;
  };
  
export default withValidation(PasswordInput, validators);
