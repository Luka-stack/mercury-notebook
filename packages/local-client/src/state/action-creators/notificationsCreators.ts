import { uuid } from '../../utils';
import { ActionType } from '../action-types';
import {
  AppendNotificationAction,
  RemoveNotificationAction,
} from '../actions/notificationsActions';
import { ToastTypes } from '../toast';

export const addNotification = (
  msg: string,
  mode: ToastTypes
): AppendNotificationAction => {
  console.log(msg);
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
