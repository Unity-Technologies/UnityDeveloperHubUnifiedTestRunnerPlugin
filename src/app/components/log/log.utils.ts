export interface LinePart {
    value: string;
    isFileName: boolean;
}

export class LogUtils {
    public static split(line: string): LinePart[]
    {
        const result = new Array<LinePart>();
        if (line.length != 0) {
            result.push ({value: line, isFileName: false}) 
        }
        return result;
    }
}