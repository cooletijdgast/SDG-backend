import { Router, Request, Response } from 'express';
import { TestController } from '../../controllers/test';

// Create a Router object and add all the different endpoints to it for Test.
const router: Router = Router();

/**
 * Defines an endpoint which will eventually get a test object from the database and return it as the response data.
 * @author Thijs van Rixoort
 */
router.get('/', (request: Request, response: Response) => {
    TestController.getInstance().getTest(request, response);
});

export default router;
