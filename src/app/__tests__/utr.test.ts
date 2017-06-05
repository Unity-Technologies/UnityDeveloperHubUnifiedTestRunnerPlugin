import {assert} from 'chai'
import { chaiSubset } from 'chai-subset'
import { Utr, HistoryCallback } from '../Utr'
import * as mock_spawn from 'mock_spawn';
import {AppSettings} from '../AppSettings'

describe('UTR tests', () => {
    it('invokes history.pl with correct arguments', () => {
        var mockSpawn = require('mock-spawn');
        var mySpawn = mockSpawn();
        require('child_process').spawn = mySpawn;
        Utr.history(() => {});
        var call = mySpawn.calls[0];
        assert.equal (call.command, 'perl');
        assert.deepEqual (call.args, ['Tools/UnifiedTestRunner/history.pl']);
        assert.deepEqual (call.opts, {cwd: AppSettings.repositoryRoot});
   });
});
