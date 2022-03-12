import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions/treeActions';
import { Tree } from '../tree';

interface TreesState {
  root: string;
  loading: boolean;
  error: string | null;
  tree: Tree | null;
}

const initialState: TreesState = {
  root: '',
  loading: false,
  error: null,
  tree: null,
};

const reducer = produce(
  (state: TreesState = initialState, action: Action): TreesState => {
    switch (action.type) {
      case ActionType.FETCH_PARTIAL_TREE:
        state.loading = true;
        state.error = null;
        return state;

      case ActionType.FETCH_TREE_ERROR:
        state.loading = false;
        state.error = action.payload;
        return state;

      case ActionType.FETCH_TREE_COMPLETE:
        state.loading = false;
        state.error = null;

        if (state.root === '') {
          state.root = action.paylaod.path;
        }

        state.tree = action.paylaod;

        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
