import { useEffect } from 'react';
import CellList from '../components/CellList/CellList';
import FileDropdown from '../components/Navbar/dropdowns/FileDropdown';
import OptionsDropdown from '../components/Navbar/dropdowns/OptionsDropdown';
import Navbar from '../components/Navbar/Navbar';
import socket from '../socket-connection';

const SandboxLayout = () => {
  useEffect(() => {
    socket.on('connect', () => {
      console.group('[Socket] :: connect');
      console.log('Socket Connected');
      console.groupEnd();
    });

    socket.on('disconnect', () => {
      console.group('[Socket] :: disconnect');
      console.log('Socket Disconnected');
      console.groupEnd();
    });

    socket.connect();
  }, []);

  return (
    <div>
      <Navbar width="100%">
        <FileDropdown />
        <OptionsDropdown />
      </Navbar>
      <CellList />
    </div>
  );
};

export default SandboxLayout;
