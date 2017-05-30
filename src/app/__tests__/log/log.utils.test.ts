import { LogUtils } from './../../components/log/log.utils'
import { assert } from 'chai'

describe('log.utils tests', () => {
    it('empty line. returns 0 parts', () => {
        const parts = LogUtils.split('');
        assert(parts.length == 0);
    });

    it('line does not contain a file name. returns 1 part', () => {
        const parts = LogUtils.split('abc');
    
        assert.deepEqual(parts, [{value: 'abc', isFileName: false}]);
    });
});