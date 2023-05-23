import { Request, Response } from 'express';
import { FollowService } from '../services/follow';
import { JSend } from '../util/communication';

export class FollowController {
    private static instance: FollowController | null = null;
    private FollowService: FollowService = FollowService.getInstance();

    private constructor() {}

    public static getInstance(): FollowController {
        if (FollowController.instance === null) {
            FollowController.instance = new FollowController();
        }
        return FollowController.instance;
    }

    public async followUser(request: Request, response: Response, username: string) {
        const sessionId = request.cookies.sessionID;
        const success = await this.FollowService.followUser(sessionId, username);
        if (success) {
            const responseBody = 'You are now super subscribed';
            const responseJSend = new JSend(responseBody);
            responseJSend.status = 'succes';
            response.status(200).json(responseJSend);
        } else {
            const responseBody = 'You are not subscribed';
            const responseJSend = new JSend(responseBody);
            responseJSend.status = 'fail';
            response.status(200).json(responseJSend);
        }
    }

    public async unfollowUser(request: Request, response: Response, username: string) {
        const sessionId = request.cookies.sessionID;
        const success = await this.FollowService.unfollowUser(sessionId, username);
        if (success) {
            const responseBody = 'You are now super unsubscribed';
            const responseJSend = new JSend(responseBody);
            responseJSend.status = 'succes';
            response.status(200).json(responseJSend);
        } else {
            const responseBody = 'You are not unsubscribed';
            const responseJSend = new JSend(responseBody);
            responseJSend.status = 'fail';
            response.status(200).json(responseJSend);
        }
    }
}
