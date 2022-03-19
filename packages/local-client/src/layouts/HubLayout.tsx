import { useEffect, useState } from 'react';
import TreeControls from '../components/Hub/TreeControls';
import TreeHub from '../components/Hub/TreeHub';
import Navbar from '../components/Navbar/Navbar';
import { useActions } from '../hooks/use-actions';
import socket from '../socket-connection';

export interface PartialTree {
  id: string;
  path: string;
  name: string;
}

const HubLayout = () => {
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
      <TreeControls breadcrumb={dirBreadcrumb} />
      <TreeHub breadcrumb={dirBreadcrumb} setBreadcrumb={setDirBreadcrumb} />
    </>
  );
};

export default HubLayout;
