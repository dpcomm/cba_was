import { Socket } from "socket.io";
import redisClient from "@utils/redis";
import CarpoolMemberRepository from "@repositories/carpoolMemberRepository";

const carpoolMemberRepository = new CarpoolMemberRepository();

export default async function (socket: Socket, userId: number, callback?: Function) {
    try {
        
        await redisClient.hSet("userToSocket", String(userId), socket.id);
        await redisClient.hSet("socketToUser", socket.id, String(userId));

        const groups: any = await carpoolMemberRepository.findGroupsByUserId(userId);
        for (const group of groups) {
            if (group.type == "chatroom") {
                socket.join(`chatroom:${group.targetId}`);
                console.log(`${userId} join to chatroom:${group.targetId}`);
            }
        }
        const result = {
            success: true,
            message: "socket login success",
            userId: userId,
            socketId: socket.id
        };
        
        console.log(`user login: ${userId}`);
        if(callback) {
            callback(result);
        } else {
            return result;
        }

    } catch (err: any) {
        if(callback) {
            callback({status: "login error", message: err.message, err: err });            
        } else {
            return {status: "login error", message: err.message, err: err };
        }

    }
}