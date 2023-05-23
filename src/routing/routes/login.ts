/**
 * @author Lars Brinker
 */
import { Router, Request, Response } from 'express';
import { LoginController } from '../../controllers/login';
import { LoginInterface } from '../../repository/interfaces/login-interface';
import { LoginService } from '../../services/login';

export class LoginRoute {
    private router: Router;
    private loginController: LoginController;

    constructor(private loginService: LoginService) {
        this.router = Router();
        this.loginController = new LoginController(this.loginService);
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/', this.validateUserInput.bind(this), (request: Request, response: Response) => {
            this.loginController.validateLogin(request, response);
        });

        this.router.get('/', async (request: Request, response: Response) => {
            this.loginController.getUserBySession(request, response);
        });

        this.router.delete('/', (request: Request, response: Response) => {
            this.loginController.logUserOut(request, response);
        });
    }

    public getRouter(): Router {
        return this.router;
    }

    private async validateUserInput(request: Request, response: Response, next: Function) {
        if (!(await this.loginController.validateUserInput(request, response))) {
            next();
        }
    }
}
