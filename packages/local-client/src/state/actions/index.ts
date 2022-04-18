import { ActionType } from '../action-types';
import { Cell, CellTypes } from '../cell';
import { Chapter } from '../chapter';
import { Toast } from '../toast';

export type Direction = 'up' | 'down';

export interface MoveChapterAction {
  type: ActionType.MOVE_CHAPTER;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
    chapterId: string;
  };
}

export interface DeleteChapterAction {
  type: ActionType.DELETE_CHAPTER;
  paylaod: string;
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: {
    cellId: string;
    chapterId: string;
  };
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    chapter: string;
    type: CellTypes;
  };
}

export interface InsertChapterAfterAction {
  type: ActionType.INSERT_CHAPTER_AFTER;
  payload: string | null;
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    chapterId: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export interface FetchCellsAction {
  type: ActionType.FETCH_CELLS;
}

export interface FetchCellsCompleteAction {
  type: ActionType.FETCH_CELLS_COMPLETE;
  payload: {
    chapters: Chapter[];
    cells: Cell[];
  };
}

export interface FetchCellsErrorAction {
  type: ActionType.FETCH_CELLS_ERROR;
  payload: string;
}

export interface SaveCellsErrorAction {
  type: ActionType.SAVE_CELLS_ERROR;
  payload: string;
}

export interface ToggleAutoCompileAction {
  type: ActionType.TOGGLE_AUTO_COMPILE;
}

export interface ToggleAutoSaveAction {
  type: ActionType.TOGGLE_AUTO_SAVE;
}

export interface SelectCodeCellAction {
  type: ActionType.SELECT_CODE_CELL;
  payload: Cell;
}

export type Action =
  | MoveChapterAction
  | MoveCellAction
  | DeleteChapterAction
  | DeleteCellAction
  | InsertChapterAfterAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAction
  | FetchCellsCompleteAction
  | FetchCellsErrorAction
  | SaveCellsErrorAction
  | ToggleAutoSaveAction
  | ToggleAutoCompileAction
  | SelectCodeCellAction;
