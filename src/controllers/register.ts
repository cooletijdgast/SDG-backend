/**
 * @author Lars Brinker
 */
import { User } from '../business/user';
import { Request, Response } from 'express';
import { RegisterService } from '../services/register';
import { Session } from '../business/session';

export class RegisterController {
    public constructor(private registerService: RegisterService) {}

    /**
     * Check if the user doesn't already exists then create the user.
     * @param request Request object
     * @param response Response object
     */
    public async createUser(request: Request, response: Response): Promise<void> {
        let user: User;
        if (!(await this.checkIfUserExists(request, response)) && !(await this.validateUserInput(request, response))) {
            user = await this.registerService.createUser(request.body.email, request.body.password);
            this.logUserIn(response, user);
            response.status(201).json({
                status: 'succes',
                data: { post: { message: 'User successfully created!' } },
            });
        }
    }

    /**
     * Check if a user with that email already exists in the database.
     * @param request Request object
     * @param response Response object
     * @returns True if the user exists, false if not.
     */
    private async checkIfUserExists(request: Request, response: Response): Promise<boolean> {
        let doesUserExists: boolean = false;
        if ((await this.registerService.getUserByMail(request.body.email)) != null) {
            response.status(404).json({
                status: 'erorr',
                data: { post: { message: 'A user with that email already exists!' } },
            });
            doesUserExists = true;
        }
        return doesUserExists;
    }

    /**
     * Check if the inputted password and email is meeting the requirements.
     * @param request Request object
     * @param response Response object
     * @returns True if the user input is wrong, false if not.
     */
    private async validateUserInput(request: Request, response: Response): Promise<boolean> {
        let userInput: boolean = false;
        if (!User.validatePassword(request.body.password) || !User.validateEmail(request.body.email)) {
            response.status(400).json({
                status: 'error',
                data: { post: { message: 'Wrong email format or password does not meet requirements!' } },
            });
            userInput = true;
        }
        return userInput;
    }
    //TODO save the session to the database.
    private logUserIn(response: Response, user: User): void {
        let session: Session = Session.setCookieForUser(user.id);
        response.cookie('sessionID', session.sessionId, {
            maxAge: new Date().getTime() + 7889400000,
            httpOnly: true,
            path: '/',
        });
        // this.loginService.saveSession(user.id, session.sessionId, session.expirationDate);
    }
}
