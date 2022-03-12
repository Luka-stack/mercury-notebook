import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions/treeActions';
import * as Actions from '../actions/treeActions';
import { Tree } from '../tree';

export const fetchPartialTree = (filepath: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.FETCH_PARTIAL_TREE });

    try {
      //   const { data }: { data: Tree } = await axios.post('/trees/partial', {
      //     filepath,
      //   });
      const { data }: { data: Tree } = await axios.post(
        'http://localhost:4005/trees/partial',
        {
          filepath,
        }
      );
      dispatch({ type: ActionType.FETCH_TREE_COMPLETE, paylaod: data });
    } catch (err: any) {
      console.log('ERROR While Fetching Tree Partial');
      dispatch({ type: ActionType.FETCH_TREE_ERROR, payload: err.message });
    }
  };
};

export const sortTreeByName = (order: string): Actions.SortTreeByNameAction => {
  return {
    type: ActionType.SORT_TREE_BY_NAME,
    payload: order,
  };
};
