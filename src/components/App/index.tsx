import './styles.scss';
import { Route, Routes } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import SignupPage from '../SignupPage';

function App() {
  return (
    <div className="app">
      {/* <Header /> */}
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
          />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
