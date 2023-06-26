import InputValueType from "./InputValue.type";

type ValidatorType = (value?: InputValueType) => string | undefined;

export default ValidatorType;