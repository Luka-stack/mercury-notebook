export type TreeFileTypes = 'directory' | 'file';

export interface FileTree {
  id: string;
  path: string;
  name: string;
  type: TreeFileTypes;
  mtime: string;
  active: boolean;
  children: FileTree[];
}
