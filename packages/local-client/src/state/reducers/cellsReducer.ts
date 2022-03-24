import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import { Chapter } from '../chapter';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  chapters: { [key: string]: Chapter };
  data: { [key: string]: Cell };
  autoCompile: boolean;
  autoSave: boolean;
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  chapters: {},
  data: {},
  autoCompile: true,
  autoSave: true,
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
        state.order = action.payload.chapters.map((chapter) => chapter.id);

        state.chapters = action.payload.chapters.reduce((acc, chapter) => {
          acc[chapter.id] = chapter;
          return acc;
        }, {} as CellsState['chapters']);

        state.data = action.payload.cells.reduce((acc, cell) => {
          acc[cell.id] = cell;
          return acc;
        }, {} as CellsState['data']);

        return state;

      case ActionType.FETCH_CELLS_ERROR:
        state.loading = false;
        state.error = action.payload;
        return state;

      case ActionType.UPDATE_CELL: {
        const { id, chapterId, content } = action.payload;

        if (state.data[id]) {
          state.data[id].content = content;
        } else {
          state.chapters[chapterId].description.content = content;
        }

        return state;
      }

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

      case ActionType.MOVE_CHAPTER: {
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      }

      case ActionType.MOVE_CELL:
        const { direction, chapterId } = action.payload;
        const index = state.chapters[chapterId].content.findIndex(
          (id) => id === action.payload.id
        );
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (
          targetIndex < 0 ||
          targetIndex > state.chapters[chapterId].content.length - 1
        ) {
          return state;
        }

        state.chapters[chapterId].content[index] =
          state.chapters[chapterId].content[targetIndex];
        state.chapters[chapterId].content[targetIndex] = action.payload.id;

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

      case ActionType.TOGGLE_AUTO_COMPILE:
        state.autoCompile = !state.autoCompile;
        return state;

      case ActionType.TOGGLE_AUTO_SAVE:
        state.autoSave = !state.autoSave;
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
