const path = require ('path')
import { CommandLine } from "./CommandLine"

export interface FindMatchParams {
    keywords: string[]
    caseInsensetive: boolean
    string: String
}

export interface Rank {
    field: string
    rank: Number
}

export interface SuggestionSearchRequest {
    data: string[]
    keywords: string[]
    string: String
}

export interface MatchResult {
    string: string
}

export interface SuggestionMatchResult {
    string: string,
}

export class Search {
    static suggest(params: SuggestionSearchRequest): string[] {
        var regexpCond = params.keywords.map(p => '(.*' + p +'.*)').join('');
        var regExp = new RegExp(regexpCond, 'i');
        var matches = params.data.filter( e => regExp.test(e)).slice(0, 10) ;
        return matches;
    }
}
