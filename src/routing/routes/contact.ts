import { Router, Request, Response } from 'express';
import { ContactFormController } from '../../controllers/contact';

const router: Router = Router();

router.post('/', (request: Request, response: Response) => {
    ContactFormController.getInstance().saveContactForm(request, response);
});

export default router;
