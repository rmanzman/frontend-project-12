import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './Chat/ChatPage';
import Signup from './Signup/SignupPage';
import Login from './Login/LoginPage';
import NotFound from './NotFound/NotFoundPage';
import PrivateRoute from '../routes/PrivateRoute';
import PublicRoute from '../routes/PublicRoute';
import { routes } from '../api/endpoints';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path={routes.chatPagePath()} element={<Chat />} exact />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path={routes.loginPagePath()} element={<Login />} />
        <Route path={routes.signupPagePath()} element={<Signup />} />
        <Route path={routes.notFoundPagePath()} element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
