/**
 * @author Lars Brinker
 */
import { Application } from 'express';
import { LoginRoute } from '../routes/login';
import { RegisterRoute } from '../routes/register';
import { LoginInterface } from '../../repository/interfaces/login-interface';
import { RegisterInterface } from '../../repository/interfaces/register-interface';
import { default as contact } from '../routes/contact';
import { default as editAccount } from '../routes/edit-account';
import { default as account } from '../routes/account';
import { default as follow } from '../routes/follow';
import { LoginService } from '../../services/login';
import { RegisterService } from '../../services/register';
import { UploadRoute } from '../routes/upload';
import { UploadService } from '../../services/upload';
import { UploadInterface } from '../../repository/interfaces/upload-interface';

export interface RepositoryInterfaces {
    login: LoginInterface;
    register: RegisterInterface;
    upload: UploadInterface;
}

export function loadRoutes(app: Application, repositories: RepositoryInterfaces) {
    app.use('/login', new LoginRoute(new LoginService(repositories.login)).getRouter());
    app.use('/register', new RegisterRoute(new RegisterService(repositories.register)).getRouter());
    app.use('/upload', new UploadRoute(new UploadService(repositories.upload)).getRouter());
    app.use('/contact', contact);
    app.use('/edit-account', editAccount);
    app.use('/account', account);
    app.use('/follow', follow);
}