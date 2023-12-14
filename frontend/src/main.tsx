import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// On importe ReactDom qui nous permettra d'injecter notre application dans le DOM
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
// On importe notre composant principal
import App from './components/App';
// On importe notre fichier de style global
import './styles/index.scss';
import store from './store';

// Je créer un root pour mon application (a partir d'un élément HTML)
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// On injecte notre application dans le DOM
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
