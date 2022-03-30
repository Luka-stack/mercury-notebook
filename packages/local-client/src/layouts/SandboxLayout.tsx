import { useEffect } from 'react';
import CellList from '../components/CellList/CellList';
import FileDropdown from '../components/Navbar/dropdowns/FileDropdown';
import OptionsDropdown from '../components/Navbar/dropdowns/OptionsDropdown';
import FileTitle from '../components/Navbar/FileTitle';
import Navbar from '../components/Navbar/Navbar';
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
    fetchedErrors,
    loadCells,
  } = useActions();

  const { selectedCell, error } = useTypedSelector((state) => state.cells);

  useEffect(() => {
    socket.on('connect', () => {
      console.group('[Socket] :: connect');
      console.log('Socket Connected');
      console.groupEnd();
    });

    socket.on('tree', (data) => {
      updateTree(data);
    });

    socket.on('fetchedCells', (data) => {
      loadCells(data);
    });

    socket.on('fetchedError', (data) => {
      fetchedErrors(data.error);
    });

    socket.on('disconnect', () => {
      console.group('[Socket] :: disconnect');
      console.log('Socket Disconnected');
      console.groupEnd();
    });

    socket.connect();
    fetchCells();
  }, []);

  useEffect(() => {
    document.addEventListener(
      'keydown',
      (event) => {
        if (selectedCell) {
          if (event.key === 'Enter' && event.altKey) {
            event.preventDefault();
            bundleSelectedCell();
          } else if (event.key === 'c' && event.altKey) {
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
    </div>
  );
};

export default SandboxLayout;
