// просмотр видео 1 час ровно
import { useState, useRef, useEffect } from 'react';
import { Field } from './components';
import {
	emailValidator,
	passwordMinValidator,
	passwordSymbolValidator,
} from './validators';
import styles from './app.module.css';

function App() {
	const [email, setEmail] = useState(''); // email
	const [password, setPassword] = useState(''); // пароль
	const [passcheck, setPasscheck] = useState(''); // проверка пароля

	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [isPasscheckValid, setIsPasscheckValid] = useState(false);

	const submitButtonRef = useRef(null);

	const isFormValid = isEmailValid && isPasswordValid && isPasscheckValid; // валидность трёх полей

	// useEffect отслеживает изменение данных
	useEffect(() => {
		submitButtonRef.current.focus();
	}, [isFormValid]);

	const onSubmit = (e) => {
		e.preventDefault(); // чтобы страница не перезагружалась
		console.log({ email, password });
		alert('Регистрация прошла успешно');
	};

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<Field
					type="text"
					name="email"
					placeholder="Почта"
					value={email}
					setValue={setEmail}
					setIsValid={setIsEmailValid}
					validators={[emailValidator]}
				/>
				<Field
					type="password"
					name="password"
					placeholder="Пароль"
					value={password}
					setValue={setPassword}
					setIsValid={setIsPasswordValid}
					validators={[passwordMinValidator, passwordSymbolValidator]}
				/>
				<Field
					type="password"
					name="passcheck"
					placeholder="Повтор пароля..."
					value={passcheck}
					setValue={setPasscheck}
					setIsValid={setIsPasscheckValid}
					validators={[
						(value) => (value === password ? null : 'Пароли не совпадают'),
						// данный массив попадает в функцию 'validate' компонента 'Field', откуда используется значение 'value'
						// само значение 'value' образуетcя через функ. onChange, используя внутри себя 'setValue(target.value)'
					]}
					dependencies={{ password }}
					forceValidation={(value) => value.length > 0}
				/>
				<button type="submit" disabled={!isFormValid} ref={submitButtonRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
