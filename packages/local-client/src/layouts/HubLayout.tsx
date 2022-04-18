import { useEffect, useState } from 'react';
import TreeControls from '../components/Hub/TreeControls';
import TreeHub from '../components/Hub/TreeHub';
import Navbar from '../components/Navbar/Navbar';
import ToastPortal from '../components/ToastPortal/ToastPortal';
import { useActions } from '../hooks/use-actions';
import socket from '../socket-connection';
import { FileTree } from '../state';

export interface PartialTree {
  id: string;
  path: string;
  name: string;
}

const HubLayout = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileTree[]>([]);
  const [dirBreadcrumb, setDirBreadcrumb] = useState<PartialTree[]>([]);

  const { updateTree, addNotification } = useActions();

  useEffect(() => {
    socket.on('connect', () => {
      console.group('[Socket] :: connect');
      console.log('Socket Connected');
      console.groupEnd();
    });

    socket.on('tree', (data) => {
      updateTree(data);
    });

    socket.on('info', (message) => {
      addNotification(message, 'info');
    });

    socket.on('warn', (message) => {
      addNotification(message, 'warn');
    });

    socket.on('error', (message) => {
      addNotification(message, 'error');
    });

    socket.on('disconnect', () => {
      console.group('[Socket] :: disconnect');
      console.log('Socket Disconnected');
      console.groupEnd();
    });

    socket.connect();
  }, []);

  return (
    <>
      <Navbar width="90%" />
      <TreeControls
        breadcrumb={dirBreadcrumb}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      <TreeHub
        breadcrumb={dirBreadcrumb}
        setBreadcrumb={setDirBreadcrumb}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
      />
      <ToastPortal autoClose={true} />
    </>
  );
};

export default HubLayout;
