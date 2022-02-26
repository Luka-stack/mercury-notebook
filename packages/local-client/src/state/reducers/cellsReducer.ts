import produce from 'immer';
import { CellTypes } from '..';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import { Chapter } from '../chapter';

const tmpCell = {
  id: 'labelCell',
  type: 'text' as CellTypes,
  content: '#### Chapter description - click to edit',
  chapterId: 'tmp',
};

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  chapters: { [key: string]: Chapter };
  data: { [key: string]: Cell };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: ['tmp'],
  chapters: {
    tmp: { id: 'tmp', description: tmpCell, content: [] },
  },
  data: {},
};

const reducer = produce(
  (state: CellsState = initialState, action: Action): CellsState => {
    switch (action.type) {
      case ActionType.SAVE_CELLS_ERROR:
        state.error = action.payload;
        return state;

      case ActionType.FETCH_CELLS:
        state.loading = true;
        state.error = null;
        return state;

      case ActionType.FETCH_CELLS_COMPLETE:
        state.order = action.payload.map((cell) => cell.id);
        state.data = action.payload.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState['data']);
        return state;

      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;
        return state;

      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;
        state.data[id].content = content;
        return state;

      case ActionType.DELETE_CHAPTER:
        state.chapters[action.paylaod].content.forEach((id) => {
          delete state.data[id];
        });
        delete state.chapters[action.paylaod];
        state.order = state.order.filter((id) => id !== action.paylaod);

        return state;

      case ActionType.DELETE_CELL:
        delete state.data[action.payload.cellId];
        state.chapters[action.payload.chapterId].content = state.chapters[
          action.payload.chapterId
        ].content.filter((id) => id !== action.payload.cellId);

        return state;

      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;

      case ActionType.INSERT_CHAPTER_AFTER:
        const newId = randomId();

        const chapter: Chapter = {
          id: newId,
          content: [],
          description: {
            id: randomId(),
            type: 'text',
            content: '',
            chapterId: newId,
          },
        };

        state.chapters[chapter.id] = chapter;

        const chapterIndex = state.order.findIndex(
          (id) => id === action.payload
        );
        if (chapterIndex < 0) {
          state.order.unshift(chapter.id);
        } else {
          state.order.splice(chapterIndex + 1, 0, chapter.id);
        }

        return state;

      case ActionType.INSERT_CELL_AFTER:
        const cell: Cell = {
          id: randomId(),
          type: action.payload.type,
          content: '',
          chapterId: action.payload.chapter,
        };

        state.data[cell.id] = cell;

        const cellIndex = state.chapters[
          action.payload.chapter
        ].content.findIndex((id) => id === action.payload.id);
        if (cellIndex < 0) {
          state.chapters[action.payload.chapter].content.unshift(cell.id);
        } else {
          state.chapters[action.payload.chapter].content.splice(
            cellIndex + 1,
            0,
            cell.id
          );
        }

        return state;

      default:
        return state;
    }
  },
  initialState
);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
};

export default reducer;
