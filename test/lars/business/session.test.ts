import { expect } from 'chai';

import { Session } from '../../../src/business/session';

describe('Session', () => {
    it('should return true if a valid session is provided', async () => {
        const expected = true;
        const date = new Date();
        const session = new Session('test', 1, new Date(date.getTime() + 7889400000));
        const actual = await session.validateCookie(session);
        expect(actual).to.deep.equal(expected);
    });
    it('should return false if no valid session is provided', async () => {
        const expected = false;
        const session = new Session('test', 1, new Date());
        const actual = await session.validateCookie(null);
        expect(actual).to.deep.equal(expected);
    });
});
