import { Request, Response } from 'express';
import { JSend } from '../util/communication';
import { AccountService } from '../services/account';
import { accountDetailsModel } from '../repository/sequelize/account';

export class AccountController {
    private static instance: AccountController | null = null;
    private AccountService: AccountService = AccountService.getInstance();

    private constructor() {}

    public static getInstance(): AccountController {
        if (AccountController.instance === null) {
            AccountController.instance = new AccountController();
        }
        return AccountController.instance;
    }

    public async getAccountDetails(request: Request, response: Response) {
        const username = await this.AccountService.getUsername(request.cookies.sessionID);
        this.getAccountDetailsForUser(request, response, username);
    }

    public async getAccountDetailsForUser(request: Request, response: Response, username: string): Promise<void> {
        const sessionID = request.cookies.sessionID;
        const userData: accountDetailsModel | null = await this.AccountService.getUserData(username, sessionID);
        if (userData) {
            const responseBody = {
                username: username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                middleName: userData.middleName,
                followers: userData.followers,
                follows: userData.following,
                projects: userData.projects,
                email: userData.email,
                yourAccount: await this.AccountService.checkIfYouAreThisUser(username, sessionID),
                subscribed: userData.subscribed,
            };
            const responseJSend = new JSend(responseBody);
            responseJSend.status = 'succes';
            response.status(200).json(responseJSend);
        } else {
            const responseBody = 'This username does not exist.';
            const responseJSend = new JSend(responseBody);
            responseJSend.status = 'fail';
            response.status(404).json(responseJSend);
        }
    }
}
