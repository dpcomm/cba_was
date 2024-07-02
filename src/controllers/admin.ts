import { Request, Response, query } from 'express';
import BackOfficeQuery from '@repositories/BackOfficeQuery';

const backofficequery = new BackOfficeQuery();

class AdminController {
    async UserTable(req: Request, res: Response) {
        try {
            const queryTable = await backofficequery.UserAllQuery();
            console.log(queryTable);
            res.json(queryTable);  // JSON 형식으로 클라이언트에 데이터 전송
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export default AdminController;
