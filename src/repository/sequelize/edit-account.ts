import { Session } from '../models/session';
import { User } from '../models/user';
import { EditAccountFormData } from '../../services/edit-account';

export class EditAccountRepository {
    private static instance: EditAccountRepository | null = null;

    private constructor() {}

    public static getInstance(): EditAccountRepository {
        if (EditAccountRepository.instance === null) {
            EditAccountRepository.instance = new EditAccountRepository();
        }
        return EditAccountRepository.instance;
    }

    public async getUserID(sessionID: string): Promise<Session | null> {
        const session = await Session.findByPk(sessionID);
        return session;
    }

    public async getUser(id: number): Promise<User | null> {
        const user = await User.findByPk(id);
        return user;
    }

    public async changeAccountDetails(requestBody: EditAccountFormData, userID: number) {
        const user = await User.findByPk(userID);
        if (user) {
            user.username = requestBody.username;
            user.firstName = requestBody.firstName;
            user.preposition = requestBody.middleName;
            user.lastName = requestBody.lastName;
            user.save();
        }
    }

    public async getUserByUsername(username: string): Promise<User[]> {
        return await User.findAll({ where: { username: username } });
    }
}
