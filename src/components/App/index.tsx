import './styles.scss';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import SignupPage from '../SignupPage';
import LoginPage from '../loginPage';

function App() {
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div className="app">
      {!isHomePage && <Header />}
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
