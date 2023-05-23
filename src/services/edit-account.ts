import { Session } from '../repository/models/session';
import { User } from '../repository/models/user';
import { EditAccountRepository } from '../repository/sequelize/edit-account';

interface EditAccountForm {
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
}

export class EditAccountFormData {
    public constructor(
        public username: string = '',
        public firstName: string = '',
        public middleName: string = '',
        public lastName: string = ''
    ) {}
}

export class EditAccountService {
    private static instance: EditAccountService | null = null;
    private editAccountRepository: EditAccountRepository = EditAccountRepository.getInstance();

    private constructor() {}

    public static getInstance(): EditAccountService {
        if (EditAccountService.instance === null) {
            EditAccountService.instance = new EditAccountService();
        }
        return EditAccountService.instance;
    }

    public async getAccountDetails(sessionID: string): Promise<EditAccountFormData> {
        const session: Session | null = await this.editAccountRepository.getUserID(sessionID);
        const responseBody: EditAccountFormData = new EditAccountFormData();
        if (session) {
            const accountData: User | null = await this.editAccountRepository.getUser(session.userID);
            if (accountData) {
                responseBody.username = accountData.username;
                responseBody.firstName = accountData.firstName;
                responseBody.middleName = accountData.preposition;
                responseBody.lastName = accountData.lastName;
            }
        }
        return responseBody;
    }

    public async changeAccountDetails(requestBody: EditAccountFormData, sessionID: string): Promise<boolean> {
        let usernameExists = false;
        const session: Session | null = await this.editAccountRepository.getUserID(sessionID);
        if (session) {
            usernameExists = await this.checkIfUserExists(requestBody.username, session.userID);
            if (!usernameExists) {
                this.editAccountRepository.changeAccountDetails(requestBody, session.userID);
            }
        }
        return usernameExists;
    }

    private async checkIfUserExists(username: string, userID: number): Promise<boolean> {
        const user: User[] = await this.editAccountRepository.getUserByUsername(username);
        let exists = false;
        if (user[0]) {
            if (user[0].id !== userID) {
                exists = true;
            }
        }
        return exists;
    }
}
