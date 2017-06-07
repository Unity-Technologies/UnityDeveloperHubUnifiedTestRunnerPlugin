import { assert } from 'chai'
import { Utr, HistoryCallback } from '../Utr'
import * as mock_spawn from 'mock_spawn';
import { AppSettings } from '../AppSettings'

describe('UTR tests', () => {
    describe("run", () => {
        it('run invokes correct command line and sets proper current directory', function () {
            var { utr, spawn } = _makeUtr();
            utr.run('--foo=bar', () => { }, () => { });
            var firstCall = spawn.calls[0];
            assert.equal('perl', firstCall.command);
            assert.deepEqual(['utr.pl', '--foo=bar'], firstCall.args);
            assert.deepEqual({ cwd: 'repo_root' }, firstCall.opts);
        })

        it('emits stdout', function (done) {
            var exitCode = 0;
            var stdOut = 'output'
            var { utr, spawn } = _makeUtr();
            spawn.setDefault(spawn.simple(exitCode, stdOut));
            utr.run('--foo=bar', (line: string) => {
                assert.equal(line, stdOut);
                done();
            }, () => { });
        });

        it('emits stderr', function (done) {
            var exitCode = 0;
            var stdErr = 'output'
            var { utr, spawn } = _makeUtr();
            spawn.setDefault(spawn.simple(exitCode, '', stdErr));
            utr.run('--foo=bar',
                () => { },
                (line: string) => {
                    assert.equal(line, stdErr);
                    done();
                });
        });
    })

    describe("history", () => {
        it('invokes with correct arguments', (done) => {
            var { utr, spawn } = _makeUtr();
            utr.history((histEntries: Array<string>) => {
                var call = spawn.calls[0];
                assert.equal(call.command, 'perl');
                assert.deepEqual(call.args, ['Tools/UnifiedTestRunner/history.pl']);
                assert.deepEqual(call.opts, { cwd: AppSettings.repositoryRoot });
                done();
            });
        });

        it('Invokes callback with the list of strings strings', (done) => {
            var { utr, spawn } = _makeUtr();
            spawn.setDefault(spawn.simple(0, '["command_line_text"]'));
            utr.history((histEntries: Array<string>) => {
                assert.deepEqual(histEntries, ['command_line_text']);
                done();
            });
        });
    });

    var _makeUtr = function () {
        const child_process = require('child_process')
        const mockSpawn = require('mock-spawn')
        var spawn = mockSpawn();
        child_process.spawn = spawn;
        spawn.setDefault(spawn.simple(0));

        const utr = new Utr("repo_root", spawn);
        return { utr: utr, spawn: spawn };
    }
});
