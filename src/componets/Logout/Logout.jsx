import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../containers/Auth/authSlice';
import { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  console.log(state);
  useEffect(() => {
    dispatch(authLogout(null));
  }, []);

  return <Navigate to="/" />;
};

export default Logout;
