const TableType ={
    Indoor:0,
    Terrace:1,
} as const;

type TableType = typeof TableType[keyof typeof TableType];
export default TableType;