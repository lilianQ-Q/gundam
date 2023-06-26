import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React, { InputHTMLAttributes, useState } from "react";

export type ValueType = string | number | string[];

type ValidatorType = (value: ValueType) => string | undefined;

export interface RequiredInputProps extends InputHTMLAttributes<HTMLInputElement>
{
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	error?: string;
	icon?: IconProp;
	label?: string;
	value: ValueType;
}

interface ValidatedInputProps {
	validators?: ValidatorType[];
}

function withValidation<InputProps extends RequiredInputProps> (
	InputComponent: React.ComponentType<InputProps>,
	staticValidators: ValidatorType[] = []
) {
	return function InputWithValidation(props: InputProps & ValidatedInputProps) {

		const [finalized, setFinalized] = useState<boolean>(false);
		const { error, value, validators = [], ...inputProps} = props;

		const firstInvalidValidator = [
			...validators,
			...staticValidators
		].find(validate => !!validate(value));

		const validationError = finalized && firstInvalidValidator ? firstInvalidValidator(value) : undefined;

		function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
			setFinalized(false);
			if (props.onChange)
				props.onChange(event);
		}

		function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
			setFinalized(true);
			if (props.onBlur)
				props.onBlur(event);
		}

		return (
			<InputComponent 
				{...(inputProps as InputProps)}
				value={value}
				error={error || validationError}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
		)
	}
}

export default withValidation;