import { LogUtils } from './../../components/log/log.utils'
import { assert } from 'chai'

describe('log.utils tests', () => {
    it('empty line. returns 0 parts', () => {
        const parts = LogUtils.split('');
       assert.deepEqual(parts, []);
    });

    it('line does not contain a file name. returns 1 part', () => {
        const parts = LogUtils.split('string');
        assert.deepEqual(parts, [{value: 'string', isFileName: false}]);
    });

    it('line contains file name only. returns 1 part with file name flag set', () => {
        ['/file', '/tmp/file.txt', 'c:\\file'].forEach((value => {
            const parts = LogUtils.split(value);
            assert.deepEqual(parts, [{value: value, isFileName: true}]);
        }))
    });

    it('line contains both: file name and some random text. returns 2 parts with with properly set isFileName flag', () => {
        const parts = LogUtils.split('some text /file.txt');
        assert.deepEqual(parts, [ 
            {value: 'some text', isFileName: false},
            {value: ' ', isFileName: false},
            {value: '/file.txt', isFileName: true}
        ]);
    });

    it('line contains 2 file names. returns 3 parts with properly set isFileName flag', () => {
        const parts = LogUtils.split('/file1 /file2');
        assert.deepEqual(parts, [ 
            {value: '/file1', isFileName: true},
            {value: ' ', isFileName: false},
            {value: '/file2', isFileName: true}
        ]);
    });

    it('line contains 2 file names and text in the beggining and end. returns 3 parts with properly set isFileName flag', () => {
        const parts = LogUtils.split('prefix text /file /file suffix text');
        console.log(parts);
        assert.deepEqual(parts, [ 
            {value: 'prefix text', isFileName: false},
            {value: ' ', isFileName: false},
            {value: '/file', isFileName: true},
            {value: ' ', isFileName: false},
            {value: '/file', isFileName: true},
            {value: ' suffix text', isFileName: false},
        ]);
    });
});