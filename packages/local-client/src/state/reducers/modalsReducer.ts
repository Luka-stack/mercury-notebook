import produce from 'immer';
import { ActionType } from '../action-types';

import { Action } from '../actions/treeActions';

interface ModalsState {
  filenameError: string | null;
  saveAsError: string | null;
}

const initialState: ModalsState = {
  filenameError: null,
  saveAsError: null,
};

const reducer = produce(
  (state: ModalsState = initialState, action: Action): ModalsState => {
    switch (action.type) {
      case ActionType.RENAME_FILE_COMPLETE:
        state.filenameError = null;
        return state;

      case ActionType.RENAME_FILE_ERROR:
        state.filenameError = action.payload;
        return state;

      case ActionType.SAVE_AS_COMPLETE:
        state.saveAsError = null;
        return state;

      case ActionType.SAVE_AS_ERROR:
        state.saveAsError = action.payload;
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
