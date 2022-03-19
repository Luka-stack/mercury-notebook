import { ActionType } from '../action-types';
import { Tree } from '../tree';

export interface FetchPartialTreeAction {
  type: ActionType.FETCH_PARTIAL_TREE;
}

export interface FetchWholeTreeAction {
  type: ActionType.FETCH_WHOLE_TREE;
}

export interface FetchTreeCompleteAction {
  type: ActionType.FETCH_TREE_COMPLETE;
  paylaod: Tree;
}

export interface FetchTreeErrorAction {
  type: ActionType.FETCH_TREE_ERROR;
  payload: string;
}

export interface CreateFolderAction {
  type: ActionType.CREATE_FOLDER;
}

export interface CreateFolderErrorAction {
  type: ActionType.CREATE_FOLDER_ERROR;
  payload: string;
}

export interface UpdateTreeAction {
  type: ActionType.UPDATE_TREE;
  payload: Tree | null;
}

export interface UpdateUsedNotebooksAction {
  type: ActionType.UPDATE_USED_NOTEBOOKS;
  payload: Set<string>;
}

export type Action =
  | FetchPartialTreeAction
  | FetchWholeTreeAction
  | FetchTreeCompleteAction
  | FetchTreeErrorAction
  | CreateFolderAction
  | CreateFolderErrorAction
  | UpdateTreeAction
  | UpdateUsedNotebooksAction;
