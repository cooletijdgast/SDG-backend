import { expect } from 'chai';
import * as tssinon from 'ts-sinon';
import request, { Response } from 'supertest';
import express from 'express';
import cookieParser from 'cookie-parser';

import { LoginService } from '../../../src/services/login';
import { initRepository } from '../../../src/server';
import { RepositoryInterfaces } from '../../../src/routing/helpers/load-routes';
import { initRegisterStub } from '../services/register.test';
import { User, Roles } from '../../../src/business/user';
import { LoginMysql } from '../../../src/repository/mysql/login';
import { Session } from '../../../src/business/session';
import { LoginRoute } from '../../../src/routing/routes/login';
import { initUploadStub } from '../../youri/services/upload.test';

describe('LoginController', () => {
    const sandbox = tssinon.default.createSandbox();
    let loginService: LoginService | null = null;
    let repos: RepositoryInterfaces | null = null;
    let app = express();

    beforeEach(async () => {
        app = express();
        repos = {
            login: initLoginStub(sandbox, new Date()),
            register: initRegisterStub(sandbox),
            upload: initUploadStub(sandbox),
        };
        loginService = new LoginService(repos.login);
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
        initRepository(app, repos);
    });
    it('should return a 200 ok if a correct email and password was provided', async () => {
        // spy = sandbox.spy(loginService!, 'getLogin');
        let res: Response = await request(app).post('/login/').send({ email: 'test@test.com', password: 'Test1234$' });
        expect(res.statusCode).equals(200);
        expect(JSON.stringify(res.body)).equals(
            '{"status":"succes","data":{"post":{"message":"Correct email and password!"}}}'
        );
        // assert(spy.calledTwice);
    });
    it('should return a 404 if a wrong password was provided', async () => {
        let res: Response = await request(app)
            .post('/login/')
            .send({ email: 'test@test.com', password: 'Test12345678$' });
        expect(res.statusCode).equals(404);
        expect(JSON.stringify(res.body)).equals(
            '{"status":"fail","data":{"post":{"message":"Wrong email or password!"}}}'
        );
    });
    it('should return a User object if a correct session was provided', async () => {
        let res: Response = await request(app).get('/login').set('Cookie', 'sessionID=test');
        expect(res.statusCode).equals(200);
        expect(JSON.stringify(res.body)).equals(
            '{"status":"succes","data":{"post":{"user":{"_id":1,"_email":"test@test.com",' +
                '"_password":"$2b$06$puuWEyu2f5WZSyBWD5oE2OSm/1.d8h7tNqKCnbbBCeD3kI3WzkY8q","_level":1,"_role":"STUDENT","_levelProgress":0}}}}'
        );
    });
    it('should return a 404 if a wrong session was provided', async () => {
        createStubRoute(sandbox, app, {
            deleteIsNull: false,
            outDatedSession: true,
            email: '',
            routeName: '/outdated',
        });

        let res: Response = await request(app).get('/outdated').set('Cookie', 'sessionID=test');
        expect(res.statusCode).equals(404);
        expect(JSON.stringify(res.body)).equals('{"status":"failed","data":{"post":{"message":"No session found!"}}}');
    });

    it('should return a 200 ok if a session was deleted', async () => {
        let res: Response = await request(app).delete('/login').set('Cookie', 'sessionID=test');
        expect(res.statusCode).equals(200);
        expect(JSON.stringify(res.body)).equals(
            '{"status":"succes","data":{"post":{"message":"Deleted session successfully!"}}}'
        );
    });

    it('should return a 404 if no session could be deleted', async () => {
        createStubRoute(sandbox, app, {
            deleteIsNull: true,
            outDatedSession: true,
            email: '',
            routeName: '/delete',
        });

        let res: Response = await request(app).delete('/delete').set('Cookie', 'sessionID=test');
        expect(res.statusCode).equals(404);
        expect(JSON.stringify(res.body)).equals('{"status":"failed","data":{"post":{"message":"No session found!"}}}');
    });

    afterEach(() => {
        sandbox.restore();
    });
});

function initLoginStub(sandbox: sinon.SinonSandbox, date: Date): LoginMysql {
    const loginStub = <LoginMysql>{};
    loginStub.getUserByMail = sandbox
        .stub()
        .returns(
            Promise.resolve(
                new User(
                    1,
                    'test@test.com',
                    '$2b$06$puuWEyu2f5WZSyBWD5oE2OSm/1.d8h7tNqKCnbbBCeD3kI3WzkY8q',
                    1,
                    Roles.STUDENT,
                    0
                )
            )
        );
    loginStub.saveSession = sandbox
        .stub()
        .returns(Promise.resolve(new Session('test', 1, new Date(date.getTime() + 7889400000))));
    loginStub.deleteSession = sandbox.stub().returns(Promise.resolve(1));
    loginStub.getSession = sandbox
        .stub()
        .returns(Promise.resolve(new Session('test', 1, new Date(date.getTime() + 7889400000))));
    loginStub.getUserBySession = sandbox
        .stub()
        .returns(
            Promise.resolve(
                new User(
                    1,
                    'test@test.com',
                    '$2b$06$puuWEyu2f5WZSyBWD5oE2OSm/1.d8h7tNqKCnbbBCeD3kI3WzkY8q',
                    1,
                    Roles.STUDENT,
                    0
                )
            )
        );
    return loginStub;
}

function createStubRoute(
    sandbox: sinon.SinonSandbox,
    app: express.Application,
    options: { deleteIsNull: boolean; outDatedSession: boolean; email: string; routeName: string }
) {
    const date = new Date();
    const loginStub = <LoginMysql>{};

    if (options.deleteIsNull) {
        loginStub.deleteSession = sandbox.stub().returns(Promise.resolve(0));
    } else {
        loginStub.deleteSession = sandbox.stub().returns(Promise.resolve(1));
    }
    if (options.outDatedSession) {
        loginStub.getSession = sandbox
            .stub()
            .returns(Promise.resolve(new Session('test', 1, new Date(date.getTime() - 7889400000))));
    } else {
        loginStub.getSession = sandbox
            .stub()
            .returns(Promise.resolve(new Session('test', 1, new Date(date.getTime() + 7889400000))));
    }
    const loginService = new LoginService(loginStub);
    app.use(options.routeName, new LoginRoute(loginService).getRouter());
}
