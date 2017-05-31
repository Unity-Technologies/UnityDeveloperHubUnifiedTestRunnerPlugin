export interface LinePart {
    value: string;
    isFileName: boolean;
}

export class LogUtils {
    
    public static split(line: string): LinePart[] {
        const result = new Array<LinePart>();
        if (line == null || line.length == null) {
            return result;
        }
        const regex = /(\s+|^)((?:[a-zA-Z]\:){0,1}(?:[\\/][\w.]+){1,})/g;
        const parts = line.split(regex);
        parts.forEach(p => {
            if (p === '') {
                return;
            }
            if (p.match(regex)) {
                result.push({ value: p, isFileName: true })
            } else {
                result.push({ value: p, isFileName: false })
            }
        });
        return result;
    }
}