import { CommandLine } from "./CommandLine"
import * as http  from 'http';
import * as request  from 'request';

export interface SuggestionSearchRequest {
    data: CommandLine[]
    keywords: string[]
}

export class Search {
    static suggest(params: SuggestionSearchRequest, callback: any) : void {
        var regexpCond = params.keywords.map(p => '(.*' + p +'.*)').join('');
        var regExp = new RegExp(regexpCond, 'i');
        var matches = params.data.filter( e => regExp.test(e.cmd)).slice(0, 10) ;
        if (matches.length > 0) {
            callback (null, matches);
            return;
        }
        
        if (matches.length != 0){
            return;
        }
        if (params.keywords.length == 1) {
            const testName = params.keywords[0];
            const url = `http://api.hoarder.qa-staging.hq.unity3d.com/v1/TestInfo?name=${testName}`;
       
            var propertiesObject = { name: testName };

            request({url:url, qs:propertiesObject}, function(err, response, body) {
                if(err) { 
                    console.error(err); 
                    return; 
                }
                if (response.statusCode != 200) {
                    console.error(`Failed to query a test info. Response status ${response.statusCode}`); 
                    return; 
                }
                
                const result = new Array<CommandLine>();
                const responseArray = JSON.parse (body);
                responseArray.forEach(e => {
                    const cmd : CommandLine = {
                        cmd: `--suite=${e.Suite} --testfilter=${e.Name}`
                    }
                    result.push(cmd);
                });
                callback (err, result);
                return;
            });
            return;
        }
        callback(null, []);
    }


}
