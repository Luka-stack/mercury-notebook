export type TreeFileTypes = 'directory' | 'file';

export interface Tree {
  path: string;
  name: string;
  type: TreeFileTypes;
  mtime: string;
  children: Tree[];
}
