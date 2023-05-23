import { AccountRepository, accountDetailsModel } from '../repository/sequelize/account';

export class AccountService {
    private static instance: AccountService | null = null;
    private AccountRepository: AccountRepository = AccountRepository.getInstance();

    private constructor() {}

    public static getInstance(): AccountService {
        if (AccountService.instance === null) {
            AccountService.instance = new AccountService();
        }
        return AccountService.instance;
    }

    public async checkIfYouAreThisUser(username: string, sessionID: string): Promise<boolean> {
        let sameUser = false;
        const usernameToCheck = await this.AccountRepository.getUsernameForSessionToken(sessionID);
        if (username === usernameToCheck) {
            sameUser = true;
        }
        return sameUser;
    }

    public async getUsername(sessionID: string): Promise<string> {
        return await this.AccountRepository.getUsernameForSessionToken(sessionID);
    }

    public async getUserData(username: string, sessionID: string): Promise<accountDetailsModel | null> {
        return await this.AccountRepository.getUserData(username, sessionID);
    }
}
