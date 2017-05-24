const path = require ('path')
import { CommandLine } from "./CommandLine"

export interface DataItem {
    cmd: string
    //TODO: 
    //katana config id
}

export interface SuggestionSearchRequest {
    data: DataItem[]
    keywords: string[]
}

export interface MatchResult {
    string: string
}

export class Search {
    static suggest(params: SuggestionSearchRequest): DataItem[] {
        var regexpCond = params.keywords.map(p => '(.*' + p +'.*)').join('');
        var regExp = new RegExp(regexpCond, 'i');
        var matches = params.data.filter( e => regExp.test(e.cmd)).slice(0, 10) ;
        return matches;
    }
}
