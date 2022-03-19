import { Tree } from '../state';

export const findTree = (
  tree: Tree | null,
  lookingFor: string
): Tree | null => {
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

  return null;
};
