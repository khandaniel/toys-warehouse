import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../../../config';
import { loadProfile } from '../../../store/actions/authActions';

const LogoutLink = () => {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.profile.email);
  const profileError = useSelector((state) => state.auth.profileError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProfile());
  }, [token, dispatch]);

  return isAuthorized ? (
    <div>
      <Link to={`${routes.logout}?token=${token}`}>
        Log Out
        { !profileError && ( <code>({email})</code> )
        }
      </Link>
    </div>
  ) : null;
};

export default LogoutLink;
