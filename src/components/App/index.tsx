import './styles.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import SignupPage from '../SignupPage';
import LoginPage from '../loginPage';
import ErrorPage from '../Error';
import SearchPage from '../searchPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateLoginStatus } from '../../store/reducers/login';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isHomePage = location.pathname === '/';
  const isLogged = useAppSelector((state) => state.login.logged);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isUserLogged = Boolean(token);
    dispatch(updateLoginStatus(isUserLogged));
  });

  return (
    <div className="app">
      {!isHomePage && <Header />}
      <Routes>
        <Route
          path="/"
          element={isLogged ? <SearchPage /> : <Home />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="*"
          element={<ErrorPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
