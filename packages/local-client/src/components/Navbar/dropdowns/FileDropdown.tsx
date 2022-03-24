import { ChangeEvent, useRef } from 'react';
import { useActions } from '../../../hooks/use-actions';
import DropdownItem from './DropdownItem';

const FileDropdown = () => {
  const fileRef = useRef<any>();

  const { createNotebook, saveNotebook, saveNotebookAs } = useActions();

  const onExistingClick = () => {
    const input: HTMLInputElement = fileRef.current;
    input.click();
  };

  const onFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length === 1) {
      window.open(`/notebooks/${event.target.files[0].name}`);
    }
  };

  const onNewClick = () => {
    const path = window.location.pathname.split('/').slice(2, -1).join('/');
    createNotebook(path, true);
  };

  const onSaveClick = () => {
    const path = window.location.pathname.replace('/notebooks/', '');
    saveNotebook(path);
  };

  const onSaveAsClick = () => {
    const path =
      window.location.pathname.split('/').slice(2, -1).join('/') +
      '/XOXOXOX.js';
    saveNotebookAs(path);
  };

  return (
    <div className="cst-navbar-item cst-has-dropdown cst-is-hoverable">
      <b className="cst-navbar-link">File</b>
      <div className="cst-navbar-dropdown">
        <DropdownItem label="Save" onClick={onSaveClick} />
        <DropdownItem label="Save as" onClick={onSaveAsClick} />
        <DropdownItem
          label="Open"
          desc="Open notebook in new a tab"
          onClick={onExistingClick}
        />
        <DropdownItem
          label="New notebook"
          desc="Open new notebook"
          onClick={onNewClick}
        />
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".js"
        style={{ display: 'none' }}
        onChange={onFileSelect}
      />
    </div>
  );
};

export default FileDropdown;
