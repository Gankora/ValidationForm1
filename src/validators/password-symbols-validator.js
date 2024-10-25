export const passwordSymbolValidator = (value) =>
	/^\S+$/.test(value) && /[a-zA-Z]+/.test(value) && /[0-9]+/.test(value)
		? ///\W+/.test(value)
			null
		: 'Пароль должен состоять из букв, цифр и символов';
