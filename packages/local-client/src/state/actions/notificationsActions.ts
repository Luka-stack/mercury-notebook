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

export interface ShowOverwriteModalAction {
  type: ActionType.SHOW_OVERWRITE_MODAL;
}

export interface RemoveOverwriteModalAction {
  type: ActionType.REMOVE_OVERWRITE_MODAL;
}

export type Action =
  | AppendNotificationAction
  | RemoveNotificationAction
  | ShowOverwriteModalAction
  | RemoveOverwriteModalAction;
