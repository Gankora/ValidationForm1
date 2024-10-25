export const validate = (value, validators) => {
	let validationError = null;

	validators.some((validator) => {
		validationError = validator(value);

		//console.log('validationError', validationError);

		return validationError;
	});

	return validationError; // содержит либо null, либо "сообщение об ошибке"
};
/*
// validators - массив функций, попадающих в prop 'validator' в главном компоненте (App.js),
каждая функция принимает один параметр (value) и соответсвуют условию либо 'null', либо 'сообщение об ошибке'.
Сам const validate используется в компоненте field в const onBlur, где принимает массив "validators" и значение 'value',
которое применяется значением для функций массива "validators" компонента 'validate'.

Благодаря методу some перебирается массив этих валидаторов. Тот валидатор, показавший значение 'true',
т.е. 'сообщение об ошибке' (т.е. значение не null), остается в массиве, а метод some прекращает проверку валидатор в массиве и останавливается.
*/
