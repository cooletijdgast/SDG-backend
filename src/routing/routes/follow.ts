import { Router, Request, Response } from 'express';
import { FollowController } from '../../controllers/follow';

const router: Router = Router();

router.get('/:username', (request: Request, response: Response) => {
    const username = request.params.username;
    FollowController.getInstance().followUser(request, response, username);
});

router.delete('/unfollow/:username', (request: Request, response: Response) => {
    const username = request.params.username;
    FollowController.getInstance().unfollowUser(request, response, username);
});

export default router;
