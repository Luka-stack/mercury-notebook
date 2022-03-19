import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4005';
const socket = io(SOCKET_URL, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.group('On Any Event');
  console.log(event, args);
  console.groupEnd();
});

export default socket;
