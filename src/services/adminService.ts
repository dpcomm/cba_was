import { Request, Response } from 'express';
import BackOfficeQuery from '@repositories/BackOfficeQuery';

const backofficequery = new BackOfficeQuery;

class AdminController {
    async UserTable() {
        const TableQuery = backofficequery.UserAllQuery();
        
    }
}