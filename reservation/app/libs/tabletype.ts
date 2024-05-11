export const TableType ={
    Indoor:1,
    Terrace:2,
    Both:3
} as const;

export type TableType = typeof TableType[keyof typeof TableType];

const TableTypeToString: { [key in TableType]: string } = {
    [TableType.Indoor]: '屋内',
    [TableType.Terrace]: 'テラス',
    [TableType.Both]: 'どちらでも'
};

const StringToTableType: { [key: string]: TableType | undefined } = {
    '屋内': TableType.Indoor,
    'テラス': TableType.Terrace,
    'どちらでも': TableType.Both
};

// 数値を文字列に変換する関数
export function convertToString(type: TableType): string {
    if (type === undefined) {
        return 'どちらでも';
    }
    return TableTypeToString[type];
}

// 文字列を数値に変換する関数
export function convertToType(str: string): TableType | undefined {
    return StringToTableType[str];
}