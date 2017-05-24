//const proc = require ('child_process')

interface OutPutCallBack { (data: string) : void }

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
        console.log (`utr run: {cmd}`);
       
        var args : string[]; 
        args.push ('utr.pl');
        cmd.split(' ').forEach(element => {
            args.push (element);    
        });

        // var utrProc = proc.spawn ('perl', args,
		//     {cwd: this.repositoryRoot}
	    // );

        // utrProc.stdout.on('data', (data) => {
        //     this.stdout(`${data}`);
        // });

        // utrProc.stderr.on('data', (data) => {
        //     this.stderr(`${data}`);
        // });
    }
}