import { CommandLine } from "./CommandLine"

const request = require ('request')

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
        Search.httpGet(params, function(err, data) {
            const result = new Array<CommandLine>();
            data.forEach(e => {
                const cmd : CommandLine = {
                    cmd: `--suite=${e.Suite} --testfilter=${e.Name}`
                }
                result.push(cmd);
            });
            callback(err, result);
        });
    }

    static httpGet(params: SuggestionSearchRequest, callback: any) : void {
        const testName = params.keywords[0];
        const url = `http://api.hoarder.qa-staging.hq.unity3d.com/v1/TestInfo`;
        var propertiesObject = { name: testName };
        const result = new Array<CommandLine>();
        request.get ({url:url, qs:propertiesObject}, function(err, response, body) {
            if (err) {
                console.error(err);
                return;
            }
            var data = JSON.parse(body);
            if (data == undefined) {
                data = [];
            }
            callback (null, data);
        });
    }
}
