import { useEffect } from 'react';
import CellList from '../components/CellList/CellList';
import OverwriteModal from '../components/Modals/OverwriteModal';
import FileDropdown from '../components/Navbar/dropdowns/FileDropdown';
import OptionsDropdown from '../components/Navbar/dropdowns/OptionsDropdown';
import FileTitle from '../components/Navbar/FileTitle';
import Navbar from '../components/Navbar/Navbar';
import ToastPortal from '../components/ToastPortal/ToastPortal';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import socket from '../socket-connection';
import NotFound from './ErrorPage';

const SandboxLayout = () => {
  const {
    updateTree,
    insertCellAfter,
    insertChapterAfter,
    bundleSelectedCell,
    fetchCells,
    saveCells,
    showOverwriteModal,
    removeOverwriteModal,
    addNotification,
  } = useActions();

  const { selectedCell, error } = useTypedSelector((state) => state.cells);
  const { overwriteModal } = useTypedSelector((state) => state.notifications);

  useEffect(() => {
    socket.on('connect', () => {
      console.group('[Socket] :: connect');
      console.log('Socket Connected');
      console.groupEnd();
    });

    socket.on('tree', (data) => {
      updateTree(data);
    });

    socket.on('notebookChanged', () => {
      showOverwriteModal();
    });

    socket.on('sharedNotebook', () => {
      addNotification('This notebook is already open!', 'warn');
    });

    socket.on('disconnect', () => {
      console.group('[Socket] :: disconnect');
      console.log('Socket Disconnected');
      console.groupEnd();
    });

    socket.connect();
    fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener(
      'keydown',
      (event) => {
        if (selectedCell) {
          if (event.key === 'Enter' && event.altKey) {
            event.preventDefault();
            bundleSelectedCell();
          } else if (event.key === 'i' && event.altKey) {
            event.preventDefault();
            insertCellAfter(selectedCell.id, selectedCell.chapterId, 'code');
          } else if (event.key === 't' && event.altKey) {
            insertCellAfter(selectedCell.id, selectedCell.chapterId, 'text');
          } else if (event.key === 's' && event.altKey) {
            insertChapterAfter(selectedCell.chapterId);
          }
        }
      },
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell]);

  if (error) {
    return <NotFound error={error} />;
  }

  return (
    <div>
      <Navbar width="100%">
        <FileDropdown />
        <OptionsDropdown />
        <FileTitle />
      </Navbar>
      <CellList />
      <ToastPortal autoClose />

      {overwriteModal && (
        <OverwriteModal
          onClose={removeOverwriteModal}
          onReload={() => {
            fetchCells();
            removeOverwriteModal();
          }}
          onOverwrite={() => {
            saveCells();
            removeOverwriteModal();
          }}
        />
      )}
    </div>
  );
};

export default SandboxLayout;
