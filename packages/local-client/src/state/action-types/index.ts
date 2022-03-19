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

  CREATE_NOTEBOOK_COMPLETE = 'create_notebook_complete',
  CREATE_NOTEBOOK_ERROR = 'create_notebook_error',

  FETCH_PARTIAL_TREE = 'fetch_partial_tree',
  FETCH_WHOLE_TREE = 'fetch_whole_tree',
  FETCH_TREE_COMPLETE = 'fetch_tree_complete',
  FETCH_TREE_ERROR = 'fetch_tree_error',

  CREATE_FOLDER = 'create_folder',
  CREATE_FOLDER_ERROR = 'create_folder_error',

  // ---------------------------------------------------------
  UPDATE_TREE = 'update_tree',
  UPDATE_USED_NOTEBOOKS = 'update_used_notebooks',
}
