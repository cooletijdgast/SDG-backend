import { expect } from 'chai';
import { title } from 'process';

import { UploadBusiness } from '../../../src/business/upload';

describe('Upload Business', () => {
    it('should return true if the user input is valid', () => {
        const expected = true;
        const actual = new UploadBusiness.CreateValidation().validateCreate({
            title: 'atLeast5Characters',
            text: 'atLeast5Characters',
            media: 'jpgfile.jpg',
            sdg: 'sdg1',
            subject: 'subject1',
        });
        expect(actual).to.deep.equal(expected);
    });
});
