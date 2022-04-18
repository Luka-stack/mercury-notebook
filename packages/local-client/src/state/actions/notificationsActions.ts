import { ActionType } from '../action-types';
import { Toast } from '../toast';

export interface AppendNotificationAction {
  type: ActionType.APPEND_NOTIFICATION;
  payload: Toast;
}

export interface RemoveNotificationAction {
  type: ActionType.REMOVE_NOTIFICATION;
  payload: string;
}

export type Action = AppendNotificationAction | RemoveNotificationAction;
