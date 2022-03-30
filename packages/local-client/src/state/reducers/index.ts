import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundleReducer from './bundlesReducer';
import treesReducer from './treesReducer';
import modalsReducer from './modalsReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
  trees: treesReducer,
  modals: modalsReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
