export const passwordMinValidator = (value) =>
	value.length >= 8 ? null : 'Пароль должен быть не менее 8 символов';
