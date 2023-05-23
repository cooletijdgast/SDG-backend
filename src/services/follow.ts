import { FollowRepository } from '../repository/sequelize/follow';

export class FollowService {
    private static instance: FollowService | null = null;
    private FollowRepository: FollowRepository = FollowRepository.getInstance();

    private constructor() {}

    public static getInstance(): FollowService {
        if (FollowService.instance === null) {
            FollowService.instance = new FollowService();
        }
        return FollowService.instance;
    }

    public async followUser(sessionID: string, username: string): Promise<boolean> {
        return await this.FollowRepository.followUser(sessionID, username);
    }

    public async unfollowUser(sessionID: string, username: string): Promise<boolean> {
        return await this.FollowRepository.unfollowUser(sessionID, username);
    }
}
