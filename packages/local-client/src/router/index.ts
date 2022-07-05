export namespace windowRouter {
  export const ROOT_NOTEBOOK_PATH = 'notebooks';

  export const getFilePath = (rootReplacement = ''): string => {
    return window.location.hash.replace(
      `#/${ROOT_NOTEBOOK_PATH}/`,
      rootReplacement
    );
  };

  export const getDirPath = (): string => {
    return window.location.hash
      .replace('#/', '')
      .split('/')
      .slice(2, -1)
      .join('/');
  };

  export const updateRoute = (pattern: string, replacement: string): void => {
    window.history.pushState(
      '',
      '',
      window.location.hash.replace(pattern, replacement)
    );
  };

  export const getCurrentFilename = (): string => {
    return window.location.hash.replace('#/', '').split('/').splice(-1)[0];
  };

  export const newWindow = (url: string) => {
    window.open(url);
  };

  export const constructNotebookPath = (
    path: string,
    filename: string
  ): string => {
    if (path === '') {
      return `/#/${ROOT_NOTEBOOK_PATH}/${filename}`;
    }

    return `/#/${ROOT_NOTEBOOK_PATH}/${path}/${filename}`;
  };
}
