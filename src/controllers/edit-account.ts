import { EditAccountService } from '../services/edit-account';
import { JSend } from '../util/communication';
import { Request, Response } from 'express';

export class EditAccountController {
    private static instance: EditAccountController | null = null;
    private editAccountService: EditAccountService = EditAccountService.getInstance();

    private constructor() {}

    public static getInstance(): EditAccountController {
        if (EditAccountController.instance === null) {
            EditAccountController.instance = new EditAccountController();
        }
        return EditAccountController.instance;
    }

    public async getAccountDetails(request: Request, response: Response) {
        const responseBody = await this.editAccountService.getAccountDetails(request.cookies.sessionID);
        const responseJSend = new JSend(responseBody);
        response.status(200).json(responseJSend);
    }

    public async changeAccountDetails(request: Request, response: Response) {
        const userAlreadyExists: boolean = await this.editAccountService.changeAccountDetails(
            request.body,
            request.cookies.sessionID
        );
        if (!userAlreadyExists) {
            const responseBody = 'The details have been changed.';
            const responseJSend = new JSend(responseBody);
            responseJSend.status = 'succes';
            response.status(200).json(responseJSend);
        } else {
            const responseBody = 'This username is already in use.';
            const responseJSend = new JSend(responseBody);
            responseJSend.status = 'fail';
            response.status(409).json(responseJSend);
        }
    }
}
