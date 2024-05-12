export const TableType ={
    Indoor:1,
    Terrace:2,
} as const;

export type TableType = typeof TableType[keyof typeof TableType];



const TableTypeToString: { [key in TableType]: string } = {
    [TableType.Indoor]: '屋内',
    [TableType.Terrace]: 'テラス',
};

// 数値を文字列に変換する関数
export function convertToString(type: TableType): string {
    if (type === undefined) {
        return 'Unknown';
    }
    return TableTypeToString[type];
}