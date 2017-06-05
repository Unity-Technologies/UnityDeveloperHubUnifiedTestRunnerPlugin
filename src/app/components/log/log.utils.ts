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
        if (line == null || line.length == 0) {
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
            } else if (p == "\n") {
                 result.push({ value: "\n", type: PartType.LineBreak })
            } else if (p.includes("\n")) {
                var p2 = p.split("\n");
                for (var i = 0; i < p2.length; i++) {
                    result.push({ value: p2[i], type: PartType.String })
                    if (i < p2.length - 1) {
                        result.push({ value: "\n", type: PartType.LineBreak })
                    }
                }
            } else {
                result.push({ value: p, type: PartType.String })
            }
        });
        return result;
    }
}