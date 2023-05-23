/**
 * @author Lars Brinker
 */
import { Router, Request, Response } from 'express';
import { RegisterController } from '../../controllers/register';
import { RegisterInterface } from '../../repository/interfaces/register-interface';
import { RegisterService } from '../../services/register';

export class RegisterRoute {
    private router: Router;
    private registerController: RegisterController;

    constructor(private registerService: RegisterService) {
        this.router = Router();
        this.registerController = new RegisterController(this.registerService);
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/', (request: Request, response: Response) => {
            this.registerController.createUser(request, response);
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}
