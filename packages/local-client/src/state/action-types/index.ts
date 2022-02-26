export enum ActionType {
  MOVE_CELL = 'move_cell',
  DELETE_CELL = 'delete_cell',
  INSERT_CELL_AFTER = 'insert_cell_after',
  UPDATE_CELL = 'update_cell',

  DELETE_CHAPTER = 'delete_chapter',
  INSERT_CHAPTER_AFTER = 'insert_chapter_after',

  BUNDLE_START = 'bundle_start',
  BUNDLE_COMPLETE = 'bundle_complete',

  FETCH_CELLS = 'fetch_cells',
  FETCH_CELLS_COMPLETE = 'fetch_cells_complete',
  FETCH_CELLS_ERROR = 'fetch_cells_error',

  SAVE_CELLS_ERROR = 'save_cells_error',
}
