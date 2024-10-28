import React from 'react';
// import { SocketProvider } from '../reusables/SocketContext';
import ChatComponent from './ChatComponent';

export function ChatSocket() {

  return (
      // <SocketProvider>
        <ChatComponent />
      // </SocketProvider>
  );
}

export default ChatSocket;