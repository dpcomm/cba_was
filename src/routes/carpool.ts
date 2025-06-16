import express from "express";
import CarpoolController from "@controllers/carpoolController";
import verifyAuth from "@middlewares/verifyAuth";

const carpoolRouter = express.Router();
const carpoolController = new CarpoolController();

/* 마이카풀 리스트 전체 조회 */
carpoolRouter.get("/my", carpoolController.getMyCarpoolRooms);

/* 카풀 리스트 전체 출력 */
carpoolRouter.get("/", carpoolController.getAllCarpoolRooms);
/* 상세 카풀 방 조회 */
carpoolRouter.get("/:id", carpoolController.getCarpoolRoomById);
/* 카풀 방 생성 */
carpoolRouter.post("/", carpoolController.createCarpoolRoom);
/* 남은 카풀 좌석 업데이트, 도착 여부 업데이트 */
carpoolRouter.post("/update/:id", carpoolController.updateCarpoolRoom);
/* 카풀 방 삭제 */
carpoolRouter.post("/delete/:id", carpoolController.deleteCarpoolRoom);

/* 카풀 방 참여, 채팅방 생성 코드는 레포지토리만 분리하고 나머지는 통합해도 될듯. (route는 물론 controller, service까지도.) */

export default carpoolRouter;
