import { uuid } from '../../utils';
import { ActionType } from '../action-types';
import {
  AppendNotificationAction,
  RemoveNotificationAction,
  RemoveOverwriteModalAction,
} from '../actions/notificationsActions';
import { Action as NotificationsAction } from '../actions/notificationsActions';
import { Action as CellsAction } from '../actions/index';
import { ToastTypes } from '../toast';
import { Dispatch } from 'redux';

export const addNotification = (
  msg: string,
  mode: ToastTypes
): AppendNotificationAction => {
  return {
    type: ActionType.APPEND_NOTIFICATION,
    payload: {
      id: uuid(),
      msg,
      mode,
    },
  };
};

export const removeNotification = (id: string): RemoveNotificationAction => {
  return {
    type: ActionType.REMOVE_NOTIFICATION,
    payload: id,
  };
};

export const showOverwriteModal = () => {
  return (dispatch: Dispatch<NotificationsAction | CellsAction>) => {
    dispatch({ type: ActionType.TOGGLE_AUTO_SAVE, payload: false });
    dispatch({ type: ActionType.SHOW_OVERWRITE_MODAL });
  };
};

export const removeOverwriteModal = (): RemoveOverwriteModalAction => {
  return {
    type: ActionType.REMOVE_OVERWRITE_MODAL,
  };
};
