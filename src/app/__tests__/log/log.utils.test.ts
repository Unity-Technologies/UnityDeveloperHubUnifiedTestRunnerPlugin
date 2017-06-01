import { LogUtils, PartType } from './../../components/log/log.utils'
import { assert } from 'chai'

describe('log.utils tests', () => {
    it('empty line. returns 0 parts', () => {
        const parts = LogUtils.split('');
       assert.deepEqual(parts, []);
    });

    it('line does not contain a file name. returns 1 part', () => {
        const parts = LogUtils.split('string');
        assert.deepEqual(parts, [{value: 'string', type: PartType.String}]);
    });

    it('line contains file name only. returns 1 part with file name flag set', () => {
        ['/file', '/tmp/file.txt', 'c:\\file'].forEach((value => {
            const parts = LogUtils.split(value);
            assert.deepEqual(parts, [{value: value, type: PartType.FilePath}]);
        }))
    });

    it('line contains both: file name and some random text. returns 2 parts with with properly set isFileName flag', () => {
        const parts = LogUtils.split('some text /file.txt');
        assert.deepEqual(parts, [ 
            {value: 'some text', type: PartType.String},
            {value: ' ', type: PartType.String},
            {value: '/file.txt', type: PartType.FilePath}
        ]);
    });

    it('line contains 2 file names. returns 3 parts with properly set isFileName flag', () => {
        const parts = LogUtils.split('/file1 /file2');
        assert.deepEqual(parts, [ 
            {value: '/file1', type: PartType.FilePath},
            {value: ' ', type: PartType.String},
            {value: '/file2', type: PartType.FilePath}
        ]);
    });

    it('line contains 2 file names and text in the beggining and end. returns 3 parts with properly set isFileName flag', () => {
        const parts = LogUtils.split('prefix text /file /file suffix text');
        assert.deepEqual(parts, [ 
            {value: 'prefix text', type: PartType.String},
            {value: ' ', type: PartType.String},
            {value: '/file', type: PartType.FilePath},
            {value: ' ', type: PartType.String},
            {value: '/file', type: PartType.FilePath},
            {value: ' suffix text', type: PartType.String},
        ]);
    });
});