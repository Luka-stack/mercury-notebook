import { DirectoryTree } from 'directory-tree';

export const findTree = (
  tree: (DirectoryTree & { id?: string; active?: boolean }) | null,
  lookingFor: string
): (DirectoryTree & { id?: string; active?: boolean }) | null => {
  if (!tree) {
    return null;
  }

  const BFS = [tree];
  let tmp;

  while (BFS.length) {
    tmp = BFS.shift();

    if (lookingFor === '' || tmp!.id === lookingFor) {
      return tmp!;
    }

    if (tmp!.children) {
      BFS.push(...tmp!.children);
    }
  }

  return tree;
};
