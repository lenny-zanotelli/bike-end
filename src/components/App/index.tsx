import './styles.scss';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
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
  const dispatch = useAppDispatch();

  const isLogged = useAppSelector((state) => state.login.logged);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isUserLogged = Boolean(token);
    dispatch(updateLoginStatus(isUserLogged));
  }, [dispatch,
  ]);

  return (
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
      {isLogged ? (
        <>
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
            element={<MyAccount />}
          />
        </>
      ) : ''}
      <Route
        path="*"
        element={<ErrorPage />}
      />
    </Routes>
  );
}

export default App;
