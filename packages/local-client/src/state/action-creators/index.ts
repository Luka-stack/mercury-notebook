import { Dispatch } from 'redux';
import axios from 'axios';
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
} from '../actions';
import { Cell, CellTypes } from '../cell';
import { Chapter } from '../chapter';
import bundle from '../../bundler';
import { RootState } from '../reducers';

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

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_CELLS });

    try {
      const { data }: { data: { chapters: Chapter[]; cells: Cell[] } } =
        await axios.get('/cells');

      dispatch({ type: ActionType.FETCH_CELLS_COMPLETE, payload: data });
    } catch (err: any) {
      dispatch({ type: ActionType.FETCH_CELLS_ERROR, payload: err.message });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { order, chapters, data },
    } = getState();

    const orderedChapters = order.map((id) => chapters[id]);
    const orderedcells: Cell[] = [];

    orderedChapters.forEach((chapter) => {
      chapter.content.forEach((id) => orderedcells.push(data[id]));
    });

    try {
      await axios.post('/cells', {
        chapters: orderedChapters,
        cells: orderedcells,
      });
    } catch (err: any) {
      dispatch({ type: ActionType.SAVE_CELLS_ERROR, payload: err.message });
    }
  };
};
