export namespace windowRouter {
  export const ROOT_NOTEBOOK_PATH = 'notebooks';

  export const getFilePath = (rootReplacement = ''): string => {
    return window.location.pathname.replace(
      `/${ROOT_NOTEBOOK_PATH}/`,
      rootReplacement
    );
  };

  export const getDirPath = (): string => {
    return window.location.pathname.split('/').slice(2, -1).join('/');
  };

  export const updateRoute = (pattern: string, replacement: string): void => {
    window.history.pushState(
      '',
      '',
      window.location.pathname.replace(pattern, replacement)
    );
  };

  export const getCurrentFilename = (): string => {
    return window.location.pathname
      .split('/')
      .splice(-1)[0]
      .replace('.jsnb', '');
  };

  export const newWindow = (url: string) => {
    window.open(url);
  };

  export const constructNotebookPath = (
    path: string,
    filename: string
  ): string => {
    if (path === '') {
      return `/${ROOT_NOTEBOOK_PATH}/${filename}`;
    }

    return `/${ROOT_NOTEBOOK_PATH}/${path}/${filename}`;
  };
}
