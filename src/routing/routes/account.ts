import { Router, Request, Response } from 'express';
import { AccountController } from '../../controllers/account';

const router: Router = Router();

router.get('/', (request: Request, response: Response) => {
    AccountController.getInstance().getAccountDetails(request, response);
});

// router.get('/:username', (request: Request, response: Response) => {
// //     const username = request.params.username;
//     AccountController.getInstance().getAccountDetailsForUser(request, response, username);
// });

export default router;
