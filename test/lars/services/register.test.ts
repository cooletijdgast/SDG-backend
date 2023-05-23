import { expect } from 'chai';
import * as tssinon from 'ts-sinon';
import { RegisterInterface } from '../../../src/repository/interfaces/register-interface';
import { User, Roles } from '../../../src/business/user';
import { RegisterService } from '../../../src/services/register';

describe('RegisterService', () => {
    const sandbox = tssinon.default.createSandbox();

    let registerService: RegisterService;
    let registerStub: RegisterInterface | null = null;

    beforeEach(() => {
        registerStub = initRegisterStub(sandbox);
        registerService = new RegisterService(registerStub);
    });

    it('should create a new User in object in the database and return it', () => {
        const expected = new User(1, 'test@test.com', 'Test1234$', 1, Roles.STUDENT, 0);
        const actual = registerService.createUser('test@test.com', 'Test1234$');
        expect(actual).to.deep.equal(expected);
    });
    it('should return a User object if a correct email is provided', () => {
        const expected = new User(1, 'test@test.com', 'Test1234$', 1, Roles.STUDENT, 0);
        const actual = registerService.getUserByMail('test@test.com');
        expect(actual).to.deep.equal(expected);
    });

    afterEach(() => {
        sandbox.restore();
    });
});

export function initRegisterStub(sandbox: sinon.SinonSandbox): RegisterInterface {
    const registerStub = <RegisterInterface>{};
    registerStub.createUser = sandbox.stub().returns(new User(1, 'test@test.com', 'Test1234$', 1, Roles.STUDENT, 0));
    registerStub.getUserByMail = sandbox.stub().returns(new User(1, 'test@test.com', 'Test1234$', 1, Roles.STUDENT, 0));
    return registerStub;
}
