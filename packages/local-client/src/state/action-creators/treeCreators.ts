import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions/treeActions';
import * as Actions from '../actions/treeActions';
import { Tree } from '../tree';
import socket from '../../socket-connection';
import { constructNotebookPath, createNotebookPayload } from '../../utils';
import { RootState } from '../reducers';
import { Cell } from '../cell';

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

export const createFolder = (path: string) => {
  return (dispatch: Dispatch<Action>) => {
    socket.emit('createFolder', { path }, (response: { error: string }) => {
      if (response.error) {
        dispatch({
          type: ActionType.CREATE_FOLDER_ERROR,
          payload: response.error,
        });
      } else {
        dispatch({ type: ActionType.CREATE_FOLDER });
      }
    });
  };
};

export const createNotebook = (path: string, redirect = false) => {
  return (dispatch: Dispatch<Action>) => {
    socket.emit(
      'createNotebook',
      { path },
      (response: { error?: string; filename?: string }) => {
        if (response.error) {
          dispatch({
            type: ActionType.CREATE_NOTEBOOK_ERROR,
            payload: response.error,
          });
        } else {
          dispatch({
            type: ActionType.CREATE_NOTEBOOK,
          });

          if (redirect) {
            window.open(constructNotebookPath(path, response.filename!));
          }
        }
      }
    );
  };
};

export const saveNotebookAs = (path: string) => {
  return (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { order, chapters, data },
    } = getState();

    try {
      const payload = createNotebookPayload(order, chapters, data);
      socket.emit(
        'saveNotebookAs',
        {
          path,
          data: payload,
        },
        (response: { error: string }) => {
          console.log(response);
        }
      );
    } catch (error: unknown) {
      console.log('Error while saving Notebook');
    }
  };
};

export const updateTree = (tree: Tree | null): Actions.UpdateTreeAction => {
  return {
    type: ActionType.UPDATE_TREE,
    payload: tree,
  };
};

export const updateUsedNotebooks = (
  used: Set<string>
): Actions.UpdateUsedNotebooksAction => {
  return {
    type: ActionType.UPDATE_USED_NOTEBOOKS,
    payload: used,
  };
};
