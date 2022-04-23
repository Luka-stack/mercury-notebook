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

export interface UpdateModalErrorsAction {
  type: ActionType.UPDATE_MODAL_ERRORS;
  payload: string;
}

export interface ClearModalErrorsAction {
  type: ActionType.CLEAR_MODAL_ERRORS;
}

// to delete
export interface RenameFileAction {
  type: ActionType.RENAME_FILE;
}

export interface RenameFileCompleteAction {
  type: ActionType.RENAME_FILE_COMPLETE;
}

export interface RenameFileErrorAction {
  type: ActionType.RENAME_FILE_ERROR;
  payload: string;
}

export interface SaveAsCompleteAction {
  type: ActionType.SAVE_AS_COMPLETE;
}

export interface SaveAsErrorAction {
  type: ActionType.SAVE_AS_ERROR;
  payload: string;
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
  | DeselectModalFileAction
  | UpdateModalErrorsAction
  | ClearModalErrorsAction
  | RenameFileAction
  | RenameFileCompleteAction
  | RenameFileErrorAction
  | SaveAsCompleteAction
  | SaveAsErrorAction;
