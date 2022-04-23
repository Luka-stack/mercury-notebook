export interface Cell {
  id: string;
  chapterId: string;
  content: string;
  type: 'text' | 'code';
}

export interface Chapter {
  id: string;
  description: Cell;
  content: string[];
}
