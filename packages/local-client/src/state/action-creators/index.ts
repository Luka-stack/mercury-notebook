import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import {
  UpdateCellAction,
  DeleteCellAction,
  MoveCellAction,
  InsertCellAfterAction,
  Direction,
  Action,
  InsertChapterAfterAction,
  DeleteChapterAction,
  MoveChapterAction,
  ToggleAutoCompileAction,
  ToggleAutoSaveAction,
  SelectCodeCellAction,
  FetchCellsCompleteAction,
  FetchCellsErrorAction,
  FetchCellsAction,
} from '../actions';
import { Cell, CellTypes } from '../cell';
import { Chapter } from '../chapter';
import bundle from '../../bundler';
import { RootState } from '../reducers';
import socket from '../../socket-connection';
import { createCumulativeCode, createNotebookPayload } from '../../utils';

export const updateCell = (
  id: string,
  chapterId: string,
  content: string
): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      chapterId,
      content,
    },
  };
};

export const deleteChapter = (id: string): DeleteChapterAction => {
  return {
    type: ActionType.DELETE_CHAPTER,
    paylaod: id,
  };
};

export const deleteCell = (
  cellId: string,
  chapterId: string
): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: {
      cellId,
      chapterId,
    },
  };
};

export const moveChapter = (
  id: string,
  direction: Direction
): MoveChapterAction => {
  return {
    type: ActionType.MOVE_CHAPTER,
    payload: {
      id,
      direction,
    },
  };
};

export const moveCell = (
  id: string,
  direction: Direction,
  chapterId: string
): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
      chapterId,
    },
  };
};

export const insertChapterAfter = (
  id: string | null
): InsertChapterAfterAction => {
  return {
    type: ActionType.INSERT_CHAPTER_AFTER,
    payload: id,
  };
};

export const insertCellAfter = (
  id: string | null,
  chapter: string,
  cellType: CellTypes
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
      chapter,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);
    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};

export const bundleSelectedCell = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const { data, order, chapters, selectedCell } = getState().cells;

    if (selectedCell && selectedCell.type === 'code') {
      const cumulativeCode = createCumulativeCode(
        selectedCell.id,
        order,
        chapters,
        data
      );
      dispatch({
        type: ActionType.BUNDLE_START,
        payload: {
          cellId: selectedCell.id,
        },
      });

      const result = await bundle(cumulativeCode);
      dispatch({
        type: ActionType.BUNDLE_COMPLETE,
        payload: {
          cellId: selectedCell.id,
          bundle: {
            code: result.code,
            err: result.err,
          },
        },
      });
    }
  };
};

export const toggleAutoCompile = (): ToggleAutoCompileAction => {
  return {
    type: ActionType.TOGGLE_AUTO_COMPILE,
  };
};

export const toggleAutoSave = (): ToggleAutoSaveAction => {
  return {
    type: ActionType.TOGGLE_AUTO_SAVE,
  };
};

export const selectCodeCell = (cell: Cell): SelectCodeCellAction => {
  return {
    type: ActionType.SELECT_CODE_CELL,
    payload: cell,
  };
};

export const fetchCells = (): FetchCellsAction => {
  const filepath = window.location.pathname.replace('/notebooks/', '');
  socket.emit('fetchCells', { filepath });

  return {
    type: ActionType.FETCH_CELLS,
  };
};

export const loadCells = (data: {
  chapters: Chapter[];
  cells: Cell[];
}): FetchCellsCompleteAction => {
  return {
    type: ActionType.FETCH_CELLS_COMPLETE,
    payload: data,
  };
};

export const fetchedErrors = (error: string): FetchCellsErrorAction => {
  return {
    type: ActionType.FETCH_CELLS_ERROR,
    payload: error,
  };
};

export const saveNotebook = (path: string) => {
  return (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { order, chapters, data },
    } = getState();

    try {
      const payload = createNotebookPayload(order, chapters, data);

      socket.emit(
        'saveNotebook',
        {
          path,
          data: payload,
        },
        (response: { error: string }) => {
          if (response.error) {
            dispatch({
              type: ActionType.SAVE_CELLS_ERROR,
              payload: response.error,
            });
          } else {
            console.log('Saved Successfully');
          }
        }
      );
    } catch (error: unknown) {
      console.log('Error while saving Notebook');
    }
  };
};
