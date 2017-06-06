import * as child_process from 'child_process';
import * as request from 'request';
import { AppSettings } from "./AppSettings";

var http = require('http');
interface OutPutCallBack { (data: string): void }
interface AutocompleteCallbak { (data: Array<string>): void }
export interface HistoryCallback { (data: Array<string>): void }


export class Utr {
    private repositoryRoot: string;
    private spawn: any;

    constructor(repositoryRoot: string, spawn: any) {
        this.repositoryRoot = repositoryRoot;
        this.spawn = spawn;
    }

    public run(cmd: string, stdout: OutPutCallBack, stderr: OutPutCallBack) {
        console.log(`utr run: ${cmd}`);

        var args: string[] = new Array<string>();
        args.push('utr.pl');
        args = args.concat(cmd.split(' '));

        var utrProc = this.spawn('perl', args,
            { cwd: this.repositoryRoot }
        );

        utrProc.stdout.on('data', (data) => {
            stdout(`${data}`);
        });

        utrProc.stderr.on('data', (data) => {
            stderr(`${data}`);
        });
    }

    public complete(input: string, onComplete: AutocompleteCallbak): void {
        var result = new Array<string>();
        var autoCompleteProc = child_process.spawn('perl',
            ['Tools/UnifiedTestRunner/autocomplete.pl', input],
            { cwd: `${AppSettings.repositoryRoot}` }
        );

        autoCompleteProc.stdout.on('data', (data) => {
            onComplete(JSON.parse(data.toString()));
        });

        autoCompleteProc.stderr.on('data', (data) => {
            console.error(data.toString());
        });
    }

    public history(onComplete: HistoryCallback): void {
        var historyProc = child_process.spawn('perl',
            ['Tools/UnifiedTestRunner/history.pl'],
            { cwd: `${AppSettings.repositoryRoot}` }
        );
        var result = '';
        historyProc.stdout.on('data', function(data) {
            result += data.toString();
        });
        historyProc.on('close', () => {
            if (result.length == 0) {
                onComplete([]);
                return;
            }
            onComplete(JSON.parse(result));
        });
    }
}
