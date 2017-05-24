const path = require ('path')
import { CommandLine } from "./CommandLine"

export interface SuggestionSearchRequest {
    data: CommandLine[]
    keywords: string[]
}

export class Search {
    static suggest(params: SuggestionSearchRequest): CommandLine[] {
        var regexpCond = params.keywords.map(p => '(.*' + p +'.*)').join('');
        var regExp = new RegExp(regexpCond, 'i');
        var matches = params.data.filter( e => regExp.test(e.cmd)).slice(0, 10) ;
        return matches;
    }
}
