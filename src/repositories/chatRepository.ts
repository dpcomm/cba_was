import { PrismaClient } from '@prisma/client'
import { chatDto } from '@dtos/chatDto';


const prisma = new PrismaClient();

class ChatRepository {
    async saveChats(chats: chatDto[]) {
        const chatsToSave = chats.map(chat => ({
            ...chat,
            timestamp: new Date(chat.timestamp),
        }));

        return prisma.chat.createMany({
            data: chatsToSave,
            skipDuplicates: true,
        });
    }
    async getAllChats(roomId: number): Promise<chatDto[]> {
        const result = await prisma.chat.findMany({
            where: { roomId },
            orderBy: { timestamp: 'asc' },
        });

        const chats: chatDto[] = result.map(chat => ({
            roomId: chat.roomId,
            senderId: chat.senderId,
            message: chat.message,
            timestamp: chat.timestamp.getTime(),
        }));

        return chats;      
    }
    async getChatsBetween(roomId: number, fromTimestamp: number, toTimestamp?: number): Promise<chatDto[]> {
        const whereClause: any = {
            roomId,
            timestamp: {
                gte: new Date(fromTimestamp),
            },
        };

        if (toTimestamp !== undefined) {
            whereClause.timestamp = {
                ...whereClause.timestamp,
                lt: new Date(toTimestamp),
            };
        }

        const result = await prisma.chat.findMany({
            where: whereClause,
            orderBy: {
                timestamp: 'asc',
            },
        });

        const chats: chatDto[] = result.map(chat => ({
            roomId: chat.roomId,
            senderId: chat.senderId,
            message: chat.message,
            timestamp: chat.timestamp.getTime(),
        }));

        return chats;       
    };    
}

export default ChatRepository;