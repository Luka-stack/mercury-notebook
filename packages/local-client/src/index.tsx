import './styles/modals.css';
import 'bulmaswatch/darkly/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ReactDOM from 'react-dom';
import { store } from './state';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  HashRouter,
  MemoryRouter,
  Route,
  Routes,
} from 'react-router-dom';

import HubLayout from './layouts/HubLayout';
import SandboxLayout from './layouts/SandboxLayout';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/hub"
          element={
            <Provider store={store}>
              <HubLayout />
            </Provider>
          }
        />
        <Route
          path="/notebooks/:file"
          element={
            <Provider store={store}>
              <SandboxLayout />
            </Provider>
          }
        />
      </Routes>
    </HashRouter>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
