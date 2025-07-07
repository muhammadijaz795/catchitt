import { io } from 'socket.io-client';
const SERVER_URL = 'https://prodapi.seezitt.com';


export const socket = io(SERVER_URL,
    {
        autoConnect: true,          // ← Auto-connect on import
        reconnection: true,         // ← Auto-reconnect if dropped
        reconnectionAttempts: 5,    // ← Max retries
        reconnectionDelay: 1000,    // ← Delay between retries (ms)
        transports: ['websocket'],  // Use WebSocket transport
        upgrade: false,             // Prevent transport upgrades
    }
);

// Log connection events
socket
  .on('connect', () => {
    console.log('✅ Socket connected (ID:', socket.id, ')');

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    token && userId && socket.emit('add-user', JSON.stringify({ userId, accessToken: token }));
  })
  .on('disconnect', (reason) => {
    console.log('❌ Socket disconnected:', reason);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const params = new URLSearchParams(window.location.search); 
    const streamId = params.get('streamId');
    if(streamId){
      const data = {
        userId: userId,
        token: token,
        join:true,
        liveStreamRoomId:streamId
      }
      streamId && token && userId && socket.emit('isUserExistInLiveStreamRoom', data);
    }
  })
  .on('reconnect_attempt', (attempt) => {
    console.log('🔁 Reconnecting (attempt', attempt, ')');
  })
  .on('reconnect_error', (error) => {
    console.log('⚠ Reconnection error:', error);
  })
  .on('reconnect_failed', () => {
    console.log('💥 Failed to reconnect after max attempts');
  });
