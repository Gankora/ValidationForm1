import { useState, useEffect } from 'react';
import { validate } from './utils';
import styles from './field.module.css';

export const Field = ({
	// Field - универсальный компонент для обработки полей
	value,
	setValue,
	setIsValid,
	validators,
	dependencies = {},
	forceValidation = () => false,
	...props
}) => {
	const [error, setError] = useState(null);
	const [isDirty, setIsDirty] = useState(); // флаг для грязных полей (если поле было тронуто)

	const validateField = (currentValue, shouldValidation) => {
		let error = null;
		let isValid = false;

		// если shouldValidation = true, выполняется условие
		if (shouldValidation) {
			error = validate(currentValue, validators);
			isValid = error === null; // isValid вычисляется в зависимости если есть ошибка / если ошибки нет isValid = true
		}

		setError(error); // validate передаёт либо null, либо 'сообщение об ошибке', что в данном случае используется в JSX разметке.
		setIsValid(isValid); // true или false // нужен для переменной const isFormValid в App.js
	};

	useEffect(() => {
		validateField(value, isDirty);
		// хук используется при редакции зависимого поля (реагирует на изменения 'password')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...Object.values(dependencies)]);
	//...dependencies разворачиваем с помощью spread'a, чтобы значения шли через запятую (Object.values(dependencies) - преобразовываем в массив)

	const onChange = ({ target }) => {
		setIsDirty(true);
		setValue(target.value);
		const isForceValidated = forceValidation(target.value); // value - является значение предыдущего рендера, поэтому указываем 'target.value' // получаем 'true'

		validateField(target.value, isForceValidated);
	};

	const onBlur = () => {
		//console.log('onBlur Value', value);W

		validateField(value, isDirty);
		// в данному случае value будет ссылаться на значение нового рендера, указанного в const onChange
	};

	return (
		<div>
			<input onChange={onChange} onBlur={onBlur} {...props} />
			{error && <span className={styles.errorLabel}>{error}</span>}
		</div>
	);
};
