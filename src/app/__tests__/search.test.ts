
import * as request from 'request'
import { Search, SuggestionSearchRequest } from '../Search'
import * as sinon from 'sinon'

describe('Suggestions tests', () => {
    beforeEach(() => {
         sinon
            .stub(request, 'get')
            .yields(null, null, JSON.stringify([]));
    });

    afterEach(() => {
         request.get.restore();
    });

    it('no data. no matches', (done) => {
        const req: SuggestionSearchRequest = {
            data: [],
            keywords: [],
        };

        Search.suggest(req, (err, result) => {
            expect(result).toEqual([]);
            done();
        });
    });

    it('Some data, but no matches', (done) => {
        const req: SuggestionSearchRequest = {
            data: [{
                "cmd": "--suite=native"
            }],
            keywords: ['integration'],
        };
        Search.suggest(req, (err, result) => {
            expect(result).toEqual([]);
            done();
        });
    });

    it('One match', (done) => {
        const req: SuggestionSearchRequest = {
            data: [{ "cmd": "--suite=native" }],
            keywords: ['native'],
        };

        Search.suggest(req, (err, result) => {
            expect(result).toEqual([
                {
                    "cmd": "--suite=native",
                }
            ]);
            done();
        });
    });

    it('Two matches on same suggestion', (done) => {
        const req: SuggestionSearchRequest = {
            keywords: ['native', 'performance'],
            data: [{ "cmd": "--suite=native --category=performance" }]
        }
        Search.suggest(req, (err, result) => {
            expect(result).toEqual([{ "cmd": "--suite=native --category=performance" }]);
            done();
        });
    });

    it('Queries hoarder if no matched found', (done) => {
        const req: SuggestionSearchRequest = {
            keywords: ['WWWWorks'],
            data: []
        }

        const response = [{ Name: "WWWWorks", Suite: "runtime" }];
        request.get.restore();
        sinon
            .stub(request, 'get')
            .yields(
            null, null, JSON.stringify(response));

        Search.suggest(req, (err, result) => {
            expect(result).toEqual([{ cmd: "--suite=runtime --testfilter=WWWWorks" }]);
            done();
        });
    });
});
// TODO: limit results
// TODO: sort test results by relevance
// TODO: order of words does not matter
