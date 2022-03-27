import { ActionType } from '../action-types';
import { FileTree } from '../tree';

export interface FetchPartialTreeAction {
  type: ActionType.FETCH_PARTIAL_TREE;
}

export interface FetchWholeTreeAction {
  type: ActionType.FETCH_WHOLE_TREE;
}

export interface FetchTreeCompleteAction {
  type: ActionType.FETCH_TREE_COMPLETE;
  paylaod: FileTree;
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
  payload: FileTree | null;
}

export interface UpdateUsedNotebooksAction {
  type: ActionType.UPDATE_USED_NOTEBOOKS;
  payload: Set<string>;
}

export interface CreateNotebookAction {
  type: ActionType.CREATE_NOTEBOOK;
}

export interface CreateNotebookErrorAction {
  type: ActionType.CREATE_NOTEBOOK_ERROR;
  payload: string;
}

export interface SelectModalFileAction {
  type: ActionType.SELECT_MODAL_FILE;
  payload: string;
}

export interface DeselectModalFileAction {
  type: ActionType.DESELECT_MODAL_FILE;
}

export type Action =
  | FetchPartialTreeAction
  | FetchWholeTreeAction
  | FetchTreeCompleteAction
  | FetchTreeErrorAction
  | CreateFolderAction
  | CreateFolderErrorAction
  | UpdateTreeAction
  | UpdateUsedNotebooksAction
  | CreateNotebookAction
  | CreateNotebookErrorAction
  | SelectModalFileAction
  | DeselectModalFileAction;
