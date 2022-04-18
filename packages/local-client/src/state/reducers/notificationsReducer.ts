import produce from 'immer';

import { ActionType } from '../action-types';
import { Action } from '../actions/notificationsActions';
import { Toast } from '../toast';

interface NotificationStates {
  toasts: Toast[];
}

const initialState: NotificationStates = {
  toasts: [],
};

const reducer = produce(
  (
    state: NotificationStates = initialState,
    action: Action
  ): NotificationStates => {
    switch (action.type) {
      case ActionType.APPEND_NOTIFICATION:
        state.toasts = [...state.toasts, action.payload];
        return state;

      case ActionType.REMOVE_NOTIFICATION:
        state.toasts = state.toasts.filter((t) => t.id !== action.payload);
        return state;

      default:
        return state;
    }
  },
  initialState
);

export default reducer;
