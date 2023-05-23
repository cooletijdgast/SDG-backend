import { expect } from 'chai';
import * as tssinon from 'ts-sinon';
import { UploadBusiness } from '../../../src/business/upload';
import { UploadSequelize } from '../../../src/repository/sequelize/upload';
import { UploadService } from '../../../src/services/upload';

describe('UploadService', () => {
    const sandbox = tssinon.default.createSandbox();
    let uploadService: UploadService;
    let uploadStub = null;
    beforeEach(() => {
        uploadStub = initUploadStub(sandbox);
        uploadService = new UploadService(uploadStub);
    });

    it('should return a create object', async () => {
        const expected = new UploadBusiness.Create();
        const actual = await uploadService.create('te', 'text1', 'jpgfile.jpg', 'sdg1', 'subject1');
        expect(actual).to.deep.equal(expected);
        console.log(actual);
    });

    it('should return a SDG object', async () => {
        const expected = new UploadBusiness.SDG();
        const actual = await uploadService.getSDG();
        expect(actual).to.deep.equal(expected);
        console.log(actual);
    });

    it('should return a Subject object', async () => {
        const expected = new UploadBusiness.SubjectArea();
        const actual = await uploadService.getSubject();
        expect(actual).to.deep.equal(expected);
    });

    afterEach(() => {
        sandbox.restore();
    });
});

export function initUploadStub(sandbox: sinon.SinonSandbox): UploadSequelize {
    const uploadStub = <UploadSequelize>{};
    uploadStub.getSDG = sandbox.stub().returns(Promise.resolve(new UploadBusiness.SDG()));
    uploadStub.getSubject = sandbox.stub().returns(Promise.resolve(new UploadBusiness.SubjectArea()));
    uploadStub.create = sandbox.stub().returns(Promise.resolve(new UploadBusiness.Create()));
    return uploadStub;
}
