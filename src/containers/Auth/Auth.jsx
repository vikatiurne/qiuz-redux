import {useState } from 'react';
import { RxEyeOpen, RxEyeClosed } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../componets/UI/Button/Button';
import Input from '../../componets/UI/Input/Input';

import { authLogout, fetchAuth } from './authSlice';
import styles from './Auth.module.css';

const Auth = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPass, setInputPass] = useState('');
  const [tachedName, setTachedName] = useState(false);
  const [tachedPass, setTachedPass] = useState(false);
  const [eye, setEye] = useState(true);
  const [inputType, setInputType] = useState('password');

  // const isAutentification = useSelector((state) => !!state.auth.token);
  const expires = useSelector((state) => state.auth.expires);
  const dispatch = useDispatch();

  const handlerInputEmail = (e) => {
    setTachedName(true);
    setInputEmail(e.target.value);
  };
  const handlerInputPass = (e) => {
    setTachedPass(true);
    setInputPass(e.target.value);
  };

  const openEyeHandler = () => {
    setEye((prev) => !prev);
    if (inputType === 'password') setInputType('text');
  };
  const closeEyeHandler = () => {
    setEye((prev) => !prev);
    if (inputType === 'text') setInputType('password');
  };

  const authHandler = async () => {
    dispatch(
      fetchAuth({ email: inputEmail, password: inputPass, isLogin: true })
    );
    setInputEmail('');
    setInputPass('');
    setTachedName(false);
    setTachedPass(false);
    setTimeout(() => {
      dispatch(authLogout(null));
    }, expires * 1000);
  };

  const registerHandler = () => {
    dispatch(
      fetchAuth({ email: inputEmail, password: inputPass, isLogin: false })
    );
    setInputEmail('');
    setInputPass('');
    setTachedName(false);
    setTachedPass(false);
  };

  return (
    <div className={styles.auth}>
      <p>
        Введіть e:mail та пароль
        <br />
        <span>або пройдіть реєстрацію</span>
      </p>
      <div className={styles.formWrapper}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            inputType="email"
            onChangeInput={handlerInputEmail}
            placeholder="Введіть e:mail"
            value={inputEmail}
            autocomplete="email"
            inputLabel="E:mail"
            errorMessage="E:mail має містити символ @"
            inputMessage="E:mail має містити символ @"
            valid={inputEmail.trim().length >= 8}
            tached={tachedName}
          />
          <Input
            inputType={inputType}
            onChangeInput={handlerInputPass}
            placeholder="Введіть пароль"
            value={inputPass}
            autocomplete="current-password"
            inputLabel="Пароль"
            errorMessage="Введіть коректний пароль"
            inputMessage="Пароль має містити мінімум 8 символів"
            valid={inputPass.trim().length >= 8}
            tached={tachedPass}
          />
          <RxEyeClosed
            onClick={openEyeHandler}
            className={eye ? styles.visible : styles.hide}
          />
          <RxEyeOpen
            onClick={closeEyeHandler}
            className={eye ? styles.hide : styles.visible}
          />
          <div className={styles.authActive}>
            <Link to="/">
              <Button
                onclick={authHandler}
                type="success"
                valid={
                  inputPass.trim().length >= 8 && inputEmail.trim().length >= 8
                }
                title="Увійти"
              >
                Вхід
              </Button>
            </Link>
            <Button
              onclick={registerHandler}
              type="primary"
              valid={true}
              title="Для реєстрації введіть e:mail та пароль"
            >
              Реєстрація
            </Button>
          </div>
          <small>***авторизація дає право самостійно створювати тести</small>
        </form>
      </div>
    </div>
  );
};

export default Auth;
