import { MutableRefObject, ReactNode } from "react"

export type NumberFilter = {
  name: 'num',
  from: number,
  to: number,
}

export type StringFilter = {
  name: 'str',
  search: string,
  notInclude: string,
}

export type DateFilter = {
  name: 'date',
  from: Date,
  to: Date,
}

export type EnumFilter = {
  name: 'enum';
  filter: string[];
  values: string[];
}

export type JustFilter = EnumFilter | DateFilter | NumberFilter | StringFilter;

export type AndFilter = {
  name: 'and',
  filters: AnyFilter[]
}

export type OrFilter = {
  name: 'or',
  filters: AnyFilter[];
}

export type AnyFilter = JustFilter | AndFilter | OrFilter;

export type Column<Data> = {
  key: string,
  title: ReactNode,
  type: 'num' | 'date' | 'str',
  render: (data: Data, index: number) => ReactNode,
} | {
  key: string,
  title: ReactNode,
  type: 'enum',
  values: string[],
  render: (data: Data, index: number) => ReactNode,
}

export type TableSort = { desc: boolean, columnKey: string }
export type TableFilter =  { filter: JustFilter, columnKey: string };

export type GetDataParams = {
  sort: TableSort[],
  filter: TableFilter[],
  search: string,
  offset: number,
  limit: number,
}

export type TableType<Data> = {
  columns: Column<Data>[];
  ref?: MutableRefObject<(() => any) | undefined>;
  getData: (params: GetDataParams) => Promise<{
    data: Data[];
    totalRows: number;
    totalFiltredRows: number;
  }>;
}