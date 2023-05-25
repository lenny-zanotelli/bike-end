import './styles.scss';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../pages/HomePage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import ErrorPage from '../Error';
import SearchPage from '../pages/SearchPage/index';
import MyAccount from '../pages/MyAccountPage';
import ResultsPage from '../pages/ResultsPage';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateLoginStatus } from '../../store/reducers/login';
import FavoritePage from '../pages/FavoritePage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isHomePage = location.pathname === '/';
  const isLogged = useAppSelector((state) => state.login.logged);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isUserLogged = Boolean(token);
    dispatch(updateLoginStatus(isUserLogged));

    if (location.pathname === '/myaccount' && !isUserLogged) {
      navigate('/');
    }
  }, [dispatch, location.pathname, navigate]);

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
          path="/result"
          element={<ResultsPage />}
        />
        <Route
          path="/favorite"
          element={<FavoritePage />}
        />
        <Route
          path="/myaccount"
          element={isLogged ? <MyAccount /> : <Home />}
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
