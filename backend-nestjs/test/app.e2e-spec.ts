import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {App} from 'supertest/types';
import {AppModule} from '../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('POST /api/kraken', () => {
        it('should return 400 when no body is sent', () => {
            return request(app.getHttpServer())
                .post('/api/kraken')
                .expect(400);
        });

        it('should return 200 when valid request', () => {
            const requestBody =
                [{name: 'joint', updated_at: '2020-09-14', prices: [2, 8.4], rate: 10, category: 'product',},
                {name: 'equipment1', updated_at: '2001-12-19', prices: [4], rate: 16, category: 'equipment',
                },
            ];

            return request(app.getHttpServer())
                .post('/api/kraken')
                .send(requestBody)
                .expect(201)
                .expect({message: 'Hello World!'});
        });

        it('should return 400 Bad Request when name is not a string', async () => {
            const invalidProductData = [
                {name: 123, updated_at: '2020-09-14', prices: [2, 8.4], rate: 10, category: 'product',}];
            await request(app.getHttpServer())
                .post('/api/kraken')
                .send(invalidProductData)
                .expect(400)
                .expect((res) => {
                    expect(res.body.message).toContain('name must be a string');
                });
        });
    });

    const testCases = [
        {
            invalidData: [{name: 123, updated_at: '2020-09-14', prices: [2, 8.4], rate: 10, category: 'product',},],
            expectedMessage: 'name must be a string'
        },
        {
            invalidData: [
                {name: 'joint', updated_at: 'invalid-date', prices: [2, 8.4], rate: 10, category: 'product',},],
            expectedMessage: 'updated_at must be in the format YYYY-MM-DD',
        },
        {
            invalidData: [
                {name: 'joint', updated_at: '2020-09-14', prices: 'not-an-array', rate: 10, category: 'product',},],
            expectedMessage: 'prices must be an array',
        },
        {
            invalidData: [
                {name: 'joint', updated_at: '2020-09-14', prices: [2, 'not-a-number'], rate: 10, category: 'product',},],
            expectedMessage: 'each value in prices must be a number',
        },
        {
            invalidData: [
                {name: 'joint', updated_at: '2020-09-14', prices: [2, 8.4], rate: 'not-a-number', category: 'product',},],
            expectedMessage: 'rate must be a number',
        },
        {
            invalidData: [
                {name: 'joint', updated_at: '2020-09-14', prices: [2, 8.4], rate: 10, category: 123,},],
            expectedMessage: 'category must be either "product" or "equipment"',
        },
        {
            invalidData: [{ name: 'joint', updated_at: '2020-09-14', prices: [-5, 8.4], rate: 10, category: 'product' }],
            expectedMessage: 'each value in prices must not be negative',
        },

    ];

    test.each(testCases)(
        'should return 400 when invalid body data is provided',
        async ({ invalidData, expectedMessage }) => {
            await request(app.getHttpServer())
                .post('/api/kraken')
                .send(invalidData)
                .expect(400)
                .expect((res) => {
                    expect(res.body.message).toEqual(
                        expect.arrayContaining([expect.stringMatching(new RegExp(expectedMessage, 'i'))])
                    );
                });
        }
    );
});