export enum PartType {
    FilePath,
    LineBreak,
    String
}

export interface LinePart {
    value: string
    type: PartType
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
                result.push({ value: p, type: PartType.FilePath })
            } else {
                result.push({ value: p, type: PartType.String })
            }
        });
        return result;
    }
}