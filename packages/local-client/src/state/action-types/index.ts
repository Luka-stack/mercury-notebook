export enum ActionType {
  MOVE_CELL = 'move_cell',
  DELETE_CELL = 'delete_cell',
  INSERT_CELL_AFTER = 'insert_cell_after',
  UPDATE_CELL = 'update_cell',

  MOVE_CHAPTER = 'move_chapter',
  DELETE_CHAPTER = 'delete_chapter',
  INSERT_CHAPTER_AFTER = 'insert_chapter_after',

  BUNDLE_START = 'bundle_start',
  BUNDLE_COMPLETE = 'bundle_complete',

  FETCH_CELLS = 'fetch_cells',
  FETCH_CELLS_COMPLETE = 'fetch_cells_complete',
  FETCH_CELLS_ERROR = 'fetch_cells_error',

  SAVE_CELLS_ERROR = 'save_cells_error',

  CREATE_NOTEBOOK = 'create_notebook',
  CREATE_NOTEBOOK_ERROR = 'create_notebook_error',

  FETCH_PARTIAL_TREE = 'fetch_partial_tree',
  FETCH_WHOLE_TREE = 'fetch_whole_tree',
  FETCH_TREE_COMPLETE = 'fetch_tree_complete',
  FETCH_TREE_ERROR = 'fetch_tree_error',

  CREATE_FOLDER = 'create_folder',
  CREATE_FOLDER_ERROR = 'create_folder_error',

  TOGGLE_AUTO_SAVE = 'toggle_auto_save',
  TOGGLE_AUTO_COMPILE = 'toggle_auto_compile',

  UPDATE_TREE = 'update_tree',
  UPDATE_USED_NOTEBOOKS = 'update_used_notebooks',

  SELECT_MODAL_FILE = 'select_modal_file',
  DESELECT_MODAL_FILE = 'deselect_modal_file',

  SELECT_CODE_CELL = 'select_code_cell',

  CLEAR_MODAL_ERRORS = 'clear_modal_errors',
  UPDATE_MODAL_ERRORS = 'update_modal_errors',

  SAVE_AS_COMPLETE = 'save_as_complete',
  SAVE_AS_ERROR = 'save_as_error',

  RENAME_FILE = 'rename_file',
  RENAME_FILE_COMPLETE = 'rename_file_complete',
  RENAME_FILE_ERROR = 'rename_file_error',
}
