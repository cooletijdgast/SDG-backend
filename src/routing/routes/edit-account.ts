import { Router, Request, Response } from 'express';
import { EditAccountController } from '../../controllers/edit-account';
import { JSend } from '../../util/communication';

const router: Router = Router();

router.get('/', (request: Request, response: Response) => {
    EditAccountController.getInstance().getAccountDetails(request, response);
});

router.put('/', (request: Request, response: Response) => {
    EditAccountController.getInstance().changeAccountDetails(request, response);
});

export default router;
