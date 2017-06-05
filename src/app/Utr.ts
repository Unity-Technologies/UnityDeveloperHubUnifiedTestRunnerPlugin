import * as child_process from 'child_process';
import * as request from 'request';
import {AppSettings} from "./AppSettings";

var http = require('http');
interface OutPutCallBack { (data: string) : void }
interface AutocompleteCallbak { (data: Array<string>) : void }
export interface HistoryCallback { (data: Array<string>) : void }


export class Utr {
    private repositoryRoot: string;
    private stdout: OutPutCallBack;
    private stderr: OutPutCallBack;
    
    constructor(repositoryRoot: string, stdout: OutPutCallBack, stderr: OutPutCallBack) {
        this.repositoryRoot = repositoryRoot;
        this.stdout = stdout;
        this.stderr = stderr;
    }

    public run(cmd: string) {
        console.log (`utr run: ${cmd}`);
       
        var args : string[] = new Array<string>();
        args.push ('utr.pl');
        args = args.concat (cmd.split(' '));

        var utrProc = child_process.spawn ('perl', args,
		    {cwd: this.repositoryRoot}
	    );

        var obj = this;
        utrProc.stdout.on('data', (data) => {
            obj.stdout(`${data}`);
        });

        utrProc.stderr.on('data', (data) => {
            obj.stderr(`${data}`);
        });
    }

    public static complete(input: string, onComplete: AutocompleteCallbak) : void {
        var result = new Array<string> ();
        var autoCompleteProc = child_process.spawn ('perl', 
            ['Tools/UnifiedTestRunner/autocomplete.pl', input],
   	        {cwd: `${AppSettings.repositoryRoot}`}
	    );

        autoCompleteProc.stdout.on('data', (data) => {
            console.log(data.toString());
            onComplete(JSON.parse(data.toString()));
        });

        autoCompleteProc.stderr.on('data', (data) => {
            console.error(data.toString());
        });
    }

    public static history(onComplete: HistoryCallback ) : void  {
         var historyProc = child_process.spawn ('perl', 
            ['Tools/UnifiedTestRunner/history.pl'],
   	        {cwd: `${AppSettings.repositoryRoot}`}
	     );
   }
}
