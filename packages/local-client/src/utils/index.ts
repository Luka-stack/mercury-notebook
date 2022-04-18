import { Cell, FileTree } from '../state';
import { Chapter } from '../state/chapter';

export const findTree = (
  tree: FileTree | null,
  lookingFor: string
): FileTree | null => {
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

export const createNotebookPayload = (
  order: string[],
  chapters: any,
  data: any
): { chapters: Chapter[]; cells: Cell[] } => {
  try {
    const ordChapters = order.map((id) => chapters[id]);
    const ordCells: Cell[] = [];

    ordChapters.forEach((chapter) => {
      chapter.content.forEach((id: any) => ordCells.push(data[id]));
    });

    return { chapters: ordChapters, cells: ordCells };
  } catch (err) {
    throw Error('Bad data passed');
  }
};

export const createCumulativeCode = (
  cellId: string,
  order: string[],
  chapters: any,
  data: any
) => {
  const orderedCells: Cell[] = [];

  order.forEach((sectionId) => {
    orderedCells.push(
      ...chapters[sectionId].content.map((id: any) => data[id])
    );
  });

  const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = (value) => {
        const root = document.querySelector('#root');
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      };
    `;
  const showFuncNoop = 'var show = () => {}';
  const cumulativeCode = [];

  for (let c of orderedCells) {
    if (c.type === 'code') {
      if (c.id === cellId) {
        cumulativeCode.push(showFunc);
      } else {
        cumulativeCode.push(showFuncNoop);
      }
      cumulativeCode.push(c.content);
    }

    if (c.id === cellId) {
      break;
    }
  }

  return cumulativeCode.join('\n');
};

export const uuid = () => {
  let dt = new Date().getTime();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};
