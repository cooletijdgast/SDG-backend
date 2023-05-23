import { Upload } from '../models/upload';
import { Follow } from '../models/follow';
import { Session } from '../models/session';
import { User } from '../models/user';

export class accountDetailsModel {
    public constructor(
        public username: string,
        public firstName: string,
        public middleName: string,
        public lastName: string,
        public email: string,
        public following: number,
        public followers: number,
        public projects: number,
        public subscribed: boolean
    ) {}
}

export class AccountRepository {
    private static instance: AccountRepository | null = null;
    private constructor() {}

    public static getInstance(): AccountRepository {
        if (AccountRepository.instance === null) {
            AccountRepository.instance = new AccountRepository();
        }
        return AccountRepository.instance;
    }

    public async getUsernameForSessionToken(sessionID: string) {
        const session = await Session.findByPk(sessionID);
        let username = '';
        if (session) {
            const user = await User.findByPk(session.userID);
            if (user) {
                username = user.username;
            }
        }
        return username;
    }

    public async getUserData(username: string, sessionID: string): Promise<accountDetailsModel | null> {
        const userData = await User.findOne({
            where: { username: username },
            attributes: ['id', 'username', 'firstName', 'preposition', 'lastName', 'email'],
        });
        const userID = await this.getIdFromSessionToken(sessionID);
        if (userData) {
            let subscribed = false;
            if (userID) {
                const subscription = await Follow.findOne({ where: { userID: userID, followsUserID: userData.id } });
                if (subscription) {
                    subscribed = true;
                }
            }
            const followingCount = await Follow.count({ where: { userID: userData.dataValues.id } });
            const followerCount = await Follow.count({ where: { followsUserID: userData.dataValues.id } });
            const projectsCount = await Upload.count({ where: { userID: userData.dataValues.id } });
            const accountDetails = new accountDetailsModel(
                userData.dataValues.username,
                userData.dataValues.firstName,
                userData.dataValues.preposition,
                userData.dataValues.lastName,
                userData.dataValues.email,
                followingCount,
                followerCount,
                projectsCount,
                subscribed
            );
            return accountDetails;
        }
        return null;
    }
    private async getIdFromSessionToken(sessionID: string): Promise<number | null> {
        let userID: number | null = null;
        const session = await Session.findByPk(sessionID);
        if (session) {
            userID = session.userID;
        }
        return userID;
    }
}
