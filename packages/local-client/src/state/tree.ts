export type TreeFileTypes = 'directory' | 'file';

export interface Tree {
  id: string;
  path: string;
  name: string;
  type: TreeFileTypes;
  mtime: string;
  active: boolean;
  children: Tree[];
}
