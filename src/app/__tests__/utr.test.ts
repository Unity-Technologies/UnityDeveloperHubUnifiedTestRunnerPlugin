import {assert} from 'chai'
import { Utr, HistoryCallback } from '../Utr'
import * as mock_spawn from 'mock_spawn';
import {AppSettings} from '../AppSettings'

const child_process = require('child_process')
const mockSpawn = require('mock-spawn')
var spawn = mockSpawn ();
child_process.spawn = spawn;

describe('UTR tests', () => {
    
    describe("history", () => {
        it('invokes with correct arguments', (done) => {
            spawn.setDefault(spawn.simple());
            Utr.history(() => {
                var call = spawn.calls[0];
                assert.equal(call.command, 'perl');
                assert.deepEqual(call.args, ['Tools/UnifiedTestRunner/history.pl']);
                assert.deepEqual(call.opts, { cwd: AppSettings.repositoryRoot });
                done();
            });
        });

       it('Invokes callback with the list of strings strings', (done) => {
            spawn.setDefault(spawn.simple(0, '["command_line_text"]'));
            Utr.history((histEntries: Array<string>) => {
                assert.deepEqual(histEntries, ['command_line_text']);
                done();
            });
        });
    });

});
