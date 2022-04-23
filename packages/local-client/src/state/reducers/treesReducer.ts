import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions/treeActions';
import { FileTree } from '../tree';

interface TreesState {
  root: { path: string; id: string };
  loading: boolean;
  error: string | null;
  tree: FileTree | null;
  modalFile: string;
}

const initialState: TreesState = {
  root: { path: '', id: '' },
  loading: false,
  error: null,
  tree: null,
  modalFile: '',
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

      case ActionType.SELECT_MODAL_FILE:
        state.modalFile = action.payload;
        return state;

      case ActionType.DESELECT_MODAL_FILE:
        state.modalFile = '';
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
