import { useEffect, useState } from 'react';
import TreeControls from '../components/Hub/TreeControls';
import TreeHub from '../components/Hub/TreeHub';
import Navbar from '../components/Navbar/Navbar';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
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

  const { updateTree } = useActions();

  useEffect(() => {
    socket.on('connect', () => {
      console.group('[Socket] :: connect');
      console.log('Socket Connected');
      console.groupEnd();
    });

    socket.on('tree', (data) => {
      updateTree(data);
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
    </>
  );
};

export default HubLayout;
