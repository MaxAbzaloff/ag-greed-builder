import { ValueFormatterParams } from "ag-grid-community";
import {
  ColumnBuilder,
  ColumnBuilderAbstract,
  Params,
  TableColumn,
} from "./types";
import { FilterTypes } from "./CustomFilters";

export class ColumnBuilderImplementation
  extends ColumnBuilderAbstract
  implements ColumnBuilder {
  private column!: TableColumn;

  constructor() {
    super();
    this.reset();
    this.column.flexGrow = 1;
  }

  setField(name: string): ColumnBuilder {
    this.column.field = name;
    return this;
  }

  buildTitle(title: string): ColumnBuilder {
    this.column.header = title;
    return this;
  }

  setRenderer(): ColumnBuilder {
    return this;
  }

  setValueFormatter(
    formatFunction: (taget: ValueFormatterParams) => string
  ): ColumnBuilder {
    this.column.valueFormatter = formatFunction;
    return this;
  }

  setEditable(
    isEditable: boolean | ((target: any) => boolean) = true,
    onChangeValue: (params: any) => void = () => {}
  ): ColumnBuilder {
    this.column.editable = isEditable;
    this.column.onChangeValue = onChangeValue;
    return this;
  }

  reset(): ColumnBuilder {
    this.column = Object.create(null);
    return this;
  }

  setHeader(header: string): ColumnBuilder {
    this.column.header = header;
    return this;
  }

  setBasicFlexGrow(flexGrow: number): ColumnBuilder {
    this.column.flexGrow = flexGrow;
    return this;
  }

  setSortable(): ColumnBuilder {
    this.column.sortable = true;
    this.column.comparator = () => 0;
    return this;
  }

  setCheckbox(
    isCheckboxEnabled: ((target: Params<any>) => boolean) | boolean = true
  ): ColumnBuilder {
    this.column.checkboxSelection = isCheckboxEnabled;
    this.column.headerCheckboxSelection = true;
    return this;
  }

  setFilter(filterType: FilterTypes, options?: any[]): ColumnBuilder {
    this.column.filter = filterType;
    this.column.filterOptions = {
      filterOptions: options,
    };
    return this;
  }

  build(): TableColumn {
      const column = this.column;
      this.reset();
      return column;
  }
}
