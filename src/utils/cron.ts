import cron from 'node-cron';
import ChatService from '@services/chatService';

const chatService = new ChatService;

// 매일 새벽 4시에 redis에서 mysql로 chat이동
cron.schedule('0 4 * * *', () => {
    console.log("chat flush start");
    chatService.flushAllChats();
    console.log("chat flush end");
});

// cron.schedule('* * * * *', () => {
//     console.log("test flush start");
//     chatService.flushAllChats();
//     console.log("test flush end");
// });

