import { combineReducers } from 'redux';
import cellsReducer from './cellsReducer';
import bundleReducer from './bundlesReducer';
import treesReducer from './treesReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
  trees: treesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
