/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import './App.css';
import Home from './components/Home/Home';
import LoginUser from './components/LoginUser/LoginUser';
import RegisterUser from './components/RegisterUser/RegisterUser';
import Hero from './components/Hero/Hero';
import AuthService from './services/authService';
import BookService from './services/bookService';

const authService = new AuthService();
const bookService = new BookService();
export const UserContext = createContext();
const AuthProvider = ({ children }) => {
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    authService,
    bookService,
    updateService: () => setContextServices({ ...contextServices }),
  };

  const [contextServices, setContextServices] = useState(context);

  return (
    <UserContext.Provider value={contextServices}>
      {children}
    </UserContext.Provider>
  );
};

const PrivateRoute = ({ children, ...props }) => {
  const location = useLocation(); // useLocation from react router dom
  const context = useContext(UserContext);

  if (!context.authService.isLoggedIn) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Navigate {...props} to="/login" state={{ from: location }} replace />
    );
  } // Navigate is from react router dom instead of Redirect

  return children;
};

const App = () => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} exact />
          <Route path="/login" element={<LoginUser />} exact />
          <Route path="/register" element={<RegisterUser />} exact />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

export default App;

/* 
4. Create Components/Routes for:
- Forgot a password
- Reset Password
- Update User Info or Password
- Home/NewsFeed
- Upload a photo
*/
