import { Server } from 'socket.io';
import * as socketHandlers from '@socket/events';
import { chatDto, requestUnreadChatDto } from '@dtos/chatDto';
import JwtProvider from '@utils/jwtProvider';

// socket event 
const EVENTS = {
  MESSAGE: 'message',
  LOGIN: 'login',
  LOGOUT: 'logout', 
  CHAT: 'chat',
  REQUEST_UNREAD_MESSAGES: 'request unread messages', 
  DISCONNECT: 'disconnect',
}

const jwtProvider = new JwtProvider();

export function setupSocketEvents(io: Server) {
  io.use(async (socket, next) => {
    console.log("connection request")
    const raw = socket.handshake.headers['authorization'];
    const token = raw?.split(' ')[1];

    if(!token) {
      return next(new Error('No token provided'));
    }

    try {
      const decoded = await jwtProvider.verifyAccessToken(token);

      socketHandlers.handleLogin(socket, decoded.id);
      next();
    } catch (err) {
      next(new Error('unauthorized'));
    }

  });
  io.on('connection', (socket) => {
    socketHandlers.handleConnect(socket);
    socket.on(EVENTS.LOGIN, async (userId: number, callback) => socketHandlers.handleLogin(socket, userId, callback));
    socket.on(EVENTS.LOGOUT, async (userId: number, callback) => socketHandlers.handleLogout(socket, userId, callback));
    socket.on(EVENTS.REQUEST_UNREAD_MESSAGES, async (requestUnreadMessages: requestUnreadChatDto, callback) => socketHandlers.handleRequestUnreadMessages(socket, requestUnreadMessages.recentChat, requestUnreadMessages.alreadyEnter, callback));
    socket.on(EVENTS.CHAT, async (chatDTO: chatDto, callback) => socketHandlers.handleChat(socket, chatDTO, callback));
    socket.on(EVENTS.DISCONNECT, () => socketHandlers.handleDisconnect(socket));
  });
}