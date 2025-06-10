import { chatDto } from "@dtos/chatDto";
import { MulticastMessage, getMessaging } from "firebase-admin/messaging";
import redisClient from '@utils/redis';
import FcmRepository from "@repositories/fcmRepository";

const fcmRepository = new FcmRepository();

class FcmService {
    async sendNotificationMessage(roomId: number, chat: chatDto) {
        try {
            const result = await redisClient.hGet("carpoolMember", roomId.toString());
            let memberList: number[] = [];
            if (result) {memberList = JSON.parse(result)}

            let tokens: string[] = [];

            for (const member of memberList) {
                if ( member == chat.senderId) continue;
                if ( !await this.getFirebaseToken(member) ) { this.setFirebaseToken(member); }
                const memberTokens = await this.getFirebaseToken(member);
                tokens = [...tokens, ...memberTokens];
            }

            this.sendMessage(tokens, chat);

        } catch (err: any) {
            throw err;            
        }
        
    }

    private sendMessage(tokens: string[], chat: chatDto){
        try {
            const message: MulticastMessage = {
                tokens : tokens, 
                notification: {
                    title: `New message in Room ${chat.roomId}`,
                    body: `${chat.senderId}: ${chat.message}`,
                },
                android: {
                    collapseKey: chat.roomId.toString(),
                    notification: {
                        clickAction: "OPEN_CHATROOM",
                    },
                }, 
                apns: {
                    headers: {
                        "apns-collapse-id": chat.roomId.toString(),
                    },
                    payload: {
                        aps: {
                            category: "OPEN_CHATROOM",  // 여기가 clickAction에 해당됨
                        }
                    }
                },
            } 

            getMessaging().sendEachForMulticast(message)
                .then(response => {
                    console.log('Successfully sent:', response.successCount);
                })
                .catch(error => {
                    console.log('Error sending:', error);
                });

        } catch (err: any) {
            throw err;
        }
    }

    async setFirebaseToken(userId: number) {
        try {
            const hashKey = "userFirebaseToken";
            const tokens = fcmRepository.getTokens(userId);

            await redisClient.hSet(hashKey, userId.toString(), JSON.stringify(tokens));
        } catch (err: any) {
            throw err;
        }

    }

    async getFirebaseToken(userId: number) {
        try {
            const hashKey = "userFirebaseToken";
            const result = await redisClient.hGet(hashKey, userId.toString());

            return result? JSON.parse(result) : [];
        } catch (err: any) {
            throw err;
        }
    }

    async addFirebaseToken(userId: number, token: string) {
        try {
            const hashKey = "userFirebaseToken";

            const existing = await redisClient.hGet(hashKey, userId.toString());
            let tokens: string[] = [];

            if (existing) { tokens = JSON.parse(existing); }
            tokens.push(token);
            await redisClient.hSet(hashKey, userId.toString(), JSON.stringify(tokens));
        } catch (err: any) {
            throw err;
        }
    }
}

export default FcmService;