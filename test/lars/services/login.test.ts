import { expect } from 'chai';
import * as tssinon from 'ts-sinon';

import { Session } from '../../../src/business/session';
import { Roles, User } from '../../../src/business/user';
import { LoginService } from '../../../src/services/login';
import { LoginMysql } from '../../../src/repository/mysql/login';

describe('Login service', () => {
    const sandbox = tssinon.default.createSandbox();
    const date = new Date();
    let loginService: LoginService;
    let loginStub = null;
    beforeEach(() => {
        loginStub = initLoginStub(sandbox, date);
        loginService = new LoginService(loginStub);
    });

    it('should return a User object if a correct email was provided', async () => {
        const expected = new User(1, 'test@test.com', 'Test1234$', 1, Roles.STUDENT, 0);
        const actual = await loginService.getLogin('mail@mail.com');
        expect(actual).to.deep.equal(expected);
    });

    it('should return a Session object with the given information', async () => {
        const expected = new Session('test', 1, new Date(date.getTime() + 7889400000));
        const actual = await loginService.saveSession(1, 'test', date);
        expect(actual).to.deep.equal(expected);
    });
    it('should return the number of deleted rows', async () => {
        const expected = 1;
        const actual = await loginService.deleteSession('test');
        expect(actual).to.deep.equal(expected);
    });
    it('should return a Session object if a correct sessionID was provided', async () => {
        const expected = new Session('test', 1, new Date(date.getTime() + 7889400000));
        const actual = await loginService.getSession('test');
        expect(actual).to.deep.equal(expected);
    });
    it('should return a User object if a correct sessionID was provided', async () => {
        const expected = new User(1, 'test@test.com', 'Test1234$', 1, Roles.STUDENT, 0);
        const actual = await loginService.getUserBySession('test');
        expect(actual).to.deep.equal(expected);
    });

    afterEach(() => {
        sandbox.restore();
    });
});

export function initLoginStub(sandbox: sinon.SinonSandbox, date: Date): LoginMysql {
    const loginStub = <LoginMysql>{};
    loginStub.getUserByMail = sandbox
        .stub()
        .returns(Promise.resolve(new User(1, 'test@test.com', 'Test1234$', 1, Roles.STUDENT, 0)));
    loginStub.saveSession = sandbox
        .stub()
        .returns(Promise.resolve(new Session('test', 1, new Date(date.getTime() + 7889400000))));
    loginStub.deleteSession = sandbox.stub().returns(Promise.resolve(1));
    loginStub.getSession = sandbox
        .stub()
        .returns(Promise.resolve(new Session('test', 1, new Date(date.getTime() + 7889400000))));
    loginStub.getUserBySession = sandbox
        .stub()
        .returns(Promise.resolve(new User(1, 'test@test.com', 'Test1234$', 1, Roles.STUDENT, 0)));
    return loginStub;
}
