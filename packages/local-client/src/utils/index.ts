import { Cell, Tree } from '../state';
import { Chapter } from '../state/chapter';

const ROOT_TAB_NOTEBOOK = 'notebooks';

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

export const constructNotebookPath = (
  path: string,
  filename: string
): string => {
  if (path === '') {
    return `/${ROOT_TAB_NOTEBOOK}/${filename}`;
  }

  return `/${ROOT_TAB_NOTEBOOK}/${path}/${filename}`;
};

export const createNotebookPayload = (
  order: string[],
  chapters: any,
  data: any
): { ordChapters: Chapter[]; ordCells: Cell[] } => {
  try {
    const ordChapters = order.map((id) => chapters[id]);
    const ordCells: Cell[] = [];

    ordChapters.forEach((chapter) => {
      chapter.content.forEach((id: any) => ordCells.push(data[id]));
    });

    return { ordChapters, ordCells };
  } catch (err) {
    throw Error('Bad data passed');
  }
};
