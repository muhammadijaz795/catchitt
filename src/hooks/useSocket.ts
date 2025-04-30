import { io, Socket } from 'socket.io-client';

type SocketEvents =
{
    'tempEvent': (payload: any) => void;
};

const socket: Socket<SocketEvents> = io('wss://staginglive1.seezitt.com');

export function useSocket()
{
    return socket;
}
