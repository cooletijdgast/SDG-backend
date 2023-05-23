import { assert, expect } from 'chai';
import * as tssinon from 'ts-sinon';
import request, { Request, Response } from 'supertest';
import cookieParser from 'cookie-parser';
import express from 'express';
import { RegisterInterface } from '../../../src/repository/interfaces/register-interface';
import { User, Roles } from '../../../src/business/user';
import { RepositoryInterfaces } from '../../../src/routing/helpers/load-routes';
import { RegisterRoute } from '../../../src/routing/routes/register';
import { initRepository } from '../../../src/server';
import { RegisterService } from '../../../src/services/register';
import { initLoginStub } from '../services/login.test';
import { initRegisterStub } from '../services/register.test';
import { initUploadStub } from '../../youri/services/upload.test';

describe('RegisterController', () => {
    const sandbox = tssinon.default.createSandbox();
    let registerService: RegisterService | null = null;
    let app = express();

    beforeEach(async () => {
        app = express();
        let repos: RepositoryInterfaces = {
            login: initLoginStub(sandbox, new Date()),
            register: initRegisterStub(sandbox),
            upload: initUploadStub(sandbox),
        };
        registerService = new RegisterService(repos.register);
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());
        initRepository(app, repos);
    });

    it("should create a user if it doesn't already exists", async () => {
        createStubRoute(sandbox, app, { getUserIsNull: true, email: 'test@test.com', routeName: '/register/empty' });

        let res: Response = await request(app)
            .post('/register/empty')
            .send({ email: 'test@test.com', password: 'Test1234$' });
        expect(res.statusCode).equals(201);
        expect(JSON.stringify(res.body)).equals(
            '{"status":"succes","data":{"post":{"message":"User successfully created!"}}}'
        );
    });
    it('should return a 404 if a user with the same email already exists', async () => {
        createStubRoute(sandbox, app, { getUserIsNull: false, email: 'test@test.com', routeName: '/register' });

        let res: Response = await request(app)
            .post('/register')
            .send({ email: 'test@test.com', password: 'Test1234$' });
        expect(res.statusCode).equals(404);
        expect(JSON.stringify(res.body)).equals(
            '{"status":"erorr","data":{"post":{"message":"A user with that email already exists!"}}}'
        );
    });
    it('should return a 400 if the email is not valid', async () => {
        createStubRoute(sandbox, app, { getUserIsNull: true, email: 'test@test.com', routeName: '/fakeEmail' });

        let res: Response = await request(app).post('/fakeEmail').send({ email: 'test', password: 'Test1234$' });
        expect(res.statusCode).equals(400);
        expect(JSON.stringify(res.body)).equals(
            '{"status":"error","data":{"post":{"message":"Wrong email format or password does not meet requirements!"}}}'
        );
    });
    it('should return a 400 if the password is not valid', async () => {
        createStubRoute(sandbox, app, { getUserIsNull: true, email: 'test@test.com', routeName: '/fakePassword' });

        let res: Response = await request(app)
            .post('/fakePassword')
            .send({ email: 'test@test.com', password: 'test1234' });

        expect(res.statusCode).equals(400);
        expect(JSON.stringify(res.body)).equals(
            '{"status":"error","data":{"post":{"message":"Wrong email format or password does not meet requirements!"}}}'
        );
    });
    it('should return a 400 if the email is not valid and the password is not valid', async () => {
        createStubRoute(sandbox, app, { getUserIsNull: true, email: 'test@test.com', routeName: '/fakeEmailPassword' });

        let res: Response = await request(app).post('/fakeEmailPassword').send({ email: 'test', password: 'test1234' });

        expect(res.statusCode).equals(400);
        expect(JSON.stringify(res.body)).equals(
            '{"status":"error","data":{"post":{"message":"Wrong email format or password does not meet requirements!"}}}'
        );
    });
    it('should return a cookie if the user is created', async () => {
        createStubRoute(sandbox, app, { getUserIsNull: true, email: 'test@test.com', routeName: '/cookie' });

        let res: Response = await request(app).post('/cookie').send({ email: 'test@test.com', password: 'Test1234$' });
        expect(res.statusCode).equals(201);
        expect(res.header['set-cookie']).to.not.be.undefined;
    });

    afterEach(() => {
        sandbox.restore();
    });
});

function createStubRoute(
    sandbox: sinon.SinonSandbox,
    app: express.Application,
    options: { getUserIsNull: boolean; email: string; routeName: string }
) {
    const registerStub = <RegisterInterface>{};
    if (options.getUserIsNull) {
        registerStub.getUserByMail = sandbox.stub().returns(null);
    } else {
        registerStub.getUserByMail = sandbox
            .stub()
            .returns(new User(1, options.email, 'Test1234$', 1, Roles.STUDENT, 0));
    }
    registerStub.createUser = sandbox.stub().returns(new User(1, options.email, 'Test1234$', 1, Roles.STUDENT, 0));
    const registerService = new RegisterService(registerStub);
    app.use(options.routeName, new RegisterRoute(registerService).getRouter());
}
