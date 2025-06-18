import { chatDto } from "@dtos/chatDto";
import { MulticastMessage, getMessaging } from "firebase-admin/messaging";
import redisClient from '@utils/redis';
import FcmTokenRepository from "@repositories/fcmTokenRepository";
import { requestRegistTokenDto, requestDeleteTokenDto } from "@dtos/fcmTokenDto";
import { notificationMessageDto } from "@dtos/notificationDto";

const fcmTokenRepository = new FcmTokenRepository();

class FcmService {
    async sendChatNotificationMessage(chat: chatDto) {
        try {
            const result = await redisClient.hGet("carpoolMember", chat.roomId.toString());
            let memberList: number[] = [];
            if (result) {memberList = JSON.parse(result)}

            let tokens: string[] = [];

            for (const member of memberList) {
                if ( member == chat.senderId) continue;
                if ( !await this.getFirebaseToken(member) ) { this.setFirebaseToken(member); }
                const memberTokens = await this.getFirebaseToken(member);
                tokens = [...tokens, ...memberTokens];
            }

            this._sendChatMessage(tokens, chat);

        } catch (err: any) {
            throw err;            
        }        
    }  

    private async _sendChatMessage(tokens: string[], chat: chatDto){
        try {
            const rawSender = await redisClient.hGet("userInfo", chat.senderId.toString());
            var senderName;

            if (rawSender) { senderName = JSON.parse(rawSender)['name']; }

            const message: MulticastMessage = {
                tokens : tokens, 
                data: {
                    roomId: `${chat.roomId}`,
                    title: `New message in Room ${chat.roomId}`,
                    body: `${senderName}: ${chat.message}`,       
                    channelId: "chat_channel",
                },
                // notification: {
                //     title: `New message in Room ${chat.roomId}`,
                //     body: `${chat.senderId}: ${chat.message}`,
                // },
                android: {
                    collapseKey: chat.roomId.toString(),
                    // notification: {
                    //     channelId: "chat_channel",
                    //     clickAction: "OPEN_CHATROOM",
                    // },
                }, 
                apns: {
                    headers: {
                        "apns-collapse-id": chat.roomId.toString(),
                    },
                    payload: {
                        aps: {
                            // category: "OPEN_CHATROOM",  // 여기가 clickAction에 해당됨
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

    async sendCarpoolEnterNotificationMessage(userId: number, roomId: number) {
        try {
            const result = await redisClient.hGet("carpoolMember", roomId.toString());
            let memberList: number[] = [];
            if (result) {memberList = JSON.parse(result);}

            let tokens: string[] = [];

            for (const member of memberList) {
                if ( member == userId) continue;
                if ( !await this.getFirebaseToken(member) ) { this.setFirebaseToken(member);}
                const memberTokens = await this.getFirebaseToken(member);
                tokens = [...tokens, ...memberTokens];
            }

            const userResult = await redisClient.hGet("userInfo", userId.toString());
            let userName: string = "";
            if (userResult) { userName = JSON.parse(userResult).name; }

            const notificationDTO: notificationMessageDto = {
                title: "",
                body: `${userName} 님이 카풀에 참여하셨습니다.`,
                channelId: "carpool_channel",
            }

            this._sendNotificationMessage(tokens, notificationDTO);

        } catch (err: any) {
            throw err;
        }
    }

    async sendCarpoolLeaveNotificationMessage(userId: number, roomId: number) {
        try {
            const result = await redisClient.hGet("carpoolMember", roomId.toString());
            let memberList: number[] = [];
            if (result) {memberList = JSON.parse(result);}

            let tokens: string[] = [];

            for (const member of memberList) {
                if ( member == userId) continue;
                if ( !await this.getFirebaseToken(member) ) { this.setFirebaseToken(member);}
                const memberTokens = await this.getFirebaseToken(member);
                tokens = [...tokens, ...memberTokens];
            }

            const userResult = await redisClient.hGet("userInfo", userId.toString());
            let userName: string = "";
            if (userResult) { userName = JSON.parse(userResult).name; }            

            const notificationDTO: notificationMessageDto = {
                title: "",
                body: `${userName} 님이 카풀에서 떠나셨습니다.`,
                channelId: "carpool_channel",
            }

            this._sendNotificationMessage(tokens, notificationDTO);         

        } catch (err: any) {
            throw err;
        }
    }

    private async _sendNotificationMessage(tokens: string[], notificationMessage: notificationMessageDto) {
        try {
            const message: MulticastMessage = {
                tokens: tokens,
                data: {
                    title: notificationMessage.title,
                    body: notificationMessage.body,
                    channelId: notificationMessage.channelId,
                },
                android: {
                    // notification: {
                    //     channelId: notificationMessage.channelId,
                    // },
                }, 
                apns: {
                    headers: {
                        
                    },
                    payload: {
                        aps: {
                            // category: "OPEN_CHATROOM",  // 여기가 clickAction에 해당됨
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

    //set tokens from redis
    async setFirebaseToken(userId: number) {
        try {
            const hashKey = "userFirebaseToken";
            const tokens = fcmTokenRepository.getTokens(userId);

            await redisClient.hSet(hashKey, userId.toString(), JSON.stringify(tokens));
        } catch (err: any) {
            throw err;
        }

    }

    //get tokens from redis
    async getFirebaseToken(userId: number) {
        try {
            const hashKey = "userFirebaseToken";
            const result = await redisClient.hGet(hashKey, userId.toString());

            return result? JSON.parse(result) : [];
        } catch (err: any) {
            throw err;
        }
    }

    //append token to redis
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

    //remove token to redis
    async removeFirebaseToken(userId: number, token: string) {
        try {
            const hashKey = "userFirebaseToken";

            const existing = await redisClient.hGet(hashKey, userId.toString());
            let tokens: string[] = [];

            if (existing) { tokens = JSON.parse(existing); }
            const result = tokens.filter(t => t !== token);
            await redisClient.hSet(hashKey, userId.toString(), JSON.stringify(result));

        } catch (err: any) {
            throw err;
        }
    }

    //regist token to DB
    async registToken(tokenDTO: requestRegistTokenDto) {
        try {
            //token 유효성 검사 필요
            if (!tokenDTO) {
                return ({
                    ok: 0,
                    message: "Invalid request"
                });
            }

            await fcmTokenRepository.registToken(tokenDTO);
            return ({
                ok: 1,
                message: "Token Resigter success",
                userId: tokenDTO.userId,
                token: tokenDTO.token,
            });
        } catch (err) {
            throw err;
        }
    }

    //remove token to DB
    async deleteToken(tokenDTO: requestDeleteTokenDto) {
        try {
            if (!tokenDTO) {
                return ({
                    ok: 0,
                    message: "Invalid request"
                });
            }

            const result = await fcmTokenRepository.deleteToken(tokenDTO.token);
            return ({
                ok: 1,
                message: "Token remove success",
                userId: result.userId,
                token: result.token,
            });

        } catch (err) {
            throw err;
        }
    }
}

export default FcmService;