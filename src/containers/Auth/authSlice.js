import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = { token: null, expires: 3600 };

export const fetchAuth = createAsyncThunk(
  'auth/fetchAuth',
  async ({ email, password, isLogin }) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url;
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXPJFdxpRxSO6L5VFX0Hdc2gl5RSQQthQ';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXPJFdxpRxSO6L5VFX0Hdc2gl5RSQQthQ';
    }
    const response = await axios.post(url, authData);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: {
      reducer(state, action) {
        console.log(action.payload);
        state.token = action.payload;
        // очистка localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('experitionDate');
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAuth.fulfilled, (state, { payload }) => {
        // для доступа к полученому от сервера token, кладем его в localStorage
        localStorage.setItem('token', payload.idToken);
        // заводим локальный id пользователя
        localStorage.setItem('userId', payload.localId);
        // т.к. токен дан на 1час(3600сек), то нужно проверить если час прошел- нужно закончить сессию и получить новый токен(заново авторизироваться)
        // создаем константу с временем когда истекает сессия(получаем текущее время + то время что дает сервер)
        const experitionDate = new Date(
          new Date().getTime() + payload.expiresIn * 1000
        );
        // сохраняем время когда истечет сессия в localStorage
        localStorage.setItem('experitionDate', experitionDate);
        state.token = payload.idToken;
        state.expires = payload.expiresIn;
        console.log(current(state));
      })
      .addCase(fetchAuth.rejected, (state, action) => {});
  },
});

export const { authentication, authLogout } = authSlice.actions;

export default authSlice.reducer;
