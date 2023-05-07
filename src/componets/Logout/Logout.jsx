import { useDispatch, useSelector} from 'react-redux';
import { authLogout } from '../../containers/Auth/authSlice';
import { useEffect } from 'react';

import { Navigate } from 'react-router-dom';

const Logout = () => {

  const isAutentification = useSelector((state) => !!state.auth.token);
  console.log(isAutentification)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authLogout(null));
  }, [dispatch]);



  return <Navigate to="/" />;
};

export default Logout;
