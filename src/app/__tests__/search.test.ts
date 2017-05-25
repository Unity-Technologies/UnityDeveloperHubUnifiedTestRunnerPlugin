import { Search, SuggestionSearchRequest } from '../Search'
import {assert} from 'chai'

describe('Suggestions tests', () => {
    it('no data. no matches', () => {
        const req : SuggestionSearchRequest = {
            data: [],
            keywords: [],
        };

        Search.suggest(req, (err, result) => {
            assert.deepEqual(result, []);
        });
    });

    it('Some data, but no matches', function () {
        const req : SuggestionSearchRequest = {
            data: [ {
                "cmd" : "--suite=native"
            }],
            keywords: ['integration'],
        };

        Search.suggest(req, (err, result) => {
            assert.deepEqual(result, []);
        });
     });
    
    it ('One match', function() {
        const req : SuggestionSearchRequest = {
            data: [{"cmd" : "--suite=native"}],
            keywords: ['native'],
        };

        Search.suggest(req, (err, result) => {
            assert.deepEqual(result, [
                {
                    "cmd": "--suite=native",
                }
            ]);
        });
    });

    it ('Two matches', function() {
        Search.suggest ({
            keywords: ['native', 'performance'],
            data: [{ "cmd": "--suite=native --category=performance"}],
        }, (err, result) => {
            assert.deepEqual(result, [{"cmd": "--suite=native --category=performance"}]);
        });
    });
});
// TODO: limit results
// TODO: order of words does not matter



