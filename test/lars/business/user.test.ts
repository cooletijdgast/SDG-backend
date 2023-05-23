import { expect } from 'chai';

import { Roles, User } from '../../../src/business/user';

describe('User', () => {
    it('should return true if a correct email is provided', () => {
        const expected = true;
        let user = new User(0, '', '', 1, Roles.STUDENT, 0);
        const actual = User.validateEmail('test@test.com');
        expect(actual).to.deep.equal(expected);
    });
    it('should return false if a incorrect email is provided', () => {
        const expected = false;
        let user = new User(0, '', '', 1, Roles.STUDENT, 0);
        const actual = User.validateEmail('test@');
        expect(actual).to.deep.equal(expected);
    });
    it('should return true if a correct password is provided', () => {
        const expected = true;
        let user = new User(0, '', '', 1, Roles.STUDENT, 0);
        const actual = User.validatePassword('Admin123!');
        expect(actual).to.deep.equal(expected);
    });
    it('should return false if a incorrect password is provided', () => {
        const expected = false;
        let user = new User(0, '', '', 1, Roles.STUDENT, 0);
        const actual = User.validatePassword('admin123');
        expect(actual).to.deep.equal(expected);
    });
});
