import { useDispatch } from 'react-redux';
import { authLogout } from '../../containers/Auth/authSlice';
import { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

const Logout = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authLogout({token:null}));
  }, [dispatch]);

  return <Navigate to="/" />;
};

export default Logout;
