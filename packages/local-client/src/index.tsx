import 'bulmaswatch/darkly/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './state';
import CellList from './components/CellList/CellList';
import Navbar from './components/Navbar/Navbar';
import HubLayout from './layouts/HubLayout';
import NotFound from './layouts/NotFound';

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
      <div>
        <Navbar />
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
