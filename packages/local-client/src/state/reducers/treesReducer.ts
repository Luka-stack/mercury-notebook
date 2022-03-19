import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions/treeActions';
import { Tree } from '../tree';

interface TreesState {
  root: { path: string; id: string };
  usedNotebook: Set<string>;
  loading: boolean;
  error: string | null;
  tree: Tree | null;
}

const initialState: TreesState = {
  root: { path: '', id: '' },
  usedNotebook: new Set(),
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

      // case ActionType.FETCH_TREE_COMPLETE:
      //   state.loading = false;
      //   state.error = null;

      //   if (state.root === '') {
      //     state.root = action.paylaod.path;
      //   }

      //   state.tree = action.paylaod;

      //   return state;

      case ActionType.UPDATE_TREE:
        state.tree = action.payload;

        if (action.payload) {
          state.root = {
            path: action.payload.path,
            id: action.payload.id,
          };
        } else {
          state.root = {
            path: '',
            id: '',
          };
        }

        return state;

      case ActionType.UPDATE_USED_NOTEBOOKS:
        state.usedNotebook = action.payload;
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
