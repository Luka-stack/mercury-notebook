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

export interface SortTreeByNameAction {
  type: ActionType.SORT_TREE_BY_NAME;
  payload: string;
}

export type Action =
  | FetchPartialTreeAction
  | FetchWholeTreeAction
  | FetchTreeCompleteAction
  | FetchTreeErrorAction
  | SortTreeByNameAction;
