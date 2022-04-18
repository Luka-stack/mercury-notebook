import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundleReducer from './bundlesReducer';
import treesReducer from './treesReducer';
import notificationsReduer from './notificationsReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
  trees: treesReducer,
  notifications: notificationsReduer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
