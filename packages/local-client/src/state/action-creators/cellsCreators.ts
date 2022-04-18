import { Dispatch } from 'redux';
import { windowRouter } from '../../router';
import socket from '../../socket-connection';
import { createNotebookPayload } from '../../utils';
import { ActionType } from '../action-types';
import {
  Action,
  DeleteCellAction,
  DeleteChapterAction,
  Direction,
  FetchCellsCompleteAction,
  FetchCellsErrorAction,
  InsertCellAfterAction,
  InsertChapterAfterAction,
  MoveCellAction,
  MoveChapterAction,
  SelectCodeCellAction,
  ToggleAutoCompileAction,
  ToggleAutoSaveAction,
  UpdateCellAction,
} from '../actions';
import { Action as NotificationsAction } from '../actions/notificationsActions';
import { Cell, CellTypes } from '../cell';
import { Chapter } from '../chapter';
import { RootState } from '../reducers';
import { addNotification } from './notificationsCreators';

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

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.FETCH_CELLS,
    });

    const filepath = windowRouter.getFilePath();
    socket.emit(
      'fetchCells',
      { filepath },
      (
        error: { msg: string } | undefined,
        data: { chapters: Chapter[]; cells: Cell[] }
      ) => {
        if (error) {
          dispatch({
            type: ActionType.FETCH_CELLS_ERROR,
            payload: error.msg,
          });
        } else {
          dispatch({
            type: ActionType.FETCH_CELLS_COMPLETE,
            payload: data,
          });
        }
      }
    );
  };
};

export const forcedUpdate = (data: {
  chapters: Chapter[];
  cells: Cell[];
}): FetchCellsCompleteAction => {
  return {
    type: ActionType.FETCH_CELLS_COMPLETE,
    payload: data,
  };
};

export const saveCells = (path: string) => {
  return (
    dispatch: Dispatch<NotificationsAction>,
    getState: () => RootState
  ) => {
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
        (error: { msg: string } | undefined) => {
          if (error) {
            dispatch(addNotification(error.msg, 'error'));
          } else {
            dispatch(
              addNotification('Notebook has been successfully save', 'info')
            );
          }
        }
      );
    } catch (error: unknown) {
      dispatch(
        addNotification('Unexpected error while saving Notebook', 'error')
      );
    }
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

export const deleteChapter = (id: string): DeleteChapterAction => {
  return {
    type: ActionType.DELETE_CHAPTER,
    paylaod: id,
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

export const insertChapterAfter = (
  id: string | null
): InsertChapterAfterAction => {
  return {
    type: ActionType.INSERT_CHAPTER_AFTER,
    payload: id,
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

export const fetchedErrors = (error: string): FetchCellsErrorAction => {
  return {
    type: ActionType.FETCH_CELLS_ERROR,
    payload: error,
  };
};
