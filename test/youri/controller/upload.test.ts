import { assert, expect } from 'chai';
import * as tssinon from 'ts-sinon';
import request, { Request, Response } from 'supertest';
import express from 'express';
import { UploadService } from '../../../src/services/upload';
import { initLoginStub } from '../../lars/services/login.test';
import { initRegisterStub } from '../../lars/services/register.test';
import { RepositoryInterfaces } from '../../../src/routing/helpers/load-routes';
import { initRepository } from '../../../src/server';
import { initUploadStub } from '../services/upload.test';

describe('UploadController', () => {
    const sandbox = tssinon.default.createSandbox();
    let uploadService: UploadService | null = null;
    let repos: RepositoryInterfaces | null = null;
    let app = express();

    beforeEach(async () => {
        app = express();
        repos = {
            login: initLoginStub(sandbox, new Date()),
            register: initRegisterStub(sandbox),
            upload: initUploadStub(sandbox),
        };
        uploadService = new UploadService(repos.upload);
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        initRepository(app, repos);
    });
    it('should return a 200 ok if the SDG object is succesfully fetched'),
        async () => {
            let res: Response = await request(app).get('/upload/SDG');
            expect(res.statusCode).equals(200);
            expect(JSON.stringify(res.body)).equals(
                '{"status":"succes","data":{"get":{"message":"SDG object succesfully fetched!"}}}'
            );
        };

    afterEach(() => {
        sandbox.restore();
    });
});
