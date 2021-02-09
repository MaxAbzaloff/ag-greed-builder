import { ValueFormatterParams } from "ag-grid-community";
import { ColumnBuilder, ColumnBuilderAbstract, Params, TableColumn } from "./types";


export class ColumnBuilderImplementation extends ColumnBuilderAbstract implements ColumnBuilder {
    private column!: TableColumn;

    constructor() {
        super();
        this.reset();
        this.column.flexGrow = 1;
    }

    buildField(name: string): ColumnBuilder {
        this.column.field = name;
        return this;
    }
    
    buildTitle(title: string): ColumnBuilder {
        this.column.header = title;
        return this;
    }

    buildRenderer(): ColumnBuilder {
        return this;
    }

    buildValueFormatter(formatFunction: (taget: ValueFormatterParams) => string): ColumnBuilder {
        this.column.valueFormatter = formatFunction;
        return this;
    }

    buildEdit(
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

    buildHeader(header: string): ColumnBuilder {
        this.column.header = header;
        return this;
    }

    setBasicFlexGrow(flexGrow: number): ColumnBuilder {
        this.column.flexGrow = flexGrow;
        return this;
    }

    buildSort(): ColumnBuilder {
        this.column.sortable = true;
        return this;
    }

    buildCheckbox(isCheckboxEnabled: ((target: Params) => boolean) | boolean = true): ColumnBuilder {
        this.column.checkboxSelection = isCheckboxEnabled;
        this.column.headerCheckboxSelection = true;
        return this;
    }
    
    getColumn(): TableColumn {
        const column = this.column;
        this.reset();
        return column;
    }
}
