import './styles/modals.css';
import 'bulmaswatch/darkly/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ReactDOM from 'react-dom';
import { store } from './state';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import HubLayout from './layouts/HubLayout';
import SandboxLayout from './layouts/SandboxLayout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <HubLayout />
            </Provider>
          }
        />
        <Route
          path="/notebooks/*"
          element={
            <Provider store={store}>
              <SandboxLayout />
            </Provider>
          }
        />
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
