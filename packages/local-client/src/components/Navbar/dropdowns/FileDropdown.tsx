import { useEffect, useState } from 'react';
import { useActions } from '../../../hooks/use-actions';
import { windowRouter } from '../../../router';
import FilePickerModal from '../../Modals/FilePickerModal';
import NameInputModal from '../../Modals/NameInputModal';
import DropdownItem from './DropdownItem';

const FileDropdown = () => {
  const [filePicker, setFilePicker] = useState<boolean>(false);
  const [namePicker, setNamePicker] = useState<boolean>(false);

  const { createNotebook, saveCells, saveNotebookAs, cleanSaveAsErrors } =
    useActions();

  const onNewClick = () => {
    const path = windowRouter.getDirPath();
    createNotebook(path, true);
  };

  const onSaveClick = () => {
    saveCells();
  };

  const saveAs = (filename: string) => {
    const path = windowRouter.getDirPath() + filename;
    saveNotebookAs(path);
    setNamePicker(false);
  };

  const onSaveAsClosed = () => {
    setNamePicker(false);
    cleanSaveAsErrors();
  };

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (
        event.key === 's' &&
        (navigator.userAgent.match('Mac') ? event.metaKey : event.ctrlKey)
      ) {
        event.preventDefault();
        onSaveClick();
      } else if (
        event.key === 'n' &&
        (navigator.userAgent.match('Mac') ? event.metaKey : event.ctrlKey)
      ) {
        event.preventDefault();
        onNewClick();
      } else if (
        event.key === 'o' &&
        (navigator.userAgent.match('Mac') ? event.metaKey : event.ctrlKey)
      ) {
        event.preventDefault();
        setFilePicker(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="cst-navbar-item cst-has-dropdown cst-is-hoverable">
        <b className="cst-navbar-link">File</b>
        <div className="cst-navbar-dropdown">
          <DropdownItem label="Save" onClick={onSaveClick} />
          <DropdownItem label="Save as" onClick={() => setNamePicker(true)} />
          <hr className="dropdown-divider" />
          <DropdownItem
            label="Open"
            desc="Open notebook in new a tab"
            onClick={() => setFilePicker(true)}
          />
          <DropdownItem
            label="New"
            desc="Open new notebook"
            onClick={onNewClick}
          />
        </div>
      </div>
      {filePicker && <FilePickerModal setIsShowing={setFilePicker} />}
      {namePicker && (
        <NameInputModal
          type="file"
          currName=""
          setFilename={saveAs}
          onCancel={onSaveAsClosed}
        />
      )}
    </>
  );
};

export default FileDropdown;
