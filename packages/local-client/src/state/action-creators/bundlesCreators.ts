import { Dispatch } from 'redux';
import bundle from '../../bundler';
import { createCumulativeCode } from '../../utils';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { RootState } from '../reducers';

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
