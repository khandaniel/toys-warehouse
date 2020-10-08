import React from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { routes } from '../../config';
import LogoutLink from '../Dashboard/LogoutLink/LogoutLink';

const Navigation = () => (
  <Paper style={{
    textAlign: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 20, padding: 20,
  }}
  >
    <div><Link to={routes.base}>Home</Link></div>
    <div><Link to={routes.transactions}>Transactions</Link></div>
    <div><Link to={routes.categories}>Manage Categories</Link></div>
    <div><Link to={routes.about}>About</Link></div>
    <LogoutLink />
  </Paper>
);

export default Navigation;
