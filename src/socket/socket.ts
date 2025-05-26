import { Server } from 'socket.io';
import * as socketHandlers from '@socket/events';
import { chatDto, requestUnreadChatDto } from '@dtos/chatDto';
import requestUnreadMessages from './events/requestUnreadMessages';

// socket event 
const EVENTS = {
  MESSAGE: 'message',
  LOGIN: 'login',
  LOGOUT: 'logout', 
  CHAT: 'chat',
  REQUEST_UNREAD_MESSAGES: 'request unread messages', 
  DISCONNECT: 'disconnect',
}



export function setupSocketEvents(io: Server) {
  io.on('connection', (socket) => {
    socketHandlers.handleConnect(socket);
    socket.on(EVENTS.LOGIN, async (userId: number, callback) => socketHandlers.handleLogin(socket, userId, callback));
    socket.on(EVENTS.LOGOUT, async (userId: number, callback) => socketHandlers.handleLogout(socket, userId, callback));
    socket.on(EVENTS.REQUEST_UNREAD_MESSAGES, async (requestUnreadMessages: requestUnreadChatDto, callback) => socketHandlers.handleRequestUnreadMessages(socket, requestUnreadMessages.recentChat, requestUnreadMessages.alreadyEnter, callback));
    socket.on(EVENTS.CHAT, async (chatDTO: chatDto, callback) => socketHandlers.handleChat(socket, chatDTO, callback));
    socket.on(EVENTS.DISCONNECT, () => socketHandlers.handleDisconnect(socket));
  });
}