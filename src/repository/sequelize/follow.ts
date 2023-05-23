import { Follow } from '../models/follow';
import { Session } from '../models/session';
import { User } from '../models/user';

export class FollowRepository {
    private static instance: FollowRepository | null = null;

    private constructor() {}

    public static getInstance(): FollowRepository {
        if (FollowRepository.instance === null) {
            FollowRepository.instance = new FollowRepository();
        }
        return FollowRepository.instance;
    }

    public async followUser(sessionID: string, username: string): Promise<boolean> {
        const userID = await this.getIdFromSessionToken(sessionID);
        const followsUserID = await this.getIdFromUsername(username);
        if (userID && followsUserID) {
            const newSubscription = await Follow.create({ userID: userID, followsUserID: followsUserID });
        }
        return true;
    }

    public async unfollowUser(sessionID: string, username: string): Promise<boolean> {
        const userID = await this.getIdFromSessionToken(sessionID);
        const followsUserID = await this.getIdFromUsername(username);
        if (userID && followsUserID) {
            const subscription = await Follow.findOne({ where: { userID: userID, followsUserID: followsUserID } });
            if (subscription) {
                subscription.destroy();
            }
        }
        return true;
    }

    private async getIdFromSessionToken(sessionID: string): Promise<number | null> {
        let userID: number | null = null;
        const session = await Session.findByPk(sessionID);
        if (session) {
            userID = session.userID;
        }
        return userID;
    }

    private async getIdFromUsername(username: string): Promise<number | null> {
        let userID: number | null = null;
        const userData = await User.findOne({
            where: { username: username },
            attributes: ['id'],
        });
        if (userData) {
            userID = userData.dataValues.id;
        }
        return userID;
    }
}
