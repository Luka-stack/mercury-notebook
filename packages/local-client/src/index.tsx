import 'bulmaswatch/darkly/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ReactDOM from 'react-dom';
import { store } from './state';
import { Provider } from 'react-redux';

import HubLayout from './layouts/HubLayout';
import NotFound from './layouts/NotFound';
import SandboxLayout from './layouts/SandboxLayout';

const App = () => {
  if (window.location.pathname === '/') {
    return (
      <Provider store={store}>
        <HubLayout />
      </Provider>
    );
  }

  if (window.location.pathname === '/404') {
    return <NotFound />;
  }

  return (
    <Provider store={store}>
      <SandboxLayout />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
