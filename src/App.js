import React, { createContext, useContext } from "react";
import { 
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate,
  useLocation 
} from "react-router-dom";
import { theme } from './theme';
import { ThemeProvider } from 'styled-components';
import './App.css';
import Home from './components/Home/Home';
import LoginUser from './components/LoginUser/LoginUser';
import RegisterUser from './components/RegisterUser/RegisterUser';
import Hero from "./components/Hero/Hero";
import { AuthService } from "./services/authService";
import { BookService } from "./services/bookService";

const authService = new AuthService();
const bookService = new BookService();
export const UserContext = createContext();
const AuthProvider = ({ children }) => {
  const context = {
    authService,
    bookService
  }

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  )
}

const PrivateRoute = ({ children, ...props }) => {
  const location = useLocation(); //useLocation from react router dom
  const context = useContext(UserContext);

  if (!context.authService.isLoggedIn) {
    return <Navigate {...props} to='/login' state={{ from: location }} replace />;
  } // Navigate is from react router dom instead of Redirect

  return children;
}

function App() {
  return (
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
                </PrivateRoute>}
              />
            </Routes>
          </Router>
        </ThemeProvider>
    </AuthProvider>
  );
}

export default App;


/* 
4. Create Components/Routes for:
- Forgot a password
- Reset Password
- Update User Info or Password
- Home/NewsFeed
- Upload a photo
*/