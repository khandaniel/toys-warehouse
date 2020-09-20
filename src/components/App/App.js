import React from 'react';
import './App.css';
import LoginScreen from "../LoginScreen";
import Dashboard from "../Dashboard";
import {connect} from "react-redux";

function App({ isAuthenticated }) {
  return isAuthenticated ? <Dashboard /> : <LoginScreen />;
}

export default connect((state) => ({isAuthenticated: !!state.userToken }))(App);
