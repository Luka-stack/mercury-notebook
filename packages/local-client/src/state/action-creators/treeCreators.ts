import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions/treeActions';
import * as Actions from '../actions/treeActions';
import { Tree } from '../tree';
import { v4 as uuidv4 } from 'uuid';

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

export const createFolder = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionType.CREATE_FOLDER });

    try {
      const dirpath = `Folder-${uuidv4().substring(0, 8)}`;

      await axios.post('http://localhost:4005/trees/folder', {
        dirpath,
      });
    } catch (err: any) {
      dispatch({ type: ActionType.CREATE_FOLDER_ERROR, payload: err.message });
    }
  };
};
