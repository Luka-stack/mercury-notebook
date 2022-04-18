import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action as NotificationsAction } from '../actions/notificationsActions';
import * as Actions from '../actions/treeActions';
import { FileTree } from '../tree';
import socket from '../../socket-connection';
import { RootState } from '../reducers';
import { windowRouter } from '../../router';
import { createNotebookPayload } from '../../utils';
import { addNotification } from './notificationsCreators';

export const createFolder = (path: string) => {
  return (dispatch: Dispatch<NotificationsAction>) => {
    socket.emit(
      'createFolder',
      { path },
      (error: { msg: string } | undefined) => {
        if (error) {
          dispatch(addNotification(error.msg, 'error'));
        } else {
          dispatch(
            addNotification('Folder has been successfully created!', 'info')
          );
        }
      }
    );
  };
};

export const createNotebook = (path: string, redirect = false) => {
  return (dispatch: Dispatch<NotificationsAction>) => {
    socket.emit(
      'createNotebook',
      { path },
      (error: { msg: string } | undefined, filename: string) => {
        if (error) {
          dispatch(addNotification(error.msg, 'error'));
        } else {
          dispatch(
            addNotification('Notebook has been successfully created!', 'info')
          );

          if (redirect) {
            windowRouter.newWindow(
              windowRouter.constructNotebookPath(path, filename)
            );
          }
        }
      }
    );
  };
};

export const saveNotebookAs = (path: string) => {
  return (
    dispatch: Dispatch<NotificationsAction>,
    getState: () => RootState
  ) => {
    const {
      cells: { order, chapters, data },
    } = getState();

    const payload = createNotebookPayload(order, chapters, data);
    socket.emit(
      'saveNotebookAs',
      {
        path,
        data: payload,
      },
      (error: { msg: string } | undefined) => {
        if (error) {
          dispatch(addNotification(error.msg, 'error'));
        } else {
          dispatch(
            addNotification('Notebook has been successfully created!', 'info')
          );
        }
      }
    );
  };
};

export const renameFile = (
  oldPath: string,
  newPath: string,
  callback: () => void
) => {
  return (dispatch: Dispatch<NotificationsAction>) => {
    socket.emit(
      'renameFile',
      { oldPath, newPath },
      (error: { msg: string } | undefined) => {
        if (error) {
          dispatch(addNotification(error.msg, 'error'));
        } else {
          dispatch(
            addNotification('File has been succussfully renamed', 'info')
          );
          callback();
        }
      }
    );
  };
};

export const deleteFiles = (trees: FileTree[]) => {
  return (dispatch: Dispatch<NotificationsAction>) => {
    socket.emit(
      'deleteFiles',
      { trees },
      (error: { msg: string } | undefined) => {
        if (error) {
          dispatch(addNotification(error.msg, 'error'));
        } else {
          dispatch(addNotification('Successfully deleted files', 'info'));
        }
      }
    );
  };
};

export const updateTree = (tree: FileTree | null): Actions.UpdateTreeAction => {
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

export const selectModalFile = (
  file: string
): Actions.SelectModalFileAction => {
  return {
    type: ActionType.SELECT_MODAL_FILE,
    payload: file,
  };
};

export const deselectModalFile = (): Actions.DeselectModalFileAction => {
  return {
    type: ActionType.DESELECT_MODAL_FILE,
  };
};

export const cleanRenameErrors = (): Actions.RenameFileCompleteAction => {
  return {
    type: ActionType.RENAME_FILE_COMPLETE,
  };
};

export const cleanSaveAsErrors = (): Actions.SaveAsCompleteAction => {
  return {
    type: ActionType.SAVE_AS_COMPLETE,
  };
};
