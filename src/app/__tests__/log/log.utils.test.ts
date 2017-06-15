import { LogUtils, PartType } from './../../components/log/log.utils'

describe('log.utils tests', () => {
    it('empty line. returns 0 parts', () => {
        const parts = LogUtils.split('');
       expect(parts).toEqual([]);
    });

    it('line does not contain a file name. returns 1 part', () => {
        const parts = LogUtils.split('string');
        expect(parts).toEqual([{value: 'string', type: PartType.String}]);
    });

    it('line contains file name only. returns 1 part with file name flag set', () => {
        ['/file', '/tmp/file.txt', 'c:\\file'].forEach((value => {
            const parts = LogUtils.split(value);
            expect(parts).toEqual([{value: value, type: PartType.FilePath}]);
        }))
    });

    it('line contains both: file name and some random text. returns 2 parts with with properly set isFileName flag', () => {
        const parts = LogUtils.split('some text /file.txt');
        expect(parts).toEqual([ 
            {value: 'some text', type: PartType.String},
            {value: ' ', type: PartType.String},
            {value: '/file.txt', type: PartType.FilePath}
        ]);
    });

    it('line contains 2 file names. returns 3 parts with properly set isFileName flag', () => {
        const parts = LogUtils.split('/file1 /file2');
        expect(parts).toEqual([ 
            {value: '/file1', type: PartType.FilePath},
            {value: ' ', type: PartType.String},
            {value: '/file2', type: PartType.FilePath}
        ]);
    });

    it('line contains 2 file names and text in the beggining and end. returns 3 parts with properly set isFileName flag', () => {
        const parts = LogUtils.split('prefix text /file /file suffix text');
        expect(parts).toEqual([ 
            {value: 'prefix text', type: PartType.String},
            {value: ' ', type: PartType.String},
            {value: '/file', type: PartType.FilePath},
            {value: ' ', type: PartType.String},
            {value: '/file', type: PartType.FilePath},
            {value: ' suffix text', type: PartType.String},
        ]);
    });

    it('line contains line break only. Returns 1 part', () => {
        const parts = LogUtils.split("\n");
        expect(parts).toEqual([ 
            {value: '\n', type: PartType.LineBreak},
        ]);
    });
 
    it('line contains line break and some other text. Returns 2 part', () => {
        const parts = LogUtils.split("prefix\nsuffix");
        expect(parts).toEqual([ 
            {value: 'prefix', type: PartType.String},
            {value: '\n', type: PartType.LineBreak},
            {value: 'suffix', type: PartType.String},
        ]);
    });
});